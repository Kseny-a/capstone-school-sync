import { Container } from 'semantic-ui-react'
import EventDashboard from '../features/events/dashboard/EventDashboard'
import NavBar from './nav/NavBar'
import { useState } from 'react'

function App() {

  
  const [showForm, setShowForm] = useState(false)
  console.log("showForm in App:", showForm); // Should log true/false
  console.log("setShowForm in App:", setShowForm); // Should log a function

  // 
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