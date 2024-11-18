import dayjs from "dayjs";
// import { console } from "inspector/promises";

function isSlotBooked(bookings,date, startTime, endTime) {
    return bookings.some(booking => {
        return (
            dayjs(booking.startTime).isSame(date, "day") &&
            dayjs(booking.startTime).isSame(dayjs(startTime, "HH:mm"), "hour") &&
            dayjs(booking.endTime).isSame(dayjs(endTime, "HH:mm"), "hour")
        );
    });
}

// export function generateAvailableDates(instructorAvailabilityFromApi,bookings) {
//     const availableSlots = [];
//     const today = dayjs();

//     for (let i = 0; i < 90; i++) {
//         const date = today.add(i, "day");
//         const dayOfWeek = date.format("dddd").toLowerCase(); // Get the day in lowercase

//         // Check if the day is available in the instructor's schedule
//         if (instructorAvailabilityFromApi[dayOfWeek]?.isAvailable) {
//             const { startTime, endTime } = availabilityFromApi[dayOfWeek];
//             const slotStart = date.set("hour", parseInt(startTime.split(":")[0])).set("minute", parseInt(startTime.split(":")[1]));
//             const slotEnd = date.set("hour", parseInt(endTime.split(":")[0])).set("minute", parseInt(endTime.split(":")[1]));

//             // Check if the slot is already booked; if not, add to available slots
//             if (!isSlotBooked(bookings,date, slotStart, slotEnd)) {
//                 availableSlots.push({
//                     date: date.format("YYYY-MM-DD"),
//                     day: dayOfWeek,
//                     startTime: slotStart.format("HH:mm"),
//                     endTime: slotEnd.format("HH:mm"),
//                 });
//             }
//         }
//     }

//     return availableSlots;
// }

export function generateAvailableSlots(instructorAvailabilityFromApi, bookings = [],timeGap = 30,duration=120) {
    
    // console.log(bookings);
    
    if (!instructorAvailabilityFromApi || typeof instructorAvailabilityFromApi !== 'object') {
        console.warn("Invalid availability data, returning an empty array.");
        return [];
    }
    
    if (!Array.isArray(bookings)) {
        console.warn("Invalid bookings data, defaulting to an empty array.");
        bookings = [];
    }
    
    

    const slots = [];
    const currentDate = new Date();
    //NOTE - change this to 90 days  lated
    for (let i = 0; i < 90; i++) {
        const currentDay = new Date(currentDate);
        currentDay.setDate(currentDate.getDate() + i);
        
        // const dayName = currentDay.toLocaleDateString();;
        const dayName = currentDay.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
        
        const dayAvailability = instructorAvailabilityFromApi[dayName];
        if (dayAvailability && dayAvailability.isAvailable) {
            // console.log(new Date(currentDay.toLocaleDateString()).toISOString().split("T")[0],currentDay.toISOString(),currentDay.toLocaleString(),"============================")
            // console.log(currentDay.toLocaleString().slice(3,5),"this is date============================");
            // console.log(currentDay.toLocaleString().slice(0,2),"this is month============================");
            // console.log(currentDay.toLocaleString().slice(6,10),"this is year============================");
            // - 
            
            // currentDay
            // const dateStr = new Date(currentDay.toLocaleString()).toISOString().split("T")[0]
            // - 
            const dateStr = currentDay.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
            // console.log(dateStr);
            const d=currentDay.toLocaleString().slice(3,5)
            const m=currentDay.toLocaleString().slice(0,2)
            const y=currentDay.toLocaleString().slice(6,10)
            const dateStr2=`${y}-${m}-${d}`
            // Initialize start and end times for the day's availability
            const startTime = new Date(currentDay);
            const [startHour, startMinute] = dayAvailability.startTime.split(":").map(Number);
            startTime.setHours(startHour, startMinute, 0, 0);
            const endTime = new Date(currentDay); 
            const [endHour, endMinute] = dayAvailability.endTime.split(":").map(Number);
            endTime.setHours(endHour, endMinute, 0, 0);
            
            // Generate time slots within startTime and endTime based on provided timeGap
            const timeSlots = [];
            // - 
            for (let slotTime = new Date(startTime); slotTime < endTime; slotTime.setMinutes(slotTime.getMinutes() +timeGap+duration)) {
            // for (let slotTime = new Date(startTime); slotTime < endTime; slotTime.setMinutes(slotTime.getMinutes() +timeGap+duration)) {
                const nextSlotTime = new Date(slotTime);
                nextSlotTime.setMinutes(slotTime.getMinutes() + duration);
                
                const isBooked = bookings.some((booking) => {
                    const bookingStart = (new Date(booking.startTime).toISOString());
                    const bookingEnd = new Date(booking.endTime).toISOString();;   
                    // console.log(new Date(slotTime));
                    
                    //for making slotStartTime
                    const slotTimeStartYear = slotTime.getFullYear();
                    const slotTimeStartMonth = String(slotTime.getMonth() + 1).padStart(2, "0"); // Months are 0-based
                    const slotTimeStartDay = String(slotTime.getDate()).padStart(2, "0");
                    const slotTimeStartHours = String(slotTime.getHours()).padStart(2, "0"); // Hours in local time
                    const slotTimeStartMinutes = String(slotTime.getMinutes()).padStart(2, "0");
                    const slotTimeStartSeconds = String(slotTime.getSeconds()).padStart(2, "0");
                    const slotTimeStart= `${slotTimeStartYear}-${slotTimeStartMonth}-${slotTimeStartDay}T${slotTimeStartHours}:${slotTimeStartMinutes}:${slotTimeStartSeconds}.000Z`;
                    
                    //for making slotEndTime
                    
                    const  slotTimeEndYear = nextSlotTime.getFullYear();
                    const  slotTimeEndMonth = String(nextSlotTime.getMonth() + 1).padStart(2, "0"); // Months are 0-based
                    const  slotTimeEndDay = String(nextSlotTime.getDate()).padStart(2, "0");
                    const  slotTimeEndHours = String(nextSlotTime.getHours()).padStart(2, "0"); // Hours in local time
                    const  slotTimeEndMinutes = String(nextSlotTime.getMinutes()).padStart(2, "0");
                    const  slotTimeEndSeconds = String(nextSlotTime.getSeconds()).padStart(2, "0");
                    const slotTimeEnd= `${slotTimeEndYear}-${slotTimeEndMonth}-${slotTimeEndDay}T${slotTimeEndHours}:${slotTimeEndMinutes}:${slotTimeEndSeconds}.000Z`;
                    
                    
                    
                    
                    // console.log(slotTimeStart,slotTimeEnd);
                    // console.log((slotTimeStart),bookingStart,bookingEnd,slotTimeEnd,"🔴🔴🔴🔴🔴🔴");
                    // console.log((slotTime),bookingStart,bookingEnd,nextSlotTime,"🔴🔴🔴🔴🔴🔴");
                    return slotTimeStart < bookingEnd && slotTimeEnd > bookingStart;
                });
                // console.log("╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯")
                
                // console.log(isBooked,slotTime,slotTime.toLocaleTimeString());
                if(isBooked){
                }
                
                if (!isBooked) {
                    timeSlots.push(
                        // `${new Date(slotTime).toISOString().slice(11, 17)}-${new Date(nextSlotTime).toISOString().slice(11, 17)}`
                        `${new Date(slotTime).toLocaleString("en",{ hour12: false }).slice(11, 17)}-${new Date(nextSlotTime).toLocaleString("en",{ hour12: false }).slice(11, 17)}`
                        
                        
                        // startTime: slotTime.toISOString().slice(11, 16), // Format as HH:mm
                        // endTime: nextSlotTime.toISOString().slice(11, 16),
                    );
                }
                
                // slotTime.setMinutes(slotTime.getMinutes()+30);
            }

            // Add the day's slot with time slots to the final array
            slots.push({
                date: dateStr2,
                day: dayName,
                startTime: dayAvailability.startTime,
                endTime: dayAvailability.endTime,
                timeSlots: timeSlots.length > 0 ? timeSlots : "No available slots",
            });
        }
    }

    return slots.length > 0 ? slots : [];
}


// Wed Nov 20 2024 09:00:00 GMT+0530 (India Standard Time) st
// Wed Nov 20 2024 10:30:00 GMT+0530 (India Standard Time) '🔴🔴🔴🔴🔴🔴' et
// Wed Nov 20 2024 14:30:00 GMT+0530 (India Standard Time) bs
// Wed Nov 20 2024 16:00:00 GMT+0530 (India Standard Time) be
