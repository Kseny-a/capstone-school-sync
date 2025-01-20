import { Button, Form, Header, Segment } from 'semantic-ui-react';

type Props ={
    setShowForm: (value: boolean) => void
}
function EventForm({setShowForm}: Props) {
  return (
    <Segment clearing>
        <Header content='Create Event'/>
        <Form>
            <Form.Field>
                <input type='text' placeholder='Event title'/>
            </Form.Field>
            <Form.Field>
                <input type='text' placeholder='Date'/>
            </Form.Field>
            <Form.Field>
                <input type='text' placeholder='Time'/>
            </Form.Field>
            <Form.Field>
                <input type='text' placeholder='Description'/>
            </Form.Field>
            <Form.Field>
                <input type='text' placeholder='Venue'/>
            </Form.Field>
            <Form.Field>
                <input type='text' placeholder='Address'/>
            </Form.Field>
            <Button type='submit' floated='right' inverted color='blue' content='Submit'></Button>
            <Button onClick={() => setShowForm(false)} type='button' floated='right' inverted color='blue' content='Cancel'></Button>
        </Form>

    </Segment>
  )
}

export default EventForm