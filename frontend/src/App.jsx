import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Events from "./Events/components/Events"
import {fetchEventsFromApi as eventsLoader} from "./Events/components/Events"
import Layout from "./Ui/Layout"

const router=createBrowserRouter([
  {
    path:'/',
    element:<Layout></Layout>,
    children:[{
      path:"/events",
      element:<Events></Events>,
      loader:eventsLoader
    }]
  }
])


function App() {
  
  
  
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
