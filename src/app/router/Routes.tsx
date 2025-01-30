import { createBrowserRouter } from "react-router-dom";
import EventDashboard from "../features/events/dashboard/EventDashboard";
import EventForm from "../features/events/forms/EventForm";
import App from "../layout/App";
import EventDetailedPage from "../features/events/page/EventDetailedPage";
import UserProfile from "../features/users/UserProfile";
import LoginForm from "../features/auth/LoginForm";
import RegisterForm from "../features/auth/RegisterForm";
import SignedIn from "../layout/SignedIn";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {path: "/events", element: <EventDashboard />},
        {path: "/events/:id", element: <EventDetailedPage/>},
        {path: "/manage/:id", element: <EventForm/>},
        {path: "/user-profile/:userId", element: <UserProfile/>},
        {path: "/createEvent/", element: <EventForm />},
        {path: '/login', element: <LoginForm />},
        {path: '/register', element: <RegisterForm />},
        {path: '/sign-in', element: <SignedIn />}, 

      ],
    },
  ]);
  