import axios from "axios";
import { toast } from "react-hot-toast";
const API_URL="http://127.0.0.1:4000/api/v1"

export async function createAvailability(obj) {
    let userId;
    if(localStorage.getItem("userId")){
        userId=localStorage.getItem("userId");
    }else{
        alert("User id not available,login again");
        return null;
    }
    
    const res=await axios.post(`${API_URL}/availability/createAvailability/${userId}`,obj);   
    if(!res?.data) {
        alert("Error");
        console.log("Error updating events");
        return null;
    };
    
    const data=res?.data;
    console.log(data)
    return data;
}

export async function getAvailability(id) {
    if(!id) {
        toast.error("Error in fetching instructor availability for this instructor")
        toast.error("Please try again after some time");
    }    
    const res=await axios.get(`${API_URL}/availability/getAvailability/instructor/${id}`);   
    // console.log(res);
    if(!res.data) {
        alert("Error");
        // console.log("Error fetching availability from server");
        return null;
    };
    const data=res?.data;
    // console.log(data)
    return data;
}


export async function getAvailabilityOfUser() {
    let userId;
    if(localStorage.getItem("userId")){
        userId=localStorage.getItem("userId");
    }else{
        alert("User id not available,login again");
        return null;
    }
    
    const res=await axios.get(`${API_URL}/availability/getAvailability/user/${userId}`);   
    console.log(res);
    if(!res.data) {
        alert("Error");
        console.log("Error fetching availability from server");
        return null;
    };
    const data=res?.data;
    console.log(data)
    return data;
}