import axios from 'axios';

export async function createProperty(formData: any, token: any) {
    // Transformar datos
    const transformedData = {
        ...formData,
        latitude: parseInt(formData.latitude, 10),
        altitude: parseInt(formData.altitude, 10),
        rooms: parseInt(formData.rooms, 10),
        bathrooms: parseInt(formData.bathrooms, 10),
        area: parseInt(formData.area, 10),
        cost_per_night: parseInt(formData.cost_per_night, 10),
        max_people: parseInt(formData.max_people, 10)
    };

    console.log("Creando property con datos:", transformedData);

    try {
        const response = await axios.post(`https://staynest.icybeach-62331649.eastus.azurecontainerapps.io/property`,
            transformedData, {
            headers: {
                Authorization: `Bearer ${token}` // Incluir el token JWT en el encabezado de autorización
            }
        });

        if (response.status !== 201) {
            throw new Error('Error creating property');
        }

        return { success: 'Property created successfully!' };
    } catch (error: any) {
        return { error: error.message };
    }
}