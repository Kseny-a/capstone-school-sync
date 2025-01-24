import { Grid } from 'semantic-ui-react';
import UserHeader from './UserHeader';
import UserContent from './UserContent';


function UserProfile() {
  return (
  <Grid>
    <Grid.Column width={16}>
        <UserHeader/>
        <UserContent />
    </Grid.Column >
  </Grid>
  )
}
export default UserProfile;