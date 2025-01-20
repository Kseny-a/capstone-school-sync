import EventListItem from "./EventListItem"
import { AppEvent } from "../../../types/event"

type Props ={
  events: AppEvent[]
}

function EventList({events}: Props) {
  return (
    <>
      {events.map((event: any) => (
        <EventListItem key={event.id} event={event}/>
      ))}
    </>
  )
}

export default EventList