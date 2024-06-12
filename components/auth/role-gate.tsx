'use client'

import { useCurrentRole } from "@/hooks/use-current-role";
import { FormError } from "../form-error";

interface RoleGateProps {
    allowedRole: "ADMIN" | "USER" | "OWNER";
    children: React.ReactNode;
}


export const RoleGate = ({ allowedRole, children }: RoleGateProps) => {
    const role = useCurrentRole()

    if (role !== allowedRole){
        return (
            <FormError message="You do not have permission to see this content"/>
        )
    }

    return <>{children}</>
}
