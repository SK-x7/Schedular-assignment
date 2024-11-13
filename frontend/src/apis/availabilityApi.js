import axios from "axios";
const API_URL="http://127.0.0.1:4000"

export async function createAvailability(obj) {
    let userId;
    if(localStorage.getItem("userId")){
        userId=localStorage.getItem("userId");
    }else{
        alert("User id not available,login again");
        return null;
    }
    
    const res=await axios.post(`${API_URL}/createAvailability/${userId}`,obj);   
    if(!res?.data) {
        alert("Error");
        console.log("Error updating events");
        return null;
    };
    
    const data=res?.data;
    console.log(data)
    return data;
}

export async function getAvailability(obj) {
    let userId;
    if(localStorage.getItem("userId")){
        userId=localStorage.getItem("userId");
    }else{
        alert("User id not available,login again");
        return null;
    }
    
    const res=await axios.get(`${API_URL}/getAvailability/${userId}`);   
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