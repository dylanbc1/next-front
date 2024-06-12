import { getProperties } from "@/actions/get-properties";
import { useCurrentToken } from "@/lib/auth";

import { PropertyList } from "@/components/property/property-list";


const PropertiesListPage = async () =>{
    const token = await useCurrentToken();
    const properties = await getProperties(token as string); ;
    return (
        
            <PropertyList properties={properties}/>
        
    )

}

export default PropertiesListPage;