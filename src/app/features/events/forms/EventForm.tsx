import { Button, Dropdown, Form, Header, Segment } from 'semantic-ui-react';
import { useEffect, useState } from 'react'
import { AppEvent } from '../../../types/event'
import { addDoc, doc, Timestamp, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore'
import { db } from '../../../api/config/firebase'
import { setDoc, collection } from 'firebase/firestore'
import DatePicker from 'react-datepicker';
import 'react-datepicker/package.json';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { setEvents } from '../eventSlice';
import { getDoc } from 'firebase/firestore'; 
import { UserProfile } from '../../../types/profile'
import { getUserProfile } from '../../../utilities/firebaseUtil';
import { add } from 'date-fns';
import { toast } from 'react-toastify';


const gradeOptions = [
  { key: 'kg', text: 'Kindergarten', value: 'kindergarten' },
  { key: '1', text: '1st grade', value: '1st' },
  { key: '2', text: '2nd grade', value: '2nd' },
  { key: '3', text: '3rd grade', value: '3rd' },
  { key: '4', text: '4th grade', value: '4th' },
  { key: '5', text: '5th grade', value: '5th' },
];

type Props = {
  setShowForm: (value: boolean) => void;
};

function EventForm({ setShowForm}: Props) {

  let { id } = useParams<{ id: string }>();
  const event = useAppSelector(state => state.events.events.find(e => e.id === id))
  // Checking if the user is authenticated
  const { currentUser } = useAppSelector(state => state.auth)
  console.log('Current user:', currentUser);

  // initial form state
  const initialValues = event ?? {
    title: '',
    date: null,
    time: '',
    description: '',
    venue: '',
    address: '',
    grade: '',
    isCancelled: false,
  }

  const [eventForm, setEventForm] = useState<AppEvent>(initialValues);
  const [selectedGrade, setSelectedGrade] = useState<string>(eventForm.grade || '')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

 // Listening to the changes in the Cancellation status of the Event 
  useEffect(() => {
    
    if (event && event.id) {
      const docRef = doc(db, 'events', event.id);
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const updatedEvent = docSnap.data() as AppEvent;
          setEventForm(prev => ({
            ...prev,
            isCancelled: updatedEvent.isCancelled}));
    }
  });
  return () => unsubscribe();
}
}, [event?.id]);

  // Handling Grade Change
  const handleGradeChange = (e: React.SyntheticEvent<HTMLElement>, { value }: any) => {
    setSelectedGrade(value);
    setEventForm({ ...eventForm, grade: value });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEventForm({ ...eventForm, [name]: value });
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setEventForm({ ...eventForm, date: date.toISOString() });
    }
  };

  // Updating date format to TimeStamp
  async function updateTheEvent(data: AppEvent) {
    if (!event) return;
    const docRef = doc(db, 'events', event.id);
    await updateDoc(docRef, {
      ...data,
      date: Timestamp.fromDate(new Date(data.date as string)),
    })
  }

  // async function createTheEvent(data: AppEvent) {
  //   const newEventRef = doc(collection(db, 'events'));
  //   await addDoc(newEventRef, {
  //     ...data,
  //     date: Timestamp.fromDate(new Date(data.date as string)),
  //   });
  //   return newEventRef;
  // }

  // Creating Event and adding Host and Attendees
  async function createTheEvent(data: AppEvent) {
    if (!currentUser) {
      console.log('User not authenticated');
      return;
    } try {
      const UserProfile = await getUserProfile(currentUser.uid);
      console.log('User profile:', UserProfile);
      const newEventRef = await addDoc(collection(db, 'events'), {
      ...data,
      hostUid: currentUser.uid,
      hostPhotoUrl: UserProfile?.photoURL || '/user.png',
      hostedBy: UserProfile?.firstName || currentUser.firstName || 'Unknown user',
      attendees: arrayUnion({
        id: currentUser.uid,
        name: UserProfile?.firstName || currentUser.firstName,
        photoUrl: UserProfile?.photoURL || '/user.png',
      }),
      attendeesIds: arrayUnion(currentUser.uid),
      date: Timestamp.fromDate(new Date(data.date as string)),
    });
     
    await updateDoc(newEventRef, {
      id: newEventRef.id,
    });
    // await setDoc(newEventRef, newEventData)
    // dispatch(setEvents(newEventData))
    // return newEventId;
    return newEventRef;
  } catch (error){
    console.log('Error creating the event:', error);
  }
}

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (eventForm.id) {
        await updateTheEvent(eventForm);
        navigate(`/events/${eventForm.id}`);
      } else {
        const newEventRef = await createTheEvent(eventForm);
        if (newEventRef?.id) {
          const newEvent = { ...eventForm, id: newEventRef.id };

          dispatch(setEvents(newEvent));
          navigate(`/events/${newEventRef.id}`);
        }
        // setEventForm(prev => ({...prev, id: newEventId}))
  
      }
      setShowForm(false);
    } catch (error) {
      console.log('Error submitting the form', error)
    }
  }

// Cancelling Event
async function handleCancelEvent(event: AppEvent) {
  if (!event.id) {
    console.log('Event id is not found');
    return;
  } 
  try {
      const docRef = doc(db, 'events', event.id);
      const newStatus = !eventForm.isCancelled;
      await updateDoc(docRef, {
          isCancelled: newStatus,
}); 
setEventForm(prev => ({...prev, isCancelled: newStatus}));
console.log('Event cancelled:', newStatus);
toast.success(`Event has been ${newStatus ? 'reinstalled': 'cancelled' }`);

}
catch (error){
  console.log('Error cancelling the event:', error);
  toast.error('Error updating event status');
}
}

  return (
    <Segment clearing>
      <Header content={event ? 'Update Event' : 'Create Event'} />
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <input
            type='text'
            placeholder='Event title'
            value={eventForm.title || ''}
            name='title'
            onChange={handleInputChange} />
        </Form.Field>
        <Form.Field>
          <DatePicker
            selected={eventForm.date ? new Date(eventForm.date.toString()) : null}
            onChange={(date) => handleDateChange(date)}
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
            onChange={e => handleInputChange(e)} />
        </Form.Field>
        <Form.Field>
          <input
            type='text'
            placeholder='Description'
            value={eventForm.description || ''}
            name='description'
            onChange={e => handleInputChange(e)} />
        </Form.Field>
        <Form.Field>
          <input
            type='text'
            placeholder='Venue'
            value={eventForm.venue || ''}
            name='venue'
            onChange={e => handleInputChange(e)} />
        </Form.Field>
        <Form.Field>
          <input
            type='text'
            placeholder='Address'
            value={eventForm.address || ''}
            name='address'
            onChange={e => handleInputChange(e)} />
        </Form.Field>
        <Form.Field>
          <Dropdown placeholder='Select Grade'
            fluid
            selection
            options={gradeOptions}
            onChange={handleGradeChange}
            value={selectedGrade} />
        </Form.Field>
        {event && (
          <Button
          type='button'
          floated='left'
          color={eventForm.isCancelled ? 'green': 'orange'}
          onClick = {() => handleCancelEvent(eventForm)}
          content={eventForm.isCancelled ? 'Reactivate Event': 'Cancel Event'}
           />
        )}
        <Button type='submit' floated='right' inverted color='blue' content='Submit'></Button>
        <Button as={Link} to='/events' type='button' floated='right' inverted color='blue' content='Back'></Button>
      </Form>
    </Segment>
  );
}

export default EventForm;
