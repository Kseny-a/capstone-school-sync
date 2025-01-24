import {Grid, Segment, Item, Header, Statistic } from 'semantic-ui-react';


function UserHeader() {
  return (
    <Segment>
        <Grid.Column width={12}>
            <Item.Group>
                <Item> 
                    <Item.Image pic size='small' src={'/user.png'}/>
                    <Item.Content verticalAlign='middle'>
                        <Header as='h1'content='Display Name'/>
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

