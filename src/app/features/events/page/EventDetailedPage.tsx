import { Grid } from "semantic-ui-react"
import EventDetailedInfo from './EventDetailedInfo'
import EventDetailedHeader from "./EventDetailedHeader"

function EventDetailedPage() {
  return (
    <Grid>
      <Grid.Column width = {10}>
        <EventDetailedHeader/>
        <EventDetailedInfo/>
      </Grid.Column>
      <Grid.Column width = {6}>
        SideBar
      </Grid.Column>
    </Grid>
  )
}

export default EventDetailedPage