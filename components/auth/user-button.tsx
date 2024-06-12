'use client'

import {FaUser} from 'react-icons/fa';
import { ExitIcon, ReaderIcon, InfoCircledIcon } from '@radix-ui/react-icons'; 
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent
} from '@/components/ui/dropdown-menu'

import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from '@/components/ui/avatar'
import { useCurrentUser } from '@/hooks/use-current-user';
import { LogoutButton } from './logout-button';
import Link from 'next/link';
import { NavRoleGate } from '@/app/(protected)/_components/nav-role-gate';



export const UserButton = () => {

    const user = useCurrentUser()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ''}/>
                    <AvatarFallback className='bg-sky-500'>
                        <FaUser className='text-white'/>
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-40' align='end'>
                <NavRoleGate allowedRole='ADMIN'>
                    <DropdownMenuItem>
                            <Link href="/analytics" className='flex items-center'>
                                <ReaderIcon className='h-4 w-4 mr-2'/>
                                Analytics
                            </Link>
                    </DropdownMenuItem>
                </NavRoleGate>
                
                    <DropdownMenuItem>
                            <Link href="/properties/myProperties" className='flex items-center'>
                                <InfoCircledIcon className='h-4 w-4 mr-2'/>
                                My Properties
                            </Link>
                    </DropdownMenuItem>
                
               
                    <DropdownMenuItem>
                            <Link href="/myBookings" className='flex items-center'>
                                <InfoCircledIcon className='h-4 w-4 mr-2'/>
                                My Bookings
                            </Link>
                    </DropdownMenuItem>
                
                
                <LogoutButton>
                    <DropdownMenuItem>
                        <ExitIcon className='h-4 w-4 mr-2'/>
                        Logout
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};