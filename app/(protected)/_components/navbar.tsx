'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation";
import { UserButton } from "@/components/auth/user-button";
import { useCurrentRole } from "@/hooks/use-current-role";
import { NavRoleGate } from "./nav-role-gate";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'

export const Navbar = () => {
    const pathname = usePathname()
    const role = useCurrentRole()
    const router = useRouter()

    useEffect(() => {
        if (role === undefined) {
            // window.location.reload()
        }

        console.log(role)

    }, [])


    return (
        <nav className="bg-secondary flex justify-center items-center rounded-xl p-5 w-full shadow-sm fixed top-0 z-10">
            <div className="flex justify-center items-center w-[1000px]">
                <div className="flex gap-x-2">
                    <Button
                        asChild
                        variant={pathname === "/properties" ? "default" : "outline"}
                    >
                        <Link href="/properties">Properties</Link>
                    </Button>
                    <NavRoleGate allowedRole="ADMIN">
                        <Button
                            asChild
                            variant={pathname === "/users" ? "default" : "outline"}
                        >
                            <Link href="/users">Users</Link>
                        </Button>
                    </NavRoleGate>
                </div>
                <p className="font-bold text-2xl mx-auto">STAYNEST</p>
                <div className="flex items-center gap-x-4">
                    <UserButton />
                </div>
            </div>
        </nav>
    )
}