import { useSession } from 'next-auth/react';

export const useCurrentRole = () => {
    const session = useSession();
    console.log("aqui user",session.data?.user);
    return session.data?.user?.role;
}