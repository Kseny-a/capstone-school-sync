import { SegmentGroup, Segment, ItemGroup, Item, ItemContent, ItemHeader, Icon, List, Button } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";

function EventListItem({ event }: any) {
  return (
    <>
      <SegmentGroup>
        <Segment>
          <ItemGroup>
            <Item>
              <Item.Image size='tiny' circular src={event.hostPhotoURL} />
              <ItemContent>
                <ItemHeader>
                  {event.title}
                </ItemHeader>
                <Item.Description>
                  Hosted by {event.hostedBy}
                </Item.Description>
              </ItemContent>
            </Item>
          </ItemGroup>
        </Segment>
        <Segment>
          <span>
            <Icon name='clock' /> {event.date}
            <Icon name='marker' /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees.map((attendee: any) => (
              <EventListAttendee key ={attendee.id} attendee={attendee} />
            ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{event.description}</span>
          <Button color='blue' floated='right' content='View' />
        </Segment>
      </SegmentGroup>



    </>
  )
}

export default EventListItem