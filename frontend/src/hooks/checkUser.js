import { checkUserInDb, createNewUser } from "../apis/userApi";

export async function useCheckUser(params) {

        
        const loggedUser=await checkUserInDb(user.id);
        
        alert(loggedUser,typeof loggedUser);
        if(loggedUser) return loggedUser;
        const newUser=await createNewUser({
            clerkUserId:user.id,
            name:user.username,
        })
        
        return newUser;
        
    

    
}