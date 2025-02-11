import { SegmentGroup, Segment, ItemGroup, Item, ItemContent, ItemHeader, Icon, List, Button, Label } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { AppEvent } from "../../../types/event" 
import { Link } from "react-router-dom";

type Props = {
  event: AppEvent
}

function EventListItem({ event }: Props) {
  const eventDate = event.date instanceof Date ? event.date.toISOString().split('T')[0]: event.date;

  return (
    <>
      <SegmentGroup>
        <Segment>
          <ItemGroup>
            <Item>
              <Item.Image size='tiny' circular src={'/user.png'} />
              <ItemContent>
                <ItemHeader>
                  {event.title}
                </ItemHeader>
                <Item.Description>
                  Hosted by {event.hostedBy}
                </Item.Description>
                {event.isCancelled && (
                  <Label
                  style={{top: '-40px'}}
                  ribbon='right'
                  color='orange'
                  content='Cancelled'
                  />
                )}
                <Item.Description>
                  Grade: {event.grade}
                </Item.Description>
              </ItemContent>
            </Item>
          </ItemGroup>
        </Segment>
        <Segment>
          <span>
            <Icon name='clock' /> {eventDate}
            <Icon name='marker' /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List className="attendee-list"  horizontal>
            {event.attendees.map((attendee: any) => (
              <EventListAttendee key ={attendee.id} attendee={attendee} />
            ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{event.description}</span>
          <Button className= 'button' floated='right' content='View Event'as={Link} to={`/events/${event.id}`} />
        </Segment>
      </SegmentGroup>
    </>
  );
}

export default EventListItem;