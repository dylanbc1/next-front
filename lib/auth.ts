import { auth } from '@/auth';

export const currentUser = async () => {
    const session = await auth();

    return session?.user
}

export const useCurrentRole = async () => {
    const session = await auth();
    return session?.user?.role;
}

export const useCurrentToken = async () => {
    const session = await auth();
    console.log("Server-side access token:", session?.access_token);
    return session?.access_token;
}