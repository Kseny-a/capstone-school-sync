import { NavLink } from 'react-router-dom';
import { Button, Menu } from 'semantic-ui-react';
import { useAppDispatch } from '../store/store';
import { openModal } from '../modals/modalSlice';

// type Props = {
//     setAuth: (value: boolean) => void;
//   }

function SignOutButtons() {
  const dispatch = useAppDispatch();
  
  return (
    <div>
       
        <Menu.Item position='right'>
         <Button
            as={NavLink} 
            to='/login'
            basic inverted
            onClick = {()=> dispatch(openModal({type: 'LoginForm', data: {}}))}
            // floated='right'
            // positive={true}
            // inverted={true}
            content='Login' />
        </Menu.Item>
        <Menu.Item>
         <Button
         basic inverted
         content = 'Register'
         onClick={()=> dispatch(openModal({type: 'RegisterForm', data: {}}))}
         
            as={NavLink} 
            to='/register'
            // floated='right'
            // positive={true}
            // inverted={true}
            // content='Register'
             />
        </Menu.Item>
    
    </div>
  )
}

export default SignOutButtons;