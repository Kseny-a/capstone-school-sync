import EventListItem from "./EventListItem"
import { AppEvent } from "../../../types/event"

type Props ={
  events: AppEvent[]
  selectEvent: (event: AppEvent) => void
}

function EventList({events, selectEvent}: Props) {
  return (
    <>
      {events.map((event: any) => (
        <EventListItem key={event.id} event={event} selectEvent={selectEvent}/>
      ))}
    </>
  )
}

export default EventList