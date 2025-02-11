import { Button, Menu, Container, MenuItem } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import SignOutButtons from './SignOutButtons.tsx';
import SignedIn from './SignedIn.tsx';
import { useAppSelector } from '../store/store.ts';


export default function NavBar() {
const {authenticated} =  useAppSelector(state => state.auth);

  return (
    <Menu inverted={true} fixed='top'>
      <Container>
        <MenuItem header as={NavLink} to='/'>
          SchoolSync
        </MenuItem>
        <MenuItem name='Events' as={NavLink} to='/events'/>
        <MenuItem>
          <Button
            as={NavLink} 
            to='/createEvent'
            floated='right'
            positive={true}
            inverted={true}
            content='Create event' />
        </MenuItem>
        {authenticated ? <SignedIn/> : <SignOutButtons/> }
      </Container>
    </Menu>
  )
}

