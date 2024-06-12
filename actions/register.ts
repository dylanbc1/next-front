'use server';
import * as z from 'zod';
import axios from 'axios';
import { RegisterSchema } from '@/schemas';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedValues = RegisterSchema.safeParse(values);

    if (!validatedValues.success) {
        return {  error: 'Invalid email or password' }
    }

    const { email, password, name,  } = validatedValues.data;

   try {
        const timeStamp = Date.now().toString(); // Declare the timeStamp variable

        const response = await axios.post(`https://staynest.icybeach-62331649.eastus.azurecontainerapps.io/user/register`,{
            email,
            password,
            name,
            "role": "USER",
            "emailVerified": timeStamp,
            "image": ""
        })

        if (response.status === 201) {
            return { success: 'User created!' };
        } else {
            return { error: 'Failed to create user' };
        }

   }catch(error){
    if (axios.isAxiosError(error)) {
        // Handle Axios-specific error
        return { error: error.response?.data?.message || 'Failed to create user' };
    } else {
        // Handle other types of errors
        return { error: 'An unexpected error occurred' };
    }
   }
   
    
    return { success: "User created!" }
   
}