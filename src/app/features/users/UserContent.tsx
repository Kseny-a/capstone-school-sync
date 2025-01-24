import { Tab } from 'semantic-ui-react';


function UserContent() {
    const panes = [
        {menuItem: 'About', render: () => <Tab.Pane> About User</Tab.Pane>},
        {menuItem: 'Photos', render: () => <Tab.Pane> Photos</Tab.Pane>},
        {menuItem: 'Class Events', render: () => <Tab.Pane> Events</Tab.Pane>},
        {menuItem: 'Attending Events', render: () => <Tab.Pane>Attending Events</Tab.Pane>},
        {menuItem: 'Hosting Events', render: () => <Tab.Pane> Hosting Events</Tab.Pane>},
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
