import axios from 'axios';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}
export const getUsers= async () => {
    try {
        const response = await axios.get(`https://staynest.icybeach-62331649.eastus.azurecontainerapps.io/user`); 
        const users: User[] = response.data
        
        return users
      } catch (error) {
        console.error("Error fetching users:", error);
        return []
      }
}
