import axios from "axios";

export async function checkBackendConnection() {
    try {
        
        
        const res=await axios.get("http://127.0.0.1:4000");
        const data=res.data;
        alert(data?.message);
    } catch (error) {
        alert(error.message);
    }
}





export async function checkUserInDb(userId){
    const res=await axios.post("http://127.0.0.1:4000/checkUserInDb",{userId});
    console.log(res);
    if(!res.data)   return false;
    // if(status===404)    return false;
    const data=res?.data;
    if(data.status==="success"){return true;}
    else if (data.status==="fail"){return false;}
    else return false;
}

export async function createNewUser(userData) {
    const res=await axios.post("http://127.0.0.1:4000/createUser",{userData});
    const data=res?.data;
    return data;
}

export async function handleUser(user) {
    
    if(!user)   return;
        
    const loggedUser=await checkUserInDb(user.id);
    
    console.log(loggedUser,typeof loggedUser);
    if(loggedUser) return loggedUser;
    const newUser=await createNewUser({
        clerkUserId:user.id,
        name:user.fullName,
    })
    
    return newUser;
    



}