import {Controller, useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { availabilitySchema } from "../../utils/formvalidators";


function AvailabilityForm({initialAvailabilityData}) {
    const { register, handleSubmit,control,setValue, formState: { errors } } = useForm(
        {
            resolver:zodResolver(availabilitySchema),
            defaultValues:{...initialAvailabilityData}
        }
    );
    const onSubmit = data => console.log(data);
    console.log(errors);
    
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        {
            ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"].map((day)=>(
                <div key={day} className="flex items-center space-x-3 mb-3">
                    <Controller name={`${day}.isAvailable`} control={control} render={
                        ({field})=>(
                            <input type="checkbox" className="capitalize h-4 w-4" checked={field.value} onChange={(e) => {
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
                </div>
            ))
        }
  
        <input type="submit" />
      </form>
    );
}

export default AvailabilityForm
