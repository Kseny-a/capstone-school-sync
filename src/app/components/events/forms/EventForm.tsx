import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { useState } from 'react'
import { AppEvent } from '../../../types/event'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../api/config/firebase'
import { setDoc, collection } from 'firebase/firestore'


type Props = {
  setShowForm: (value: boolean) => void
  addEvent: (event: AppEvent) => void
  selectedEvent: AppEvent | null
  updateEvent: (event: AppEvent) => void
}

function EventForm({ setShowForm, addEvent, selectedEvent, updateEvent }: Props) {
  
  const defaultValues = selectedEvent ?? {
    title: '',
    date: '',
    time: '',
    description: '',
    venue: '',
    address: '',
    hostedBy: 'Alice',
    hostedPhotoURL: '',
    attendees:[],
  };
  

  const [eventForm, setEventForm] = useState(defaultValues);

  
  const handleInputChange = (e: any) => {
    const {name, value} = e.target
    setEventForm({...eventForm, [name]: value})
  }
  async function updateTheEvent(data: AppEvent) {
    if (!selectedEvent) return;
    const docRef = doc(db, 'events', selectedEvent.id);
    await updateDoc(docRef, {
      ...data,
      date: new Date(data.date).toDateString(),
    });
  }

  async function createTheEvent(data: AppEvent) {
    const newEventRef = doc(collection(db,'events'));
    await setDoc(newEventRef, {
      ...data,
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
          <input 
          type='text' 
          placeholder='Date mm/dd/yyyy'
          value={eventForm.date || ''}
          name='date'
          onChange={handleInputChange}/> 
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
        <Button type='submit' floated='right' inverted color='blue' content='Submit'></Button>
        <Button onClick={() => setShowForm(false)} type='button' floated='right' inverted color='blue' content='Cancel'></Button>
      </Form>

    </Segment>
  )
}

export default EventForm;