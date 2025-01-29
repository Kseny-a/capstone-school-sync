import { Menu, Image, Dropdown, DropdownMenu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { logOut } from '../features/auth/authSlice';


// type Props = {
//     setAuth: (value: boolean) => void;
//   }

function SignedIn() {
  const {currentUser} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

    function handleSignOut() {
        dispatch(logOut()); 
        navigate('/');
    }

  return (
    <Menu.Item position='right'>
        <Image avatar spaced='right' src='/user.png'/>
        <Dropdown pointing='top left' text={currentUser?.email}>
            <DropdownMenu>
                <Dropdown.Item as={Link} to='/createEvent' text='Create event' icon='plus'/>
                <Dropdown.Item as={Link} to='/user-profile' text='My profile' icon='user'/>
                <Dropdown.Item onClick={handleSignOut} text='Sign out' icon='power'/>    
            </DropdownMenu>
        </Dropdown>
    </Menu.Item>
  )
}

export default SignedIn;
