import EventListItem from "./EventListItem"
import { AppEvent } from "../../../types/event"

type Props ={
  eventData: AppEvent[]
}

function EventList({eventData}: Props) {
  return (
    <>
      {eventData.map((event: any) => (
        <EventListItem 
          key={event.id} 
          event={event}
          />
      ))}
    </>
  )
}

export default EventList