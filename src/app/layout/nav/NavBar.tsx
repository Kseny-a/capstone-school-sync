import { Button, Menu, Container, MenuItem } from 'semantic-ui-react'


type Props = {
  setShowForm: (value: boolean) => void;
}

export default function NavBar({ setShowForm }: Props) {
  return (
    <Menu inverted={true} fixed='top'>
      <Container>
        <MenuItem header>
          <img src="/logo.png" alt="logo" />
          SchoolSync
        </MenuItem>
        <MenuItem name='Events' />
        <MenuItem>
          <Button
            onClick={() => setShowForm(true)}
            floated='right'
            positive={true}
            inverted={true}
            content='Create event' />
        </MenuItem>
        <MenuItem position='right'>
          <Button basic inverted content='Login' />
          <Button basic inverted content='Register' />
        </MenuItem>
      </Container>
    </Menu>
  )
}

