import { useUser } from "@clerk/clerk-react"

export async function checkUser(params) {
    const {user}=await useUser();
    if(!user)   return null;
}