import Header from "./components/Header";
import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col h-screen overflow-y-scroll">
      <Header></Header>
      <div className="w-full  flex">
        <div className="w-1/5 flex flex-col py-4 h-screen">
          <Link
            to="/book-event"
            className="bg-blue-200 py-4 rounded-md text-center"
          >
            Book events
          </Link>
          <Link
            to="/availability"
            className="bg-blue-200 py-4 rounded-md text-center"
          >
            My Availability
          </Link>
          <Link
            to="/bookings"
            className="bg-blue-200 py-4 rounded-md text-center"
          >
            My Bookings
          </Link>
          <Link
            to="/events"
            className="bg-blue-200 py-4 rounded-md text-center"
          >
            My Events
          </Link>
          <Link
            to="/create-event"
            className="bg-blue-200 py-4 rounded-md text-center"
          >
            Create Event
          </Link>
        </div>
        <main className="w-4/5 h-full px-6 bg-blue-100 pt-8 ">
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
}

export default Layout;
