import { Link } from "react-router-dom"
import { Segment, Item, Header, Button, Grid, Icon } from "semantic-ui-react"
import { AppEvent } from "../../../types/event"


type Props={
  event: AppEvent
}
export default function EventDetailedHeader({event}: Props) {
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

      <Segment attached>
        <Button>Unattend</Button>
        <Button>Attend</Button>

        <Button as={Link} to={`/manage/${event}`}floated="right">
          Manage Event
        </Button>
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
            <span>{event.date.toDate().toLocaleString()}</span>
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