import EventListItem from "./EventListItem"

function EventList(props: any) {
  return (
    <>
      {props.events.map((event: any) => (
        <EventListItem key={event.id} event={event}/>
      ))}
    </>
  )
}

export default EventList