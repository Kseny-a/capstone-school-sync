import { Segment, Item, Header, Button } from "semantic-ui-react"

export default function EventDetailedHeader() {
  return (
    <Segment.Group>
    <Segment basic attached="top" style={{padding: '0'}}>
        <Segment basic>
            <Item.Group>
                <Item>
                    <Item.Content>
                        <Header
                            size="huge"
                            content='Event Title'
                            style={{color: 'teal'}}
                        />
                        <p>Event Date</p>
                        <p>
                            Hosted by <strong>Bob</strong>
                        </p>
                    </Item.Content>
                </Item>
            </Item.Group>
        </Segment>
    </Segment>

    <Segment attached="bottom">
        <Button>Unattend</Button>
        <Button>Attend</Button>

        <Button floated="right">
            Manage Event
        </Button>
    </Segment>
  </Segment.Group>
  )
}