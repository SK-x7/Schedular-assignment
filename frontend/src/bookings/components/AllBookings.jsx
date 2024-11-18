import { Link, useLoaderData } from "react-router-dom";
import { getBookingsOfUser } from "../../apis/bookingsApi";
// import { getAllEvents } from "../../apis/eventApi";

function AllBookings() {
    const allBookings = useLoaderData();
    if(!allBookings||!allBookings.length) return <div>No events yet</div>
    console.log(allBookings);
    return (    
        <div className=" w-full flex flex-col gap-6 h-full">
        <h1 className="text-3xl capitalize">My Bookings</h1>
        <div className=" w-full px-6 rounded-lg grid grid-cols-2 2xl:grid-cols-3 gap-5 h-full overflow-y-scroll">
                {
                    allBookings&&allBookings.map((booking,i)=>(
                        // <Link to={`/create-booking/${booking?.instructorId}/${booking?.id}`} key={i} state={{booking}} onClick={()=>localStorage.setItem("currentEventDuration",booking?.duration)}>
                        <div className="bg-white rounded-lg min-h-64 h-min max-h-72 px-5 py-5 flex flex-col gap-3 justify-start" key={i}>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <h1 className="text-2xl line-clamp-1">{booking?.title||"This is tytle"}</h1>
                            </div>
                        <div className="flex gap-1 items-center text-xs mt-2">
                            <span className="text-gray-600 text-xs">Instructor : {booking?.instructorName||"My name"}</span>
                            <span className="text-gray-600 text-xs">|</span>
                            <span className="text-gray-600 text-xs">{booking?.duration||"30"} mins</span>
                        </div>
                        <p className="!text-xs line-clamp-[7]">&quot;{booking?.descriptin||"This is duration This is duration This is duration This is duration This is duration This is duration This is duration This is duration This is durationduration This is durationduration This is durationduration This is durationduration This is durationdurationduration This is durationduration This is durationduration This is durationduration This is durationduration This is durationdurationduration This is durationduration This is durationduration This is durationduration This is durationduration This is durationdurationduration This is durationduration This is durationduration This is durationduration This is durationduration This is durationdurationduration This is durationduration This is durationduration This is durationduration This is durationduration This is durationdurationduration This is durationduration This is durationduration This is durationduration This is durationduration This is durationdurationduration This is durationduration This is durationduration This is durationduration This is durationduration This is durationduration This is durationduration This ration This ration This ration This ration This ration This ration This ration This ration This ration This ration This ration This ration This ration This ration This ration This ration This is durationduration This is durationduration This is durationduration This is durationduration This is duration"}&quot;</p>
                        </div>
                        <div className="flex flex-col gap-[2px]">
                            <span className="text-sm">📅 : {booking?.startTime.toString().slice(8,10)}-{booking?.startTime.toString().slice(5,7)}-{booking?.startTime.toString().slice(0,4)}</span>
                            <span className="text-sm">🕰️ : {(booking?.startTime).toString().slice(11,16)} - {(booking?.endTime).toString().slice(11,16)}</span>
                            
                        </div>
                        <div className="flex gap-4">
                        {/* <button className="bg-blue-600 text-white font-semibold rounded-lg px-3 py-[6px]">Copy link</button> */}
                        {/* <button className="bg-red-600 text-white font-semibold rounded-lg px-3 py-[6px] ">Delete</button> */}
                        </div>
                    </div>
                // </Link>
                    ))
                }
        </div>
      </div>
    )
}


export async function fetchAllBookingsOfUserFromApi() {
    const userBookingsData=await getBookingsOfUser();
    console.log(userBookingsData);
    if(userBookingsData?.status==="success")  return userBookingsData.userBookings;
    else return null;
}

export default AllBookings
