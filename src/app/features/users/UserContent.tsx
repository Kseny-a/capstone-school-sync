import { Tab } from 'semantic-ui-react';


function UserContent() {
    const panes = [
        {menuItem: 'About', render: () => <Tab.Pane> About User</Tab.Pane>},
        {menuItem: 'Photos', render: () => <Tab.Pane> Photos</Tab.Pane>},
        {menuItem: 'Events', render: () => <Tab.Pane> Events</Tab.Pane>},

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
