import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "../form/EventForm";
// import { sampleData } from "../../../api/sampleData";
import { useEffect, useState } from 'react'
import { AppEvent } from "../../../types/event"
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../../../api/config/firebase'

type Props = {
  showForm: boolean
  setShowForm: (value: boolean) => void
  selectedEvent: AppEvent | null
  selectEvent: (event: AppEvent | null) => void

}

function EventDashboard({ showForm, setShowForm, selectEvent, selectedEvent }: Props) {
  
  const [eventData, setEventData] = useState<AppEvent[]>([])
  

  useEffect(()=> {
    const q = query(collection(db, 'events'));
    const unsubscribe = onSnapshot(q, {
      next: querySnapshot => {
        const events: AppEvent[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          events.push({id: doc.id,
          ...data,
          date: (data.date as Timestamp)?.toDate().toDateString() } as AppEvent);
        });
        setEventData(events);
      },
      error: error => console.log(error),
      complete: () => console.log('done') 
  });
  return () => unsubscribe()
  }, []);

  // add event to Eventlist
  const addEvent = (event: AppEvent) => {
    setEventData(prevData => {
      return [...prevData, event]
    })
  }

  // update Event
  const updateEvent = (updatedEvent: AppEvent) => {
    setEventData(eventData.map(event => event.id === updatedEvent.id ? updatedEvent : event ))
    selectEvent (null)
    setShowForm(false)
  } 
  
  return (
    <Grid>
      <Grid.Column width = {10}>
          <EventList events={eventData} selectEvent={selectEvent} />
      </Grid.Column>
      <Grid.Column width = {6}>
        {showForm &&
          <EventForm 
          setShowForm={setShowForm} 
          updateEvent={updateEvent}
          addEvent={addEvent}
          selectedEvent={selectedEvent}
          key={selectedEvent ? selectedEvent.id : 'create'}/>}
      </Grid.Column>
    </Grid>
  )
}

export default EventDashboard