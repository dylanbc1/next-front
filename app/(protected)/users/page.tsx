import { getUsers } from "@/actions/get-users";
import { RoleGate } from "@/components/auth/role-gate";
import { UserList } from "@/components/user/user-list";
import axios from 'axios';


  


const UserListPage = async () => {
    const users = await getUsers();
    return (
        <RoleGate allowedRole="ADMIN">
              <UserList users={users}/>
        </RoleGate>
       
    )
}


export default UserListPage;