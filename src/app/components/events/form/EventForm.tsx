import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { useState } from 'react'
import { AppEvent } from '../../../types/event'

type Props = {
  setShowForm: (value: boolean) => void
  addEvent: (event: AppEvent) => void
  selectedEvent: AppEvent | null
  updateEvent: (event: AppEvent) => void
}

function EventForm({ setShowForm, addEvent, selectedEvent, updateEvent }: Props) {
  
  const defaultValues = selectedEvent ?? {
    title: '',
    date: '',
    time: '',
    description: '',
    venue: '',
    address: '',
  }
  
  const [eventForm, setEventForm] = useState(defaultValues)

  
  const handleInputChange = (e: any) => {
    const {name, value} = e.target
    setEventForm({...eventForm, [name]: value})
  }

  const onSubmit = () => {
    selectedEvent ? updateEvent({...selectedEvent, ...eventForm}):
      addEvent({...eventForm, id: 'a', hostedBy: 'Robot', attendees: [], address: '', hostPhotoURL: ''})
    setShowForm(false)
  }


  return (
    <Segment clearing>
      <Header content={selectedEvent ? 'Update Event' : 'Create Event'}/>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <input 
          type='text' 
          placeholder='Event title' 
          value={eventForm.title}
          name='title'
          onChange={e => handleInputChange(e)}/>
        </Form.Field>
        <Form.Field>
          <input 
          type='text' 
          placeholder='Date mm/dd/yyyy'
          value={eventForm.date}
          name='date'
          onChange={e => handleInputChange(e)}/> 
        </Form.Field>
        <Form.Field>
          <input 
          type='text' 
          placeholder='Time'
          value={eventForm.time}
          name='time'
          onChange={e => handleInputChange(e)}/> 
        </Form.Field>
        <Form.Field>
          <input 
          type='text' 
          placeholder='Description'
          value={eventForm.description}
          name='description'
          onChange={e => handleInputChange(e)}/> 
        </Form.Field>
        <Form.Field>
          <input 
          type='text' 
          placeholder='Venue'
          value={eventForm.venue}
          name='venue'
          onChange={e => handleInputChange(e)}/> 
        </Form.Field>
        <Form.Field>
          <input 
          type='text' 
          placeholder='Address'
          value={eventForm.address}
          name='address'
          onChange={e => handleInputChange(e)}/> 
        </Form.Field>
        <Button type='submit' floated='right' inverted color='blue' content='Submit'></Button>
        <Button onClick={() => setShowForm(false)} type='button' floated='right' inverted color='blue' content='Cancel'></Button>
      </Form>

    </Segment>
  )
}

export default EventForm