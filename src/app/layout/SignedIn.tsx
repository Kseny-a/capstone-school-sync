import { Menu, Image, Dropdown, DropdownMenu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

type Props = {
    setAuth: (value: boolean) => void;
  }

function SignedIn({setAuth}: Props) {
    const navigate = useNavigate();

    function handleSignOut() {
        setAuth(false);
        navigate('/');
    }

  return (
    <Menu.Item position='right'>
        <Image avatar spaced='right' src='/user.png'/>
        <Dropdown pointing='top left' text='Alice'>
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
