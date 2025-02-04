import { Button, Menu, Container, MenuItem } from 'semantic-ui-react';
import { sampleData } from './../api/sampleData.ts';
import { setDoc, doc } from 'firebase/firestore';
import { db } from  './../api/config/firebase';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SignOutButtons from './SignOutButtons.tsx';
import SignedIn from './SignedIn.tsx';
import { useState} from 'react';
import { useAppSelector } from '../store/store.ts';


export default function NavBar() {
const {authenticated} =  useAppSelector(state => state.auth);

  // faking authentication
  // const[auth, setAuth] = useState(false);

  // const navigate = useNavigate();
  // async function seedDatabase() {
  //   for (const event of sampleData) {
  //     const { id, ...eventData } = event;
  //     await setDoc(doc(db, 'events', id), {
  //       ...eventData
  //     });
  //   }
  // }

  return (
    <Menu inverted={true} fixed='top'>
      <Container>
        <MenuItem header as={NavLink} to='/'>
          {/* <img src="/logo.png" alt="logo" /> */}
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
        {/* { import.meta.env.DEV && (
          <MenuItem>
          <Button 
          inverted={true}
          color='green'
          content='Seed DB'
          onClick={seedDatabase}
          > Seed DB </Button>
        </MenuItem>
        )}  */}
        {authenticated ? <SignedIn/> : <SignOutButtons/> }
      </Container>
      {/* {authenticated ? <SignedIn/> : <SignOutButtons/> } */}
    </Menu>
  )
}

