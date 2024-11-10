import { SignUp } from "@clerk/clerk-react"
import Header from "./components/Header"
import { Outlet, Route, Routes } from "react-router-dom"

function Layout() {
  return (
    <div className="!h-screen flex flex-col overflow-y-scroll" >
      <Header></Header>
      <div className="w-full bg-white flex h-[92%]">  
        
      <div className="w-1/5 flex flex-col py-4">
      {/* <li>Dashboard</li> */}
      <li className="bg-blue-200 py-4 rounded-md">Events</li>
      <li className="bg-white py-2 rounded-md">Events</li>
      <li className="bg-white py-2 rounded-md">Events</li>
    </div>
      <main className="w-4/5 h-full px-6 bg-blue-100 pt-8 ">
        <Outlet></Outlet>
      </main>
      </div>
      </div>
    )
}


function UsethisLater(params) {
  //events and dashboard in present in this 
  return <div>
        
  <div className="w-full bg-white flex">
    <div className="w-1/5 h-full flex flex-col py-4">
      {/* <li>Dashboard</li> */}
      <li className="bg-blue-200 py-4 rounded-md">Events</li>
      <li className="bg-white py-2 rounded-md">Events</li>
      <li className="bg-white py-2 rounded-md">Events</li>
    </div>
    
    {/* //dashboard */} 
    <div className="bg-blue-200 w-full px-11 flex flex-col gap-6">
      <h1 className="text-3xl">Dashboard</h1>
      <div className="bg-white w-full px-6 rounded-lg">
        <h2>Welcome satyen</h2>
        <h3>THis is our dashboard page</h3>
      </div>
    </div>
  </div>
  
  {/* events */}
    <div className="bg-blue-200 w-full px-11 flex flex-col gap-6">
      <h1 className="text-3xl">Events</h1>
      <div className=" w-full px-6 rounded-lg grid grid-cols-2 gap-5">
        {/* event card */}
        <div className="bg-white rounded-lg px-5 py-5 flex flex-col gap-3">
          <div className="flex flex-col">
          <h1 className="text-2xl">Event 1</h1>
          <span className="text-gray-600 text-xs">30 mins</span>
          </div>
          <p className="text-sm">This is your first event in which we will discusss everything</p>
          <div className="flex gap-4">
            <button>Copy link</button>
            <button>Delete</button>
          </div>
        </div>
        <div className="bg-white">
          <div className="flex flex-col">
          <h1 className="text-2xl">Event 1</h1>
          <span className="text-gray-600 text-xs">30 mins</span>
          </div>
          <p className="text-sm">This is your first event in which we will discusss everything</p>
          <div className="flex gap-4">
            <button>Copy link</button>
            <button>Delete</button>
          </div>
        </div>
        <div className="bg-white">
          <div className="flex flex-col">
          <h1 className="text-2xl">Event 1</h1>
          <span className="text-gray-600 text-xs">30 mins</span>
          </div>
          <p className="text-sm">This is your first event in which we will discusss everything</p>
          <div className="flex gap-4">
            <button>Copy link</button>
            <button>Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default Layout
