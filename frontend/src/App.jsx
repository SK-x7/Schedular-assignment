import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AvailabilityPage from "./Availability/components/AvailabilityPage"
import Events from "./Events/components/Events"
import {fetchEventsFromApi as eventsLoader} from "./Events/components/Events"
import {fetchAvailabilityFromApi as availabilityLoader} from "./Availability/components/AvailabilityPage"
import {fetchAvailabilityFromApi as createEventLoader} from "./Events/components/EventForm"
import {fetchAllEventsFromApi as allEventsLoader} from "./Events/components/AllEvents"
import Layout from "./Ui/Layout"
import AllEvents from "./Events/components/AllEvents"
import CreateBookings from "./bookings/components/createBookings"
import {fetchEventAvailabilityAndBookingsFromApi as createBookingsLoader} from "./bookings/components/createBookings"
import CreateEvent from "./Events/components/CreateEvent"

const router=createBrowserRouter([
  {
    path:'/',
    element:<Layout></Layout>,
    children:[
      {
      path:"/events",
      element:<Events></Events>,
      loader:eventsLoader
    },
      {
      path:"/availability",
      element:<AvailabilityPage></AvailabilityPage>,
      loader:availabilityLoader
    },
      {
      path:"/book-event",
      element:<AllEvents></AllEvents>,
      loader:allEventsLoader
    },
      {
      path:"/create-event/:instructorId/:eventId",
      element:<CreateBookings></CreateBookings>,
      loader:createBookingsLoader
    },
      {
      path:"/create-event",
      element:<CreateEvent></CreateEvent>,
      loader:createEventLoader
    },
  
  
  ]
  }
])


function App() {
  
  
  
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
