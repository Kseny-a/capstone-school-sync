import { Link } from "react-router-dom"
import { Segment, Item, Header, Button, Grid, Icon } from "semantic-ui-react"
import { AppEvent } from "../../../types/event"
import { useAppSelector } from "../../../store/store"
import { toast } from "react-toastify"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../../api/config/firebase";
import { arrayRemove, arrayUnion, updateDoc } from "firebase/firestore";
import { UserProfile } from "../../../types/profile";

type Props = {
  event: AppEvent
}

export default function EventDetailedHeader({event}: Props) {

const currentUser = useAppSelector(state => state.auth.currentUser);
console.log('Current user:', currentUser);

async function addingAttendance() {
  if (!currentUser) {
    toast.error('Please login to attend event');
  return;  
}  
const docRef = doc(db, 'events', event.id);

// Getting user profile from FB
const docNew = doc(db, 'users', currentUser.uid);
const docSnap = await getDoc(docNew);

let userProfile: UserProfile | null = null;

if (docSnap.exists()) {
  userProfile = docSnap.data() as UserProfile;
  console.log('User profile:', userProfile);
} else {
  toast.error('Error: User profile is not found in FB');
  return;
}

if (event.isGoing) {
  const attendee = event.attendees.find(a => a.id === currentUser.uid);
  
  if (!attendee) {
    console.log('Attendee not found:', currentUser.uid);
    toast.error('You are not attending this event' )
    return;
  }

  console.log("Removing attendee:", attendee);

    await updateDoc(docRef, {
      attendees: arrayRemove(attendee),
      attendeesIds: arrayRemove(currentUser.uid)
    });
    toast.success('You have removed your attendance in this event');
  } else {
    const newAttendee = {
      id: currentUser.uid,
      name: userProfile.firstName,
      photoUrl: userProfile.photoURL || '/images/user.png',
    };

    if (!newAttendee.id || !newAttendee.name) {
      toast.error('Error: Missing user information');
        return;
    }

      await updateDoc(docRef, {
        attendees: arrayUnion(newAttendee),
        attendeesIds: arrayUnion(currentUser.uid)
    });
  }
}
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <Segment basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.title}
                  style={{ color: 'teal' }}
                />
                <p>Hosted by {event.hostedBy}</p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached='bottom' clearing>
       {event.isHost ? (
         <Button as={Link} to={`/manage/${event.id}`} floated="right" color='orange'>
         Manage Event
       </Button>
       ): (
        <Button
        content={event.isGoing ? 'Unattend' : 'Attend' } 
        color={event.isGoing ? 'grey': 'teal'}
        onClick={addingAttendance}/>
       )  }
      </Segment>

      <Segment attached>
        <Grid>
          <Grid.Column width={15}>
            <Icon color="teal" name="info" />
            <span>Event Details</span>
          </Grid.Column>
            <span>{event.description}</span>
          <Grid.Column width={15}>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{event.date.toString()} {event.time}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{event.venue}</span>
            <p>{event.address}</p>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>

  )
}