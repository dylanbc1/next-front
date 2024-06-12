import NextAuth, {DefaultSession} from 'next-auth'
import authConfig from '@/auth.config'
import {JWT} from '@auth/core/jwt'
import { getToken } from 'next-auth/jwt'

declare module "@auth/core/jwt"{
    interface JWT {
        user: {
            access_token: string,
            id: string,
            role: "ADMIN" | "USER" | "OWNER",
            email: string,
            name: string,
            image: string | null,
            emailVerified: Date | null,
            password: string | null,
        },
        access_token: string
    }
}

export type User = {
    id: string,
    role: "ADMIN" | "USER" | "OWNER",
    email: string,
    name: string,
    image: string | null,
    emailVerified: Date | null,
    password: string | null,

}

declare module "next-auth"{
    interface Session {
        user: {
            id: string,
            role: "ADMIN" | "USER" | "OWNER",
            email: string,
            name: string,
            image: string | null,
            emailVerified: Date | null,
            password: string | null,
        },
        access_token: string
    }

}




export const {
    handlers: { GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages:{
        signIn: '/auth/login',
        error: '/auth/error',
    },
   
    callbacks: {
        async session ({session, token}) {
            //console.log({session, token})
            
            session.user = {...token.user};
            session.access_token = token.user.access_token;
            
            return session;
          },
        async jwt({ token, user }) {
            if (user) {
                token.user = {
                    ...token.user,
                    ...user,
                    name: user.name ?? '', // Ensure name is always a string
                    email: user.email ?? '', // Ensure email is always a string
                };
                token.access_token = token.access_token;
            }
            return token;
        },
         
    },
   
    session: { strategy: 'jwt'},
    ...authConfig,
})