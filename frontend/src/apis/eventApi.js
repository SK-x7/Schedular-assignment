import axios from "axios";
const API_URL="http://127.0.0.1:4000"
export async function createEvent(obj) {
    let userId;
    if(localStorage.getItem("userId")){
        userId=localStorage.getItem("userId");
    }else{
        alert("User id not available,login again");
        return;
    }
    const eventData={
        ...obj,
        userId,
    }
    const res=await axios.post(`${API_URL}/createEvent`,{eventData});   
    if(!res?.data) alert("Error");
    const data=res?.data;
    return data;
}