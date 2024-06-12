import { useSession } from 'next-auth/react';


export const useCurrentToken = () => {
   const session = useSession();
   

    return session.data?.access_token;
};
