import { createBooking, getBookings } from "../../apis/bookingsApi";
import { availabilityFromApi, defaultAvailability } from "../../data/data";
import { generateAvailableDates, generateAvailableSlots } from "../../utils/bookingHelper";
import { ClerkProvider } from '@clerk/clerk-react'
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema } from "../../utils/formvalidators";
import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useLoaderData, useLocation } from "react-router-dom";
import { getAvailability } from "../../apis/availabilityApi";



function CreateBookings() {
  // OAuth2Client
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });
  
  const { user } = useUser();
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    if (user && user.externalAccounts.length > 0) {
      // Find the OAuth access token from the external account
      const externalAccount = user.externalAccounts.find(
        (account) => account.provider === "google" // or the OAuth provider you're using, e.g., "github", "facebook"
      );
      if (externalAccount) {
        setAccessToken(externalAccount.accessToken);
      }
    }
  }, [user]);
  
  
    const location = useLocation();
    const [selectedDate,setSelectedDate]=useState(null);
    const [selectedTime,setSelectedTime]=useState(null);
    const { event } = location.state || {};
    const data=useLoaderData();
    console.log(event,data);
    const availabledays=data.map((obj)=>new Date(obj.date));
    const timeSlots = selectedDate
    ? data.find(
        (day) => day.date === format(selectedDate, "yyyy-MM-dd")
      )?.timeSlots || []
    : [];

    console.log(availabledays);
    
    useEffect(()=>{
      if(selectedDate){
        setValue("date",format(selectedDate, "yyyy-MM-dd"));
      }
    },[selectedDate])
    useEffect(()=>{
      if(selectedTime){
        alert(selectedTime);
        setValue("time",selectedTime);
      }
    },[selectedTime])
    
    async function onSubmit(data) {
console.log(data);
const {additionalInfo,date,email,name,time}=data;      
let baseDate=new Date(data.date).toISOString().slice(0,10);
      let sTime=String(data.time).slice(1,6);
      let eTime=String(data.time).slice(8,13);
      // let startTime=`${baseDate}T`
      console.log(baseDate,sTime,eTime);
      let startTime=`${baseDate}T${sTime}:00.000Z`
      let endTime=`${baseDate}T${eTime}:00.000Z`
      console.log(startTime,endTime);
      
      const obj={
      additionalInfo,studentEmail:email,studentName:name,startTime,endTime,instructorId:event.instructorId,eventId:event.id,studentId:localStorage.getItem("userId")||null
      }
      await createBooking(obj);
    };
    
    
    

    
    return (
      
    <div className="flex w-full justify-evenly items-start h-full">
    
        <div className="bg-white w-1/2 rounded-lg px-5 py-5 flex flex-col gap-10 justify-between
          max-h-min ">
                        <div className="flex flex-col items-start">
                        <h1 className="text-2xl">{event?.title||"This is tytle"}</h1>
                        <div className="flex justify-between my-3 items-center w-full">
                            
                        <div className="flex flex-col gap-1  items-start text-xs mt-2">
                            <span className="text-gray-600 text-xs">Instructor : {event?.instructorName||"My name"}</span>
                            <span className="text-gray-600 text-xs">{event?.emailId ||"event@gmail.com"}</span>
                        </div>
                        <div className="flex flex-col gap-1  items-end text-xs mt-2">
                            <span className="text-gray-600 text-xs">🕰️ {event?.duration||"30"}  minutes</span>
                            <span className="text-gray-600 text-xs">💠Google meet</span>
                        </div>
                        </div>
                        
                        
                        <p className="!text-sm my-3">{event?.description||"This is duration This is duration This is duration This is duration This is duration This is duration This is duration This is duration This is duration "}</p>
                        </div>
                        {
          selectedTime&&selectedDate&&(
          <form className=" flex flex-col gap-4 w-full mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name")} placeholder="Your name" className="p-3 border rounded-xl"/>
            {errors.name&&(
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}   
            <input {...register("email")} placeholder="Your email" className="p-3 border rounded-xl"/>
            {errors.email&&(
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}   
            <input {...register("additionalInfo")} type="text" placeholder="Additional information" className="p-3 border rounded-xl"/>
            <button className="bg-black text-white p-3  rounded-lg " type="submit">Book event</button>
          </form>)
        }
                    </div>
                    <div className="flex flex-col justify-start gap-5 w-1/2 px-3 py-3 h-[90vh]">
        <div className="flex justify-center items-center h-1/2 ">
            <DayPicker mode="single" disabled={[{before:new Date()}]} selected={selectedDate} onSelect={(date)=>{setSelectedDate(date),setSelectedTime(null)}} modifiers={{available:availabledays}} modifiersStyles={{available:{
                background:"lightblue",
                borderRadius:100
            }}}></DayPicker>                
        </div>
        {
            selectedDate&& <div className="mb-4 h-64 flex flex-col justify-start items-center gap-2">
            <h3 className="text-lg font-semibold mb-2">
              Available Time Slots
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 h-full overflow-y-scroll w-3/4">
              {timeSlots&& timeSlots.map((slot,index) => (
                <button
                className={selectedTime===slot?`bg-black text-white  rounded-xl sm:font-medium sm:py-2 py-1 sm:text-sm`: `bg-white text-black rounded-xl sm:font-medium sm:py-2 py-1 sm:text-sm`}
                  key={slot}
                  value={slot}
                  onClick={() => setSelectedTime(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        }
        </div>
        
                    </div>
                  
                    
        
    )
      
      }

export default CreateBookings


export async function fetchEventAvailabilityAndBookingsFromApi({params}){
    console.log(params);
    const obj=[];
    const availabilityResponse=await getAvailability(params.instructorId);
    const bookingsResponse=await getBookings(params.instructorId,params.eventId);
    console.log(availabilityResponse,bookingsResponse);
    if(availabilityResponse?.status==="success"){
        console.log(availabilityResponse);
        await availabilityResponse?.data?.availabilityData.forEach((availability) => {
            const dayKey = availability?.day.toLowerCase();
            if (availabilityFromApi[dayKey]) {
                availabilityFromApi[dayKey].isAvailable = availability.status === "available";
                availabilityFromApi[dayKey].startTime = (new Date(availability?.startTime).toISOString().slice(11,16))||"09:00";
                availabilityFromApi[dayKey].endTime = (new Date(availability?.endTime).toISOString().slice(11,16))||"17:00";
            }
        });
        // availabilityFromApi.timeGap=availabilityResponse?.data?.timeGap
        obj.push({availabilityFromApi,timeGap:availabilityResponse?.data?.timeGap})
        // return obj;
    }
    if(bookingsResponse?.status==="success"&&bookingsResponse?.length>0){
        obj.push(bookingsResponse?.bookings);
        console.log(obj);
    }
    console.log(availabilityFromApi);
    // const bookingSlots=generateAvailableDates(availabilityFromApi,bookingsResponse?.bookings)
    return (generateAvailableSlots(availabilityFromApi,bookingsResponse?.bookings,availabilityResponse?.data?.timeGap,Number(localStorage.getItem("currentEventDuration"))));
    
    
}


