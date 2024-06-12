'use client'

import { UserInfo } from "@/components/user-info";
import { useCurrentToken } from "@/hooks/use-current-token";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSession } from "next-auth/react";


const ClientPage = () => {
    const { status } = useSession();
    const user = useCurrentUser();
    const token = useCurrentToken();

    if (status === 'loading') {
        return <div>Loading...</div>;  // Display a loading indicator or placeholder
    }


    return (
        
        <UserInfo
            label="Client Component"
            user={user}
            access_token={token}
        />
       
    );
}
export default ClientPage;