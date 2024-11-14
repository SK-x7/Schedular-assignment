import axios from "axios";
import { toast } from "react-hot-toast";
const API_URL = "http://127.0.0.1:4000/api/v1";

export async function checkBackendConnection() {
  try {
    const res = await axios.get("http://127.0.0.1:4000");
    const data = res.data;
    alert(data?.message);
  } catch (error) {
    alert(error.message);
  }
}

export async function checkUserInDb(userId) {
  console.log("Entered CheckUserInDb...........",userId);
  const res = await axios.post(`${API_URL}/users/checkUserInDb`, { userId });
  console.log(res);
  if (!res.data){
    toast.error("Error creating user");
    return null;
  } 
    
  // if(status===404)    return false;
  const data = res?.data;
  if (data.status === "success") {
    localStorage.setItem("userId", data?.userData?.id);
    toast.success("User already exists");
    return true;
  } else if (data.status === "fail") {
    toast.success("User does not exist");
    return false;
  }else if(data?.status==="warning"){
    toast.error(`${data?.message}`);
    toast.error("There was some internal error, you will receive a mail regarding this issue please coprerate with us so that we can help you");
    return false;
  }
  
}

export async function createNewUser(userData) {
  const res = await axios.post(`${API_URL}/users/createUser`, { userData });
  const data = res?.data;
  return data;
}

export async function handleUser(user) {
  if (!user) return;
  const loggedUser = await checkUserInDb(user.id);
  console.log("xxxxxxxxxxxxxx");

  console.log(loggedUser, typeof loggedUser);
  if (loggedUser) return loggedUser;
  const newUser = await createNewUser({
    clerkUserId: user.id,
    name: user.fullName,
  });
  return newUser;
}
