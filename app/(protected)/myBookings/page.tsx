import { getBookings } from "@/actions/get-bookings";
import { MyBookings } from "@/components/bookings/my-bookings";
import { currentUser, useCurrentToken } from "@/lib/auth";




const MyBookingsPage = async () =>{
    const token = await useCurrentToken();
    const user = await currentUser(); 
    const id = user?.id
    const bookings = await getBookings( token as string, id as string);
    
    return (
        
            <MyBookings bookings={bookings}/>
        
    )

}

export default MyBookingsPage;