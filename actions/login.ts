'use server';
import * as z from 'zod';

import { LoginSchema } from '@/schemas';
import axios from 'axios';
import { AuthError } from 'next-auth';
import { signIn} from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
export const login = async (values: z.infer<typeof LoginSchema>) => {
        const validatedValues = LoginSchema.safeParse(values);

        if (!validatedValues.success) {
            return {  error: 'Invalid email or password' }
        }

        const { email, password } = validatedValues.data;
       try {
           await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });
       } catch (error){
        if (error instanceof AuthError) {
            switch (error.type){
                case "CredentialsSignin":
                    return { error: 'Invalid email or password' }
                default:
                    return { error: 'An error occurred' }
            }
        }

        throw error;
       }

}