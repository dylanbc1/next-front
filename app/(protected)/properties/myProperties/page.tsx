import { getBookings } from "@/actions/get-bookings";
import { getMyProperties } from "@/actions/get-my-properties";
import { MyBookings } from "@/components/bookings/my-bookings";
import { MyProperties } from "@/components/property/my-properties";
import { currentUser, useCurrentToken } from "@/lib/auth";




const MyPropertiesPage = async () =>{
    const token = await useCurrentToken();
    const user = await currentUser(); 
    const id = user?.id
    const properties = await getMyProperties( token as string, id as string);
    
    return (
        
            <MyProperties properties={properties}/>
        
    )

}

export default MyPropertiesPage;