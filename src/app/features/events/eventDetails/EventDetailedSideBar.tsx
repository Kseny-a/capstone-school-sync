import { Segment, Item, Label, LabelDetail, ItemExtra } from "semantic-ui-react";
import { AppEvent } from "../../../types/event";
import { Link } from "react-router-dom";

type Props = {
  event: AppEvent
}

export default function EventDetailedSideBar({event}: Props) {
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: 'none' }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
      {event.attendees.length} People Going
      </Segment>
      <Segment attached>
        <Item.Group relaxed divided>
          {event.attendees.map(attendee => (
              <Item style={{ position: 'relative' }} key={attendee.id}>
           {/* <div>
                {event.hostUid === attendee.id && (
                  // <Label  style={{postition:'absolute'}} color='olive' ribbon='right'>
                  //   Host
                  // </Label>

                  <Label as='a' color='teal' tag position='right'>
                    Host
                  </Label>
        
                )}
                </div> */}
                <Item.Image size="tiny" src={attendee.photoURL || '/images/user.png'} />
                  <Item.Content verticalAlign="middle">
                    <Item.Header as={Link} to={`/user-profile/${attendee.id}`}>
                     <span>{attendee.name}</span>

                   </Item.Header>
                   <div>
                {event.hostUid === attendee.id && (
                  <Label  style={{postition:'absolute'}} color='olive' ribbon='right'>
                    Host
                  </Label>
                )}
                </div>
                  </Item.Content>
                </Item>
          ))}
        </Item.Group>
      </Segment>
    </>
  )
}