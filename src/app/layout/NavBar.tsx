import { Button, Menu, Container, MenuItem } from 'semantic-ui-react';
import { sampleData } from './../api/sampleData.ts';
import { setDoc, doc } from 'firebase/firestore';
import { db } from  './../api/config/firebase';


type Props = {
  setShowForm: (value: boolean) => void;
}

export default function NavBar({ setShowForm }: Props) {
  async function seedDatabase() {
    for (const event of sampleData) {
      const { id, ...eventData } = event;
      await setDoc(doc(db, 'events', id), {
        ...eventData
      });
    }
  }

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
        { import.meta.env.DEV && (
          <MenuItem>
          <Button 
          inverted={true}
          color='green'
          content='Seed DB'
          onClick={seedDatabase}
          > Seed DB </Button>
        </MenuItem>
        )}
        <MenuItem position='right'>
          <Button basic inverted content='Login' />
          <Button basic inverted content='Register' />
        </MenuItem>
      </Container>
    </Menu>
  )
}

