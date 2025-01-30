import { Link } from "react-router-dom"
import { Button, Container, Header, Icon, Segment } from "semantic-ui-react"

function HomePage() {
  return (
    <Segment inverted textAlign='center' vertical className='master'>
    <Container>
      <Header as='h1' inverted>
        SchoolSync
      </Header>
      <Button inverted as={Link} to='/events'>
        Get started
        <Icon name='caret right' inverted />
      </Button>
    </Container>
  </Segment>
  )
}

export default HomePage