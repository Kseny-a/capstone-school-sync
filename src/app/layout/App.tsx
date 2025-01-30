import { Container } from 'semantic-ui-react'
import NavBar from './NavBar'
import { Outlet, useLocation } from 'react-router-dom'
import HomePage from '../features/home/HomePage';
import ManageModal from '../modals/ManageModal';
import { useEffect } from 'react';
import { useAppDispatch } from '../store/store';
import { onAuthStateChanged } from 'firebase/auth';
import { logIn, logOut } from '../features/auth/authSlice';
import { auth } from '../api/config/firebase';

function App() {

  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, {
      next: user => {
        if (user) {
          dispatch(logIn(user));
        } else {
          dispatch(logOut());
        }
      },
      error: error => console.log(error),
      complete: () => {}
    })

  }, [dispatch])
  
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