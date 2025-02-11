
import { Button, Grid, Header, Tab, TabPane } from 'semantic-ui-react';
import { useState } from 'react';
import { Profile } from '../../types/profile';
import UserForm from './UserForm';
import { useAppSelector } from '../../store/store';

type Props = {
    profile: Profile,
}

export default function UserAbout({profile}: Props) {
    const [editMode, setEditMode] = useState(false);
    const currentUser = useAppSelector(state => state.auth.currentUser);
    const loggedInUserId = currentUser?.uid;
    
  return (
    <TabPane>
        <Grid>
            <Grid.Column width={16}>
                <Header floated='left' icon='user' content={`About ${profile.firstName}`} style={{ marginBottom: 30 }}/>
               { loggedInUserId === profile.uid && (
               <Button
                floated='right'
                basic
                content={editMode ? 'Cancel': 'Edit profile'} 
                onClick={()=> setEditMode(!editMode)}/>
            )}

            </Grid.Column>
            <Grid.Column width={16}>
                {editMode ? <UserForm profile={profile} setEditMode={setEditMode}/>:(
                   <div style={{ marginBottom: 10 }}>
                        <div style={{ marginBottom: 30 }}>{profile.description}</div>
                        <div style={{ marginBottom: 7 }}><strong>Child's Name: {profile.childName}</strong></div>
                        <strong>Child's Grade: {profile.grade}</strong>
                        <div style={{ marginTop: 10 }}>

                        </div>
                    </div>
                )}
            </Grid.Column>
        </Grid>
    </TabPane>


  )
}
