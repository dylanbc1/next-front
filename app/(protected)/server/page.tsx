import { UserInfo } from "@/components/user-info";
import { currentUser, useCurrentToken } from "@/lib/auth";


const ServerPage =  async () => {
    const user = await currentUser();
    const token = await useCurrentToken();
    console.log(token);
    return(

        <UserInfo
         label="Server Component"
          user={user}
          access_token={token}/>

    )
}
export default ServerPage;