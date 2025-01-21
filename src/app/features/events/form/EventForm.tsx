import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { useState } from 'react';

type Props ={
    setShowForm: (value: boolean) => void
}
function EventForm({setShowForm}: Props) {
    const initialValues = {
        title: '',
        date: '',
        time: '',
        description: '',
        venue: '',
        location: '',

    }

    const [values, setValues] = useState(initialValues);
    function onSubmit() {
        console.log(values);
    }
    function handleInputChange(e: ChangeEvent<HTMLInputElement>)
    {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    }
  return (
    <Segment clearing>
        <Header content='Create Event'/>
        <Form onSubmit={onSubmit}>
            <Form.Field>
                <input
                 type='text'
                 placeholder='Event title'
                 value={values.title}
                 name='title'
                 onChange={e => handleInputChange(e)}/>
            </Form.Field>
            <Form.Field>
                <input
                 type='text'
                  placeholder='mm/dd/yyyy'
                  value={values.date}
                  name='date'
                  onChange={e => handleInputChange(e)}/>
            </Form.Field>
            <Form.Field>
                <input
                 type='text'
                  placeholder='Time'
                  value={values.time}
                  name='time'
                  onChange={e => handleInputChange(e)}/>
            </Form.Field>
            <Form.Field>
                <input
                 type='text'
                  placeholder='Description'
                  value={values.description}
                  name='description'
                  onChange={e => handleInputChange(e)}/>
            </Form.Field>
            <Form.Field>
                <input
                 type='text'
                  placeholder='Venue'
                  value={values.venue}
                  name='venue'
                  onChange={e => handleInputChange(e)}/>
            </Form.Field>
            <Form.Field>
                <input
                 type='text'
                  placeholder='Address'
                  value={values.location}
                  name='location'
                  onChange={e => handleInputChange(e)}/>
            </Form.Field>
            <Button type='submit' floated='right' inverted color='blue' content='Submit'></Button>
            <Button onClick={() => setShowForm(false)} type='button' floated='right' inverted color='blue' content='Cancel'></Button>
        </Form>

    </Segment>
  )
}

export default EventForm