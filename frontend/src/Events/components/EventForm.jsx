import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLoaderData } from 'react-router-dom';
import { getAvailability } from '../../apis/availabilityApi';
import { createEvent } from '../../apis/eventApi';

function EventForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const data=useLoaderData();
    const onSubmit = (data) => {console.log(data)
        if(data)    createEvent(data);
    }
    ;
    
    if(!data) return <div className='flex flex-col items-center justify-center gap-5'>
        
    <h1 className='text-2xl text-red-600'>Please set your availability first before creating event</h1>
    <Link to="/availability" className="mx-auto bg-black text-white py-3 px-4 rounded-xl">Go to availability page</Link>;
    </div>
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col bg-blue-200 w-1/2 mx-auto py-6 px-3 gap-4">
            
            {/* Title Input */}
            <input 
                type="text" 
                placeholder="Title"
                {...register("title", { required: "Title is required" })}
                className="bg-gray-200 rounded-xl text-xl p-3"
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}

            {/* Description Input */}
            <input 
                type="text" 
                placeholder="Description"
                {...register("description", { 
                    required: "Description is required",
                    maxLength: { value: 250, message: "Description must be less than 250 characters" },
                    minLength: { value: 1, message: "Description must be at least 1 character long" }
                })}
                className="bg-gray-200 rounded-xl text-xl p-3"
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}

            {/* Duration Input */}
            <input 
                type="number" 
                placeholder="Duration"
                {...register("duration", { 
                    required: "Duration is required",
                    min: { value: 0, message: "Duration cannot be less than 0" },
                    pattern: { value: /^(?:[1-9]\d*|\d+(\.\d+)?|\.\d+)$/, message: "Invalid duration format" }
                })}
                className="bg-gray-200 rounded-xl text-xl p-3"
            />
            {errors.duration && <p className="text-red-500">{errors.duration.message}</p>}

            {/* Submit Button */}
            <input className="bg-black text-white rounded-xl text-xl p-3" type="submit" />
        </form>
    );
}
export async function fetchAvailabilityFromApi() {
    const availabilityResponse=await getAvailability();
    if(availabilityResponse?.status==="fail"&availabilityResponse.length===0) return false;
    else return true; 
}



export default EventForm;
