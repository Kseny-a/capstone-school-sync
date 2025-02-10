import {Grid, Segment, Item, Header, Statistic } from 'semantic-ui-react';
import { Profile } from '../../types/profile';

type Props = {
    profile: Profile;
}


function UserHeader({profile}: Props) {
  return (
    <Segment>
        <Grid.Column width={12}>
            <Item.Group>
                <Item> 
                    <Item.Image size='small' circular src={profile.photoUrl || '/user.png'}/>
                    <Item.Content verticalAlign='middle'>
                        <Header as='h1'content={`${profile.firstName} ${profile.lastName}`}
                        //   style={{ textAlign: 'center', margin: '10px 10 px 20px 20px' }}
                          />
                    </Item.Content>
                </Item>
            </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
            <Statistic.Group></Statistic.Group>
        </Grid.Column>
    </Segment>
  )
};

export default UserHeader;

