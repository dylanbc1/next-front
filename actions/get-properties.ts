import axios from 'axios';

interface Property{
    id: string;
    name: string;
    cost_per_night: number;
    city: string;
    country: string;
    image: string
}


export const getProperties= async (token: string) => {
    try {
        const response = await axios.get(`https://staynest.icybeach-62331649.eastus.azurecontainerapps.io/property`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        
        }); 
        const properties: Property[] = response.data
        
        return properties
      } catch (error) {
        console.error("Error fetching properties:", error);
        return []
      }
}