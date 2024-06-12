import axios from 'axios';

export const getReports = async ( token: string, type: string) => {
    
    try {
        const response = await axios.get(`https://staynest.icybeach-62331649.eastus.azurecontainerapps.io/report/${type}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        
        }); 
        const reports = response.data
        return reports
      } catch (error) {
            console.error("User not found:", error);
        return error
      }
}