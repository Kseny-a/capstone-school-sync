import { Container } from 'semantic-ui-react'
import NavBar from './NavBar'
import { Outlet, useLocation } from 'react-router-dom'
import HomePage from '../features/home/HomePage';
import ManageModal from '../modals/ManageModal';

function App() {

  const location = useLocation();
  
  return (
    <>
    <ManageModal/>
    {location.pathname === '/' ? <HomePage/>: (
    <>
      <NavBar/>
        <Container className='main'> 
          <Outlet/>
        </Container>
    </>
    )}
  </>
  )
};

export default App