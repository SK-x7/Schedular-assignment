import { defaultAvailability } from "../../data/data"
import AvailabilityForm from "./AvailabilityForm"

function AvailabilityPage() {
    return (
        <div className="w-full flex flex-col gap-6 h-full">
            <h1 className="text-3xl">Availability</h1>
            <div>
                
            <AvailabilityForm initialAvailabilityData={defaultAvailability}></AvailabilityForm>
            </div>
        </div>
    )
}

export default AvailabilityPage
