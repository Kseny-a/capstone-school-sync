import { Grid } from "semantic-ui-react"
import EventDetailedHeader from "./EventDetailedHeader"
import EventDetailedSideBar from "./EventDetailedSideBar"
// import { useEffect, useState } from "react";
// import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
// import { db } from "../../../api/config/firebase";
import { useAppSelector } from "../../../store";

function EventDetailedPage() {
  const { id } = useParams<{ id: string }>();
  const event = useAppSelector(state => state.events.events.find(e => e.id === id))

  if (!event) return <h2>event not found</h2>

  // useEffect(() => {
  //   const fetchEvent = async () => {
  //     if (id) {
  //       const eventRef = doc(db, "events", id)
  //       const eventDoc = await getDoc(eventRef)
  //       if (eventDoc.exists()) {
  //         setEvent(eventDoc.data());
  //       } else {
  //         console.log("Event not found");
  //       }
  //     }
  //   }
  //   fetchEvent();
  // }, [id]);

  // if (!event) {
  //   return <p>Loading event details...</p>;
  // }

  return (
    <Grid>
      <Grid.Column width = {10}>
        <EventDetailedHeader event={event}/>
      </Grid.Column>
      <Grid.Column width = {6}>
        <EventDetailedSideBar/>
      </Grid.Column>
    </Grid>
  )
}

export default EventDetailedPage