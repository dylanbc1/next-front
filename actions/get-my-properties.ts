import axios from 'axios';

interface Property{
    id: string;
    name: string;
    cost_per_night: number;
    city: string;
    country: string;
    image: string;
    user_id: string
}
export const getMyProperties= async (token: string, userId: string) => {
    try {
        const response = await axios.get(`https://staynest.icybeach-62331649.eastus.azurecontainerapps.io/property`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        
        }); 
        const properties: Property[] = response.data
        const userProperties = properties.filter(booking => booking.user_id === userId);

        return userProperties
      } catch (error) {
        console.error("Error fetching properties:", error);
        return []
      }
}