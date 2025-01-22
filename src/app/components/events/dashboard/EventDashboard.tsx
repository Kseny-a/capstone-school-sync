import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "../form/EventForm";
import { sampleData } from "../../../api/sampleData";
import { useEffect, useState } from 'react'
import { AppEvent } from "../../../types/event"

type Props = {
  showForm: boolean
  setShowForm: (value: boolean) => void
  selectedEvent: AppEvent | null
  selectEvent: (event: AppEvent) => void

}

function EventDashboard({ showForm, setShowForm, selectEvent, selectedEvent }: Props) {
  
  const [eventData, setEventData] = useState<AppEvent[]>([])
  

  useEffect(() => {
    setEventData(sampleData)
  }, [])

  // add event to Evenlist
  const addEvent = (event: AppEvent) => {
    setEventData(prevData => {
      return [...prevData, event]
    })
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
          addEvent={addEvent}
          selectedEvent={selectedEvent}
          key={selectedEvent ? selectedEvent.id : 'create'}/>}
      </Grid.Column>
    </Grid>
  )
}

export default EventDashboard