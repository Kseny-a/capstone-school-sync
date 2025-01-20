import { SegmentGroup, Segment, ItemGroup, Item, ItemContent, ItemHeader, Icon, List, Button } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";

function EventListItem() {
  return (
    <>
      <SegmentGroup>
        <Segment>
            <ItemGroup>
                <Item>
                    <Item.Image size='tiny' circular src='/user.png'/>
                    <ItemContent>
                        <ItemHeader>
                            Event title
                        </ItemHeader>
                        <Item.Description>
                            Hosted by Sarah
                        </Item.Description>
                    </ItemContent>
                </Item>
            </ItemGroup>
        </Segment>
        <Segment>
            <span>
                <Icon name='clock'/> Date
                <Icon name='marker'/> Venue
            </span>
        </Segment>
        <Segment secondary>
            <List horizontal>
                <EventListAttendee/>
                <EventListAttendee/>
                <EventListAttendee/>
            </List>
        </Segment>
        <Segment clearing>
            <span>Description of the event</span>
            <Button color='blue' floated='right' content='View' />
        </Segment>
      </SegmentGroup>



    </>
  )
}

export default EventListItem