import { Menu, Image, Dropdown, DropdownMenu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { signOut } from 'firebase/auth';
import { auth } from '../api/config/firebase';


function SignedIn() {
  const {currentUser} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

    async function handleSignOut() { 
      await signOut(auth);
        navigate('/');
    }

  return (
    <Menu.Item position='right'>
        <Image avatar spaced='right' src='/user.png'/>
        <Dropdown pointing='top left' text={currentUser?.email as string}>
            <DropdownMenu>
                <Dropdown.Item as={Link} to='/createEvent' text='Create event' icon='plus'/>
                <Dropdown.Item as={Link} to={`/user-profile/${currentUser?.uid}`} text='My profile' icon='user'/>
                <Dropdown.Item onClick={handleSignOut} text='Sign out' icon='power'/>    
            </DropdownMenu>
        </Dropdown>
    </Menu.Item>
  )
}

export default SignedIn;
