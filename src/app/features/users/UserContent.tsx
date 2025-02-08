import { Tab } from 'semantic-ui-react';
import UserAbout from './UserAbout';
import { Profile } from '../../types/profile';

type Props = {
  profile: Profile,
}


function UserContent({profile}: Props) {
    const panes = [
        {menuItem: 'About', render: () => <UserAbout profile={profile}/>},
        {menuItem: 'Photos', render: () => <Tab.Pane> Photos</Tab.Pane>},
        // {menuItem: 'Attending Events', render: () => <Tab.Pane>Attending Events</Tab.Pane>},
        // {menuItem: 'Hosting Events', render: () => <Tab.Pane> Hosting Events</Tab.Pane>},
    ]
  return (
    <Tab
    menu={{fluid: true,  vertical: true}}
    menuPosition='right'
    panes = {panes}
/>
  )
};
export default UserContent;
