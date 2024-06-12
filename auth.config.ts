import Credentials from "next-auth/providers/credentials"
import {LoginSchema } from '@/schemas';
import type { NextAuthConfig } from "next-auth"
import axios from 'axios';

import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { profile } from "console";






export default { 
    providers: [

        GitHubProvider,
        GoogleProvider,
        Credentials({
            async authorize(credentials) {
                const validatedValues = LoginSchema.safeParse(credentials);
                if (validatedValues.success) {
                   
                    const { email, password } = validatedValues.data;

                    try {
                        const response = await axios.post(`https://staynest.icybeach-62331649.eastus.azurecontainerapps.io/auth/login`, {
                            email,
                            password
                        })
                        if (response.status === 200) {
                            
                            return { ...response.data.user, access_token: response.data.access_token };
                        }
                    }catch(error){
                        if (axios.isAxiosError(error)) {
                            console.error('Login error:', error.response?.data?.message || error.message);
                          } else {
                            console.error('Unexpected error during login:', error);
                          }
                          return null;
                    }
                    

                   
            
                }
                return null
                
            }
        }),
        
    ]
} satisfies NextAuthConfig