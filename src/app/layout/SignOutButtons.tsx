import { NavLink } from 'react-router-dom';
import { Button, Menu } from 'semantic-ui-react';
import { useAppDispatch } from '../store/store';
import { openModal } from '../modals/modalSlice';

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
          content='Login' />
        <Button
          basic inverted
          content = 'Register'
          onClick={()=> dispatch(openModal({type: 'RegisterForm', data: {}}))}
          as={NavLink} 
          to='/register'
          />
        </Menu.Item>
    
    </div>
  )
}

export default SignOutButtons;