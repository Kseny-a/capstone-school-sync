import { Button, Form, Header, Segment } from 'semantic-ui-react';

function EventForm() {
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
            <Button type='button' floated='right' inverted color='blue' content='Cancel'></Button>
        </Form>

    </Segment>
  )
}

export default EventForm