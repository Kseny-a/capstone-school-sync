import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useEffect, useState } from 'react'
import { AppEvent } from "../../../types/event"
import { collection, onSnapshot, query, Timestamp, where } from 'firebase/firestore'
import { db } from '../../../api/config/firebase'
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { setEvents } from "../../../features/events/eventSlice";
import EventFilter from "./EventFilter";
import { QueryOptions } from "../../../types/query";


function EventDashboard() {
  const dispatch = useAppDispatch();
  const { events } = useAppSelector(state => state.events);
  const [newQuery, setQuery] = useState<QueryOptions[]>([])
  
  useEffect(()=> {
    let q = query(collection(db, 'events'));

    if (newQuery.length > 0) {
      newQuery.forEach(({ attribute, operator, value }) => {
        q = query(q, where(attribute, operator, value));
      });
    }

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
  }, [dispatch, newQuery]);


  return (
    <Grid>
      <Grid.Column width = {10}>
          <EventList eventData={events}/>
      </Grid.Column>
      <Grid.Column width = {6}>
        <EventFilter setQuery={setQuery}/>
      </Grid.Column>
    </Grid>
  )
}

export default EventDashboard