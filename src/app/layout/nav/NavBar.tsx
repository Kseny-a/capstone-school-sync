import React from 'react'
import { Button, Menu, Container, MenuItem } from 'semantic-ui-react'

export default function NavBar() {
  return (
		<Menu inverted={true} fixed='top'>
			<Container>
				<MenuItem header>
					<img src="/logo.png" alt="logo" />
					SchoolSync
				</MenuItem>
				<MenuItem name='Events' />
				<MenuItem>
					<Button floated='right' positive={true} inverted={true} content='Create event' />
				</MenuItem>
				<MenuItem position='right'>
					<Button basic inverted content='Login'/>
					<Button basic inverted content='Register'/>
				</MenuItem>
 			</Container>
		</Menu>
	)
}
   
