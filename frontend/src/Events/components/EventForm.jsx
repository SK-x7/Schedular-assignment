import React from 'react';
import { useForm } from 'react-hook-form';
import { createEvent } from '../../apis/eventApi';

function EventForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = (data) => {console.log(data)
    createEvent(data);
    }
    ;
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col bg-blue-200 w-1/2 m-auto py-6 px-3 gap-4">
            
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

export default EventForm;
