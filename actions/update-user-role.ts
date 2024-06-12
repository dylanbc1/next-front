import { User } from '@/auth';
import axios from 'axios';

export const updateUserRole = async (user: User, newRole: string, token: string) => {
    try {
        const response = await axios.patch(`https://staynest.icybeach-62331649.eastus.azurecontainerapps.io/user/${user.id}`, {
            ...user,
            role: newRole
        });
        console.log("User role updated:", response.data);
        return response.data;
    }catch(error) {
        console.error("Error updating user role:", error);
        return error;
    }
}