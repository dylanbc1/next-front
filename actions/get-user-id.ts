import { useCurrentToken } from '@/lib/auth';
import axios from 'axios';

export const getUserById = async (id:string, token: string) => {
    
    try {
        const response = await axios.get(`https://staynest.icybeach-62331649.eastus.azurecontainerapps.io/user/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        
        }); 
        const user = response.data
        console.log(user)
        return user
      } catch (error) {
            console.error("User not found:", error);
        return error
      }
}
