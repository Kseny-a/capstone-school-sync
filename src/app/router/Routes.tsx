import { createBrowserRouter } from "react-router-dom";
import EventDashboard from "../components/events/dashboard/EventDashboard";
import EventForm from "../components/events/forms/EventForm";
import App from "../layout/App";
import EventDetailedPage from "../features/events/page/EventDetailedPage";
import UserProfile from "../features/users/UserProfile";



export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {path: "/events", element: <EventDashboard />},
        {path: "/events/:id", element: <EventDetailedPage/>},
        {path: "/manage/:id", element: <EventForm/>},
        {path: "/user-profile", element: <UserProfile/>},
        {path: "/createEvent/", element: <EventForm />},
      ],
    },
  ]);
  