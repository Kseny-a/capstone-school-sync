import { Grid } from "semantic-ui-react"
import EventDetailedHeader from "./EventDetailedHeader"
import EventDetailedSideBar from "./EventDetailedSideBar"
import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../../api/config/firebase";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { setEvents } from "../eventSlice";


const EventDetailedPage = () => {
  const { id } = useParams<{ id: string }>();
  const event = useAppSelector(state => state.events.events.find(e => e.id === id))
  const dispatch = useAppDispatch()

  if (!event) return <h2>event not found</h2>

  useEffect(() => {
    if (!id) return
    const unsub = onSnapshot(doc(db, 'events', id),{
      next: doc => {
        dispatch(setEvents({id: doc.id, ...doc.data()}))
      },
      error: err => {
        console.log(err)
      }
    })
    return () => unsub()
  }, [id, dispatch])

  return (
    <Grid>
      <Grid.Column width = {10}>
        <EventDetailedHeader event={event}/>
      </Grid.Column>
      <Grid.Column width = {6}>
        <EventDetailedSideBar event={event}/>
      </Grid.Column>
    </Grid>
  )
}

export default EventDetailedPage