import { getPropertyById } from "@/actions/get-property-id";
import { BookingForm } from "@/components/bookings/booking-form"
import { useCurrentToken } from "@/lib/auth";

const BookingPage = async ({params}: {params : {id : string }}) => {
    const token = await useCurrentToken();
    const property = await getPropertyById(params.id, token as string);
    console.log('property: ' + property.id)

    return (
        <div>
            
            <BookingForm
            property={property} />
        </div>
    )
}

export default BookingPage