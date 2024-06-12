import { getPropertyById } from "@/actions/get-property-id";
import { PropertyInfo } from "@/components/property/property-info"
import { useCurrentToken } from "@/lib/auth";



const PropertyInfoPage = async ({params}: {params : {id : string }}) => {
    const token = await useCurrentToken();
    const property = await getPropertyById(params.id, token as string);

    console.log("aqui estoy v2")
    return (
        <PropertyInfo
        property={property}/>
    )

}


export default PropertyInfoPage