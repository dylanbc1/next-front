import { getPropertyById } from "@/actions/get-property-id";
import { PropertyForm } from "@/components/property/property-form"
import { useCurrentToken } from "@/lib/auth";

const PropertyPage = async () => {
    const token = await useCurrentToken();

    return (
        <div>
            <PropertyForm/>
        </div>
    )
}

export default PropertyPage