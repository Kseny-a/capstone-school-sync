import { Segment, Item } from "semantic-ui-react";

export default function EventDetailedSideBar() {
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
      2 People Going
      </Segment>
      <Segment attached>
        <Item.Group relaxed divided>
          <Item style={{ position: 'relative' }}>
            <Item.Image size="tiny" src='/images/user.png' />
            <Item.Content verticalAlign="middle">
              <Item.Header as="h3">
                <span>Person 1</span>
              </Item.Header>
            </Item.Content>
          </Item>
          <Item style={{ position: 'relative' }}>
            <Item.Image size="tiny" src='/images/user.png' />
            <Item.Content verticalAlign="middle">
              <Item.Header as="h3">
                <span>Person 2</span>
              </Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </>
  )
}