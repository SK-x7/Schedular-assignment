import { useLoaderData } from "react-router-dom";
import { getAllEventsByUser } from "../../apis/eventApi";

function Events() {
    const events = useLoaderData();
    if(!events) <div>No events yet</div>
    console.log(events);
    return (
        <div className=" w-full flex flex-col gap-6 h-full">
        <h1 className="text-3xl">Events</h1>
        <div className=" w-full px-6 rounded-lg grid grid-cols-2 gap-5 h-full overflow-y-scroll">
                {
                    events&&events.map((event)=>(
                        <div className="bg-white rounded-lg px-5 py-5 flex flex-col gap-3 justify-between">
                        <div className="flex flex-col gap-2">
                        <h1 className="text-2xl">{event?.title}</h1>
                        <span className="text-gray-600 text-xs">{event?.duration}</span>
                        <p className="text-sm">{event?.description}</p>
                        </div>
                        <div className="flex gap-4">
                        <button className="bg-blue-600 text-white font-semibold rounded-lg px-3 py-[6px]">Copy link</button>
                        <button className="bg-red-600 text-white font-semibold rounded-lg px-3 py-[6px] ">Delete</button>
                        </div>
                    </div>
                    ))
                }
        </div>
      </div>
    )
}

export async function fetchEventsFromApi() {
    const eventsData=await getAllEventsByUser();
    if(eventsData?.status==="success")  return eventsData.events;
    else return null;
}


export default Events
