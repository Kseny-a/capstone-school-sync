import { Container } from 'semantic-ui-react'
import EventDashboard from '../components/events/dashboard/EventDashboard'
import NavBar from './NavBar'
import { useState } from 'react'

function App() {

  const [showForm, setShowForm] = useState(false)
  
  return (
  <div>
    <NavBar setShowForm={setShowForm}/>
      <Container className='main'> 
        <EventDashboard showForm={showForm} setShowForm={setShowForm}/>
      </Container>
  </div>
  )
};

export default App