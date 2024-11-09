import React from 'react';
import { useForm } from 'react-hook-form';function EventForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);
    
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col bg-blue-200 w-1/2 m-auto py-6 px-3 gap-4">
        <input type="text" placeholder="title" {...register} className="bg-gray-200 rounded-xl text-xl p-3"/>
        <input type="text" placeholder="description" {...register("description", { max: 500, min: 1})} className="bg-gray-200 rounded-xl text-xl p-3"/>
        <input type="number" placeholder="duration" {...register("duration", {min:0,pattern: /^(?:[1-9]\d*|\d+(\.\d+)?|\.\d+)$/i})} className="bg-gray-200 rounded-xl text-xl p-3"/>
  
        <input className="bg-black text-white rounded-xl text-xl p-3" type="submit" />
      </form>
    )
}

export default EventForm
