import axios from "axios";
const API_URL="http://127.0.0.1:4000/api/v1"

export async function getBookings(userId,eventId) {
    
    const res=await axios.get(`${API_URL}/bookings/getBookingsOfEvent/${userId}/${eventId}`);   
    if(!res?.data) {
        alert("Error");
        console.log("Error fetching bookings of this event from server");
        return null;
    };
    
    const data=res?.data;
    console.log(data)
    return data;
}


export async function getBookingsOfUser() {
    let userId;
    if(localStorage.getItem("userId")){
        userId=localStorage.getItem("userId");
    }else{
        alert("User id not available,login again");
        return null;
    }
    
    const res=await axios.get(`${API_URL}/bookings/getBookingsOfEvent/${userId}`);   
    if(!res?.data) {
        alert("Error");
        console.log("Error fetching bookings of this user from server");
        return null;
    };
    
    const data=res?.data;
    console.log(data)
    return data;
}

export async function createBooking(obj) {
    
    const res=await axios.post(`${API_URL}/bookings/createBooking`,{
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


export async function deleteBooking(bookingId) {
    const res=await axios.delete(`${API_URL}/bookings/deleteBooking/${bookingId}`);   
    
    if(!res?.data) {
        alert("Error");
        console.log("Error deleting booking");
        return false;
    };
    
    const data=res?.data;
    console.log(data)
    if(data.status==="success"&&data.isDeleted===true){
        return true;
    };
    // return data;
}