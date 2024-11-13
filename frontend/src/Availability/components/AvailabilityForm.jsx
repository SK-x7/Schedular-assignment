import {Controller, useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { availabilitySchema } from "../../utils/formvalidators";
import { timeSlots } from "../../data/data";
import { createAvailability } from "../../apis/availabilityApi";


function AvailabilityForm({initialAvailabilityData,gap}) {
    const { register, handleSubmit,control,setValue,watch, formState: { errors } } = useForm(
        {
            resolver:zodResolver(availabilitySchema),
            defaultValues:{...initialAvailabilityData}
        }
    );
    const onSubmit = (data) => {
        console.log(data)
        console.log(Object.entries(data));
        const timeGap=data?.timeGap;
        const availabilityData=Object.entries(data).flatMap(([day,{isAvailable,startTime,endTime}])=>{
            if(isAvailable){
                const baseDate=new Date().toISOString().split('T')[0];
                return [{
                    day:day.toUpperCase(),
                    startTime: new Date(`${baseDate}T${startTime}:00Z`),
                    endTime: new Date(`${baseDate}T${endTime}:00Z`),
                }]
            }
            
            return [];
        })
        
        console.log(availabilityData);
        console.log("======================================");
        console.log(timeGap);
        const obj={
            timeGap,
            availabilityData
        }
        createAvailability(obj);
        alert("Request made");
    };
    console.log(errors);
    console.log(initialAvailabilityData,gap);
    // if(!initialAvailabilityData||!gap)    return<div></div>
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        {
            ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"].map((day)=>{
                const isAvailable = watch(`${day}.isAvailable`);
                
                return (<><div key={day} className="flex items-center space-x-3 mb-3">
                    <Controller name={`${day}.isAvailable`} control={control} render={
                        ({field})=>(
                            <input type="checkbox" defaultChecked={initialAvailabilityData}  className="capitalize h-4 w-4" checked={field.value||false} onChange={(e) => {
                                const isChecked = e.target.checked;
                                setValue(`${day}.isAvailable`, isChecked);
                                
                                // Set default start and end times if unchecked
                                if (!isChecked) {
                                  setValue(`${day}.startTime`, "09:00");
                                  setValue(`${day}.endTime`, "17:00");
                                }
                              }}/>
                        )
                    
                    
                    }
                        
                        
                        
                        ></Controller>
                    <span className="capitalize">{day}</span>
                    {
                        isAvailable&&(
                            <>
                        <Controller name={`${day}.startTime`} control={control} render={
                        ({field})=>(
                            <select value={field.value} onChange={field.onChange}>
                                {
                                    timeSlots.map((timeslot)=>{
                                        return(<option key={timeslot} value={timeslot}>{timeslot}</option>)
                                    })
                                }
                            </select>
                        )}></Controller>
                        <span>to</span>
                        <Controller name={`${day}.endTime`} control={control} render={
                        ({field})=>(
                            <select value={field.value} onChange={field.onChange}>
                                {
                                    timeSlots.map((timeslot)=>{
                                        return(<option key={timeslot} value={timeslot}>{timeslot}</option>)
                                    })
                                }
                            </select>
                        )}></Controller>
                            
                            {/* {errors[day]?.endTime} */}
                            
                            
                            </>
                        )
                    }
                    {errors?.[day]?.endTime && <p className="text-red-500 text-sm">{errors[day]?.endTime?.message}</p>}
                </div>
 
                </>)
})
        }
                       <div className="flex space-x-2">
                    <span className="">Minimum gap between bookings (in minutes) : </span>
                    <input type="number" defaultValue={gap} {
                        ...register("timeGap",{
                            valueAsNumber:true,
                            
                            
                        })}
                        className="w-16 pl-2"
                        />
                        {errors?.timeGap && <p className="text-red-500 text-sm">{errors?.timeGap?.message}</p>}
                </div>
        <button className="bg-blue-500 text-white px-3 rounded-2xl py-3 mt-6">Update Availability</button>
      </form>
    );
}

export default AvailabilityForm
