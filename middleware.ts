import authConfig from "./auth.config"
import NextAuth from 'next-auth'

import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    publicRoutes,
    privateRoutes

} from '@/routes'



const {auth} = NextAuth(authConfig);


/**
 * Middleware to check if a user is authenticated
 * Aqui usamos routes.ts para verificar si el usuario está autheticado y hacer la redireccion
 */
export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith (apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isPrivateRoute = privateRoutes.includes(nextUrl.pathname)

    if (isApiAuthRoute) {
        return 
    }

    if (isPrivateRoute){
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return 
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL('/auth/login', nextUrl))
    }

    return 
})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};