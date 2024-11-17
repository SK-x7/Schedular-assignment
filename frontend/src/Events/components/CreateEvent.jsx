import { Link, useLoaderData } from "react-router-dom";
import EventForm from "./EventForm"

function CreateEvent() {

    return (
        <div className="!h-full w-full flex flex-col gap-16">
            
            <h1 className="ml-9 text-2xl">Create Event</h1>
            <EventForm></EventForm>
        </div>
    )
    }

export default CreateEvent

