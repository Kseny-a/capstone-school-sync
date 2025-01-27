import { Button, Dropdown, Form, Header, Segment } from 'semantic-ui-react';
import { useState } from 'react'
import { AppEvent } from '../../../types/event'
import { doc, Timestamp, updateDoc } from 'firebase/firestore'
import { db } from '../../../api/config/firebase'
import { setDoc, collection } from 'firebase/firestore'
import DatePicker from 'react-datepicker';
import 'react-datepicker/package.json';
import 'react-datepicker/dist/react-datepicker.css';


type Props = {
  setShowForm: (value: boolean) => void
  addEvent: (event: AppEvent) => void
  selectedEvent: AppEvent | null
  updateEvent: (event: AppEvent) => void
  
}

const gradeOptions = [
  { key: 'kg', text: 'Kindergarten', value: 'kindergarten' },
  { key: '1', text: '1st grade', value: '1st' },
  { key: '2', text: '2nd grade', value: '2nd' },
  { key: '3', text: '3rd grade', value: '3rd' },
  { key: '4', text: '4th grade', value: '4th' },
  { key: '5', text: '5th grade', value: '5th' },
];

function EventForm({ setShowForm, addEvent, selectedEvent, updateEvent }: Props) {
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    venue: '',
    address: '',
    hostedBy: 'Alice',
    hostedPhotoURL: '',
    attendees:[],
    grade: '',

  });
  const [selectedGrade, setSelectedGrade] = useState('');

    const handleGradeChange = (e: React.SyntheticEvent<HTMLElement>, { value }: any) => {
        setSelectedGrade(value);
        setEventForm({ ...eventForm, grade: value });
    };

  const handleInputChange = (e: any) => {
    const {name, value} = e.target
    setEventForm({...eventForm, [name]: value})
  }

  const handleDateChange = (date: Date) => {
    setEventForm({ ...eventForm, date: date.toISOString() });
  };

  async function updateTheEvent(data: AppEvent) {
    if (!selectedEvent) return;
    const docRef = doc(db, 'events', selectedEvent.id);
    await updateDoc(docRef, {
      ...data,
      date: Timestamp.fromDate(new Date(data.date as string)),
    });
  }

  async function createTheEvent(data: AppEvent) {
    const newEventRef = doc(collection(db,'events'));
    await setDoc(newEventRef, {
      ...data,
      date: Timestamp.fromDate(new Date(data.date as string)),
    });
    return newEventRef;
  } 

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (selectedEvent) {
        await updateTheEvent({...selectedEvent, ...eventForm});
        updateEvent({...selectedEvent, ...eventForm });
      } else {
        const ref = await createTheEvent(eventForm);
        addEvent({...eventForm, id: ref.id });
      }
      setShowForm(false);
    } catch (error) {
      console.log(error)
    }
  }
  // const onSubmit = () => {
  //   selectedEvent ? updateEvent({...selectedEvent, ...eventForm}):
  //     addEvent({...eventForm, id: 'a', hostedBy: 'Robot', attendees: [], address: '', hostPhotoURL: ''})
  //   setShowForm(false)
  // }


  return (
    <Segment clearing>
      <Header content={selectedEvent ? 'Update Event' : 'Create Event'}/>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <input 
          type='text' 
          placeholder='Event title' 
          value={eventForm.title || ''}
          name='title'
          onChange={handleInputChange}/>
        </Form.Field>
        <Form.Field>
          <DatePicker
           selected={eventForm.date ? new Date(eventForm.date) : null}
           onChange={handleDateChange}
           dateFormat='MM/dd/yyyy'
           placeholderText='Select Date'
          /> 
        </Form.Field>
        <Form.Field>
          <input 
          type='text' 
          placeholder='Time'
          value={eventForm.time || ''}
          name='time'
          onChange={e => handleInputChange(e)}/> 
        </Form.Field>
        <Form.Field>
          <input 
          type='text' 
          placeholder='Description'
          value={eventForm.description || ''}
          name='description'
          onChange={e => handleInputChange(e)}/> 
        </Form.Field>
        <Form.Field>
          <input 
          type='text' 
          placeholder='Venue'
          value={eventForm.venue || ''} 
          name='venue'
          onChange={e => handleInputChange(e)}/> 
        </Form.Field>
        <Form.Field>
          <input 
          type='text' 
          placeholder='Address'
          value={eventForm.address || ''}
          name='address'
          onChange={e => handleInputChange(e)}/> 
        </Form.Field>
          <Form.Field>
      
          <Dropdown placeholder='Select Grade'
            fluid
            selection
            options={gradeOptions}
            onChange={handleGradeChange}
            value={selectedGrade}/>
        </Form.Field>
        <Button type='submit' floated='right' inverted color='blue' content='Submit'></Button>
        <Button onClick={() => setShowForm(false)} type='button' floated='right' inverted color='blue' content='Cancel'></Button>
      </Form>

    </Segment>
  )
}

export default EventForm;