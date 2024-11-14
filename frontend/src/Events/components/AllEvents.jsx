import { Link, useLoaderData } from "react-router-dom";
import { getAllEvents } from "../../apis/eventApi";

function AllEvents() {
    const allEvents = useLoaderData();
    if(!allEvents) return <div>No events yet</div>
    console.log(allEvents);
    return (
        <div className=" w-full flex flex-col gap-6 h-full">
        <h1 className="text-3xl">Events</h1>
        <div className=" w-full px-6 rounded-lg grid grid-cols-2 gap-5 h-full overflow-y-scroll">
                {
                    allEvents&&allEvents.map((event)=>(
                        <Link to={`/create-event/${event?.instructorId}/${event?.id}`} key={event.id} state={{event}} onClick={()=>localStorage.setItem("currentEventDuration",event?.duration)}>
                        <div className="bg-white rounded-lg px-5 py-5 flex flex-col gap-3 justify-between">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <h1 className="text-2xl">{event?.title||"This is tytle"}</h1>
                                <span className="text-gray-600 !text-xs">{4} Bookings</span>
                            </div>
                        <div className="flex gap-1 items-center text-xs mt-2">
                            <span className="text-gray-600 text-xs">Instructor : {event?.instructorName||"My name"}</span>
                            <span className="text-gray-600 text-xs">|</span>
                            <span className="text-gray-600 text-xs">{event?.duration||"30"} mins</span>
                        </div>
                        <p className="!text-sm">{event?.description||"This is duration This is duration This is duration This is duration This is duration This is duration This is duration This is duration This is duration "}</p>
                        </div>
                        <div className="flex gap-4">
                        {/* <button className="bg-blue-600 text-white font-semibold rounded-lg px-3 py-[6px]">Copy link</button> */}
                        {/* <button className="bg-red-600 text-white font-semibold rounded-lg px-3 py-[6px] ">Delete</button> */}
                        </div>
                    </div>
                </Link>
                    ))
                }
        </div>
      </div>
    )
}


export async function fetchAllEventsFromApi() {
    const eventsData=await getAllEvents();
    console.log(eventsData);
    if(eventsData?.status==="success")  return eventsData.allEvents;
    else return null;
    
}

export default AllEvents
