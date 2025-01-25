import { Button, MenuItem } from 'semantic-ui-react';

type Props = {
    setAuth: (value: boolean) => void;
  }

function SignOutButtons({setAuth}: Props) {
  return (
    <div>
       <MenuItem position='right'>
          <Button basic inverted content='Login'onClick={() => setAuth(true)}/>
          <Button basic inverted content='Register' />
        </MenuItem>
    </div>
  )
}

export default SignOutButtons;