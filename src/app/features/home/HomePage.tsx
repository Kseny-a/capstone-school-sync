import { NavLink } from "react-router-dom"
import { Button, Container, Header, Segment } from "semantic-ui-react"
import { useAppDispatch } from "../../store/store"
import { openModal } from "../../modals/modalSlice"

const HomePage = () => {
  const dispatch = useAppDispatch();
  
  return (
    <Segment inverted textAlign='center' vertical className='master'>
    <Container>
      <Header as='h1' inverted>
        SchoolSync
      </Header>
      <Button 
        inverted onClick={() => dispatch(openModal({ type: 'LoginForm', data: {} }))}
        as={NavLink} 
        to='/login'>
        Login
      </Button>
      <Button 
        inverted onClick={() => dispatch(openModal({ type: 'RegisterForm', data: {} }))}
        as={NavLink} 
        to='/register'>
        Register
      </Button>
    </Container>
  </Segment>
  )
}

export default HomePage