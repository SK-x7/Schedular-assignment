import { useLoaderData } from "react-router-dom";
import { getAvailability } from "../../apis/availabilityApi";
import { availabilityFromApi, defaultAvailability } from "../../data/data"
import AvailabilityForm from "./AvailabilityForm"

function AvailabilityPage() {
    
    const data=useLoaderData();
    const finalData={};
    
   
    
    
    console.log(data,"=============================================================================================");
    // ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].forEach((day)=>{
    //     data?.availabilityData.find(d=>d.day===day.toUpperCase());
        
    // })
    
    return (
        <div className="w-full flex flex-col gap-6 h-full">
            <h1 className="text-3xl">Availability</h1>
            <div>
                
            <AvailabilityForm initialAvailabilityData={data?.availabilityFromApi||defaultAvailability} gap={data?.timeGap}></AvailabilityForm>
            </div>
        </div>
    )
}

export default AvailabilityPage

export async function fetchAvailabilityFromApi() {
    const availabilityResponse=await getAvailability();
    console.log(availabilityResponse);
    if(availabilityResponse?.status==="success"){
        
        await availabilityResponse?.data?.availabilityData.forEach((availability) => {
            const dayKey = availability?.day.toLowerCase();
            if (availabilityFromApi[dayKey]) {
                availabilityFromApi[dayKey].isAvailable = availability.status === "available";
                availabilityFromApi[dayKey].startTime = (availability.startTime);
                availabilityFromApi[dayKey].endTime = (availability.endTime);
            }
        });
        // availabilityFromApi.timeGap=availabilityResponse?.data?.timeGap
        return {availabilityFromApi,timeGap:availabilityResponse?.data?.timeGap};
    }
    else return defaultAvailability;
    
    // return null; 
}
