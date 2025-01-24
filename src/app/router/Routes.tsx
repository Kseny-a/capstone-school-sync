import { createBrowserRouter } from "react-router-dom";
import EventDashboard from "../components/events/dashboard/EventDashboard";
import EventForm from "../features/events/form/EventForm";
import App from "../layout/App";
import EventDetailedPage from "../features/events/page/EventDetailedPage";



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
  