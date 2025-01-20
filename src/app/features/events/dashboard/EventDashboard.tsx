import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "../form/EventForm";
import { sampleData } from "../../../api/sampleData";

type Props = {
  showForm: boolean
  setShowForm: (value: boolean) => void
}

function EventDashboard({ showForm, setShowForm }: Props) {
  console.log("showForm in App:", showForm); // Should log true/false
  console.log("setShowForm in App:", setShowForm); // Should log a function
  return (
    <Grid>
      <Grid.Column width = {10}>
          <EventList events={sampleData}/>
      </Grid.Column>
      <Grid.Column width = {6}>
        {showForm &&
          <EventForm setShowForm={setShowForm}/>}
      </Grid.Column>
    </Grid>
  )
}

export default EventDashboard