
import { useCurrentRole } from "@/hooks/use-current-role";
import { useEffect } from "react";

interface RoleGateProps {
    allowedRole: "ADMIN" | "USER" | "OWNER";
    children: React.ReactNode;
}


export const NavRoleGate = ({ allowedRole, children }: RoleGateProps) => {
    const role =  useCurrentRole()
   
    

    if (role !== allowedRole){
        return (
            <>
            </>
        )
    }

    return <>{children}</>
}
