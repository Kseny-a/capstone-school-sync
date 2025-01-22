import { Container } from 'semantic-ui-react'
import EventDashboard from '../components/events/dashboard/EventDashboard'
import NavBar from './NavBar'
import { useState } from 'react'
import { AppEvent } from '../types/event'

function App() {

  const [showForm, setShowForm] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null)
  
  const handleSelectedEvent = (event: AppEvent) => {
    setSelectedEvent(event)
    setShowForm(true)
  }

  const handleOpenCreateForm = () => {
    setSelectedEvent(null)
    setShowForm(true)
  }


  return (
  <div>
    <NavBar setShowForm={handleOpenCreateForm} />
      <Container className='main'> 
        <EventDashboard 
        showForm={showForm} 
        setShowForm={setShowForm}
        selectedEvent={selectedEvent}
        selectEvent={handleSelectedEvent}
        />
      </Container>
  </div>
  )
};

export default App