import { List, Image, Item } from "semantic-ui-react";
import { Attendee } from "../../../types/event"
import { Link } from "react-router-dom";

type Props = {
  attendee: Attendee
}

const EventListAttendee = ({attendee}: Props) => {
  return (
    <List.Item>
      <Image size='mini' circular src={'/user.png'}/>
      <Item.Content verticalAlign="middle">
          <Item.Header as={Link} to={`/user-profile/${attendee.id}`}>
              {attendee.name}
          </Item.Header>
        </Item.Content>
    </List.Item>
  )
}

export default EventListAttendee