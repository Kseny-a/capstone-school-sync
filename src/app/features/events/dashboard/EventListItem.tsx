import { SegmentGroup, Segment, ItemGroup, Item, ItemContent, ItemHeader, Icon, List, Button } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { AppEvent } from "../../../types/event" 
import { Link } from "react-router-dom";
import { collection, deleteDoc, doc, getDocs, Timestamp } from 'firebase/firestore'
import { db } from '../../../api/config/firebase'

type Props = {
  event: AppEvent
}

function EventListItem({ event }: Props) {
  const eventDate = event.date instanceof Date ? event.date.toISOString().split('T')[0]: event.date;
 
  async function deleteEvent(eventId: string) {
    console.log('eventID',eventId)
    if (!eventId) {
      console.log('Event ID is missing');
      return;
    }
      // const eventRef = doc(db, 'events', eventId);
      try {
        await deleteDoc(doc(db, 'events', eventId));
        console.log('Successful')
      }
      catch (error) {
        console.error('Error deleting document: ', error);
      }

  }
  return (
    <>
      <SegmentGroup>
        <Segment>
          <ItemGroup>
            <Item>
              <Item.Image size='tiny' circular src={event.hostPhotoURL || '/images/user.png'} />
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
            <Icon name='clock' /> {eventDate}
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
          <Button color='blue' floated='right' content='View Event'as={Link} to={`/events/${event.id}`} />
          <Button color='orange' floated='right' content='Delete' onClick={() => deleteEvent(event.id)}/>
        </Segment>
      </SegmentGroup>
    </>
  );
}

export default EventListItem;