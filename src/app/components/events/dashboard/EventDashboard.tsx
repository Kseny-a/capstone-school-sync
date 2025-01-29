import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useEffect } from 'react'
import { AppEvent } from "../../../types/event"
import { collection, onSnapshot, query, Timestamp } from 'firebase/firestore'
import { db } from '../../../api/config/firebase'
import { useAppDispatch, useAppSelector } from "../../../store";
import { setEvents } from "../../../features/events/eventSlice";


function EventDashboard() {
  const dispatch = useAppDispatch();
  const { events } = useAppSelector(state => state.events);
  
  useEffect(()=> {
    const q = query(collection(db, 'events'));
    const unsubscribe = onSnapshot(q, {
      next: (querySnapshot) => {
        const events: AppEvent[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          const date = data.date instanceof Timestamp ? data.date.toDate() : new Date(data.date);
          events.push({
            id: doc.id,
          ...data,
          date: date.toDateString() } as AppEvent);
        });
        dispatch(setEvents(events));
      },
      error: error => console.log(error),
      complete: () => console.log('done') 
  });
  return () => unsubscribe()
  }, [dispatch]);


  return (
    <Grid>
      <Grid.Column width = {10}>
          <EventList eventData={events}/>
      </Grid.Column>
      <Grid.Column width = {6}>
        <h2>Placeholder</h2>
      </Grid.Column>
    </Grid>
  )
}

export default EventDashboard