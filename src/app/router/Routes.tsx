import { createBrowserRouter } from "react-router-dom";
import EventDashboard from "../components/events/dashboard/EventDashboard";
import EventForm from "../components/events/form/EventForm";
import App from "../layout/App";
import EventDetailedPage from "../features/events/pages/EventDetailedPage";



export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {path: "/events", element: <EventDashboard />},
        {path: "/events/:id", element: <EventDetailedPage/>},
        {path: "/manage/:id", element: <EventForm/>},
        {path: "/createEvent/", element: <EventForm />},
      ],
    },
  ]);
  