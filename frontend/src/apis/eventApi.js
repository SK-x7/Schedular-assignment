import axios from "axios";
const API_URL="http://127.0.0.1:4000"
export async function createEvent(obj) {
    let userId;
    let userEmail;
    if(localStorage.getItem("userId")){
        userId=localStorage.getItem("userId");
        userEmail=localStorage.getItem("userEmailId");
    }else{
        alert("User id not available,login again");
        return;
    }
    const eventData={
        ...obj,
        instructorId:userId,
        emailId:userEmail
        
        
    }
    const res=await axios.post(`${API_URL}/createEvent`,{eventData});   
    if(!res?.data) alert("Error");
    const data=res?.data;
    console.log(data);
    if(data?.status==="success")    return window.location.href="http://localhost:5173/events";
    return data;
    
}



export async function getAllEventsByUser() {
    let userId;
    if(localStorage.getItem("userId")){
        userId=localStorage.getItem("userId");
    }else{
        alert("User id not available,login again");
        return null;
    }

    const res=await axios.get(`${API_URL}/getAllEvents/${userId}`);   
    if(!res?.data) {alert("Error");
    console.log("Error fetching events from server");
    return null;
};
    const data=res?.data;
    console.log(data)
    return data;
}


export async function getAllEvents() {
    let userId;
    if(localStorage.getItem("userId")){
        userId=localStorage.getItem("userId");
    }else{
        alert("User id not available,login again");
        return null;
    }

    const res=await axios.get(`${API_URL}/getAllEvents`);   
    if(!res?.data) {alert("Error");
    console.log("Error fetching events all from server");
    return null;
};
    const data=res?.data;
    console.log(data)
    return data;
}