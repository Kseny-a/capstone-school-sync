
import { Button, Grid, Header, Tab, TabPane } from 'semantic-ui-react';
import { useState } from 'react';
import { Profile } from '../../types/profile';
import UserForm from './UserForm';

type Props = {
    profile: Profile,
}

export default function UserAbout({profile}: Props) {
    const [editMode, setEditMode] = useState(false);
  return (
    <TabPane>
        <Grid>
            <Grid.Column width={16}>
                <Header floated='left' icon='user' content={`About ${profile.firstName}`} style={{ marginBottom: 20 }}/>
                <Button
                floated='right'
                basic
                content={editMode ? 'Cancel': 'Edit profile'} 
                onClick={()=> setEditMode(!editMode)}/>

            </Grid.Column>
            <Grid.Column width={16}>
                {editMode ? <UserForm profile={profile} setEditMode={setEditMode}/>:(
                   <div style={{ marginBottom: 10 }}>
                        <div><strong>Child's Name: {profile.childName}</strong></div>
                        <strong>Child's Grade: {profile.grade}</strong>
                        <div>{profile.description}</div>
                        <div style={{ marginTop: 10 }}>

                        </div>
                    </div>
                )}
            </Grid.Column>
        </Grid>
    </TabPane>




  )
}
