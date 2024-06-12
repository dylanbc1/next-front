

import { getUserById } from "@/actions/get-user-id";
import { User } from "@/auth";
import { RoleGate } from "@/components/auth/role-gate";
import { UserInfo } from "@/components/user-info";
import { useCurrentToken } from "@/lib/auth";



const ClientPage = async ({params}: {params : {id : string }}) => {
    const token = await useCurrentToken();
    const user = await getUserById(params.id, token as string);
   // console.log(user, "aqui estoy ")
    

    return (
        <RoleGate allowedRole="ADMIN">
                <UserInfo
                label={user.name}
                user={user}
                access_token={"access_token"}
            />
        </RoleGate>
        
       
    );
}
export default ClientPage;