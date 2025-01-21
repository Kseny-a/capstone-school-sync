import { List, Image } from "semantic-ui-react";
import { Attendee } from "../../../types/event"

type Props = {
  attendee: Attendee
}

function EventListAttendee({attendee}: Props) {
  return (
    <List.Item>
      <Image size='mini' circular src={attendee.photoURL}/>
    </List.Item>
  )
}

export default EventListAttendee