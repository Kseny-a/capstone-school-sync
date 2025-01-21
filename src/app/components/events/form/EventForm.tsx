import { Button, CardDescription, Form, Header, Segment } from 'semantic-ui-react';
import { useState } from 'react'

type Props = {
  setShowForm: (value: boolean) => void
}
function EventForm({ setShowForm }: Props) {

  const initialValues = {
    title: '',
    date: '',
    time: '',
    description: '',
    venue: '',
    address: '',
  }

  const [eventForm, setEventForm] = useState(initialValues)
  
  const handleChange = (e: any) => {
    const {name, value} = e.target
    setEventForm({...eventForm, [name]: value})
  }

  function onHandleSubmit() {
    console.log(eventForm)
  }


  return (
    <Segment clearing>
      <Header content='Create Event' />
      <Form onSubmit={onHandleSubmit}>
        <Form.Field>
          <input 
          type='text' 
          placeholder='Event title' 
          value={eventForm.title}
          name='title'
          onChange={e => handleChange(e)}/>
        </Form.Field>
        <Form.Field>
          <input 
          type='text' 
          placeholder='Date'
          value={eventForm.date}
          name='date'
          onChange={e => handleChange(e)}/> 
        </Form.Field>
        <Form.Field>
          <input 
          type='text' 
          placeholder='Time'
          value={eventForm.time}
          name='time'
          onChange={e => handleChange(e)}/> 
        </Form.Field>
        <Form.Field>
          <input 
          type='text' 
          placeholder='Description'
          value={eventForm.description}
          name='description'
          onChange={e => handleChange(e)}/> 
        </Form.Field>
        <Form.Field>
          <input 
          type='text' 
          placeholder='Venue'
          value={eventForm.venue}
          name='venue'
          onChange={e => handleChange(e)}/> 
        </Form.Field>
        <Form.Field>
          <input 
          type='text' 
          placeholder='Address'
          value={eventForm.address}
          name='address'
          onChange={e => handleChange(e)}/> 
        </Form.Field>
        <Button type='submit' floated='right' inverted color='blue' content='Submit'></Button>
        <Button onClick={() => setShowForm(false)} type='button' floated='right' inverted color='blue' content='Cancel'></Button>
      </Form>

    </Segment>
  )
}

export default EventForm