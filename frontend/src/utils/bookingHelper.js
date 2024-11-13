import { availabilityFromApi } from "../data/data";
import dayjs from "dayjs";
// import { utcToZonedTime, format as formatTz } from 'date-fns';

function isSlotBooked(bookings,date, startTime, endTime) {
    return bookings.some(booking => {
        return (
            dayjs(booking.startTime).isSame(date, "day") &&
            dayjs(booking.startTime).isSame(dayjs(startTime, "HH:mm"), "hour") &&
            dayjs(booking.endTime).isSame(dayjs(endTime, "HH:mm"), "hour")
        );
    });
}

export function generateAvailableDates(availabilityFromApi,bookings) {
    const availableSlots = [];
    const today = dayjs();

    for (let i = 0; i < 90; i++) {
        const date = today.add(i, "day");
        const dayOfWeek = date.format("dddd").toLowerCase(); // Get the day in lowercase

        // Check if the day is available in the instructor's schedule
        if (availabilityFromApi[dayOfWeek]?.isAvailable) {
            const { startTime, endTime } = availabilityFromApi[dayOfWeek];
            const slotStart = date.set("hour", parseInt(startTime.split(":")[0])).set("minute", parseInt(startTime.split(":")[1]));
            const slotEnd = date.set("hour", parseInt(endTime.split(":")[0])).set("minute", parseInt(endTime.split(":")[1]));

            // Check if the slot is already booked; if not, add to available slots
            if (!isSlotBooked(bookings,date, slotStart, slotEnd)) {
                availableSlots.push({
                    date: date.format("YYYY-MM-DD"),
                    day: dayOfWeek,
                    startTime: slotStart.format("HH:mm"),
                    endTime: slotEnd.format("HH:mm"),
                });
            }
        }
    }

    return availableSlots;
}

export function generateAvailableSlots(availabilityFromApi, bookings = [],timeGap = 30,duration=120) {
    if (!availabilityFromApi || typeof availabilityFromApi !== 'object') {
        console.warn("Invalid availability data, returning an empty array.");
        return [];
    }
    if (!Array.isArray(bookings)) {
        console.warn("Invalid bookings data, defaulting to an empty array.");
        bookings = [];
    }

    const slots = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 90; i++) {
        const currentDay = new Date(currentDate);
        currentDay.setDate(currentDate.getDate() + i);
        const dayName = currentDay.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
        
        const dayAvailability = availabilityFromApi[dayName];
        if (dayAvailability && dayAvailability.isAvailable) {
            const dateStr = currentDay.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
            
            // Initialize start and end times for the day's availability
            const startTime = new Date(currentDay);
            const [startHour, startMinute] = dayAvailability.startTime.split(":").map(Number);
            startTime.setHours(startHour, startMinute, 0, 0);
            const endTime = new Date(currentDay); 
            const [endHour, endMinute] = dayAvailability.endTime.split(":").map(Number);
            endTime.setHours(endHour, endMinute, 0, 0);
            
            // Generate time slots within startTime and endTime based on provided timeGap
            const timeSlots = [];
            for (let slotTime = new Date(startTime); slotTime < endTime; slotTime.setMinutes(slotTime.getMinutes() +timeGap+duration)) {
                const nextSlotTime = new Date(slotTime);
                nextSlotTime.setMinutes(slotTime.getMinutes() + duration);
                
                const isBooked = bookings.some((booking) => {
                    console.log("🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴")
                    const bookingStart = new Date(booking.startTime);
                    const bookingEnd = new Date(booking.endTime);
                    return slotTime < bookingEnd && nextSlotTime > bookingStart;
                });
                // console.log("╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯")
                
                console.log(isBooked,slotTime,slotTime.toLocaleTimeString());
                if (!isBooked) {
                    timeSlots.push(
                        `${new Date(slotTime).toLocaleString("en",{ hour12: false }).slice(11, 17)}-${new Date(nextSlotTime).toLocaleString("en",{ hour12: false }).slice(11, 17)}`
                        
                        
                        // startTime: slotTime.toISOString().slice(11, 16), // Format as HH:mm
                        // endTime: nextSlotTime.toISOString().slice(11, 16),
                    );
                }
                
                // slotTime.setMinutes(slotTime.getMinutes()+30);
            }

            // Add the day's slot with time slots to the final array
            slots.push({
                date: dateStr,
                day: dayName,
                startTime: dayAvailability.startTime,
                endTime: dayAvailability.endTime,
                timeSlots: timeSlots.length > 0 ? timeSlots : "No available slots",
            });
        }
    }

    return slots.length > 0 ? slots : [];
}



