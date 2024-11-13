import axios from "axios";
const API_URL="http://127.0.0.1:4000"

export async function getBookings(userId,eventId) {
    
    const res=await axios.get(`${API_URL}/getBookingsOfEvent/${userId}/${eventId}`);   
    if(!res?.data) {
        alert("Error");
        console.log("Error fetching bookings of this event from server");
        return null;
    };
    
    const data=res?.data;
    console.log(data)
    return data;
}
export async function createBooking(obj) {
    
    const res=await axios.post(`${API_URL}/createBooking`,{
        bookingData: obj
    });   
    if(!res?.data) {
        alert("Error");
        console.log("Error creating booking");
        return null;
    };
    
    const data=res?.data;
    console.log(data)
    if(data.status==="success") alert("booking created successfully");
    return data;
    
}