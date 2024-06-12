'use client'
import Link from "next/link";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { Button } from "../ui/button"; // Importa el componente Button
import { useCurrentUser } from '@/hooks/use-current-user';
import { useCurrentToken } from '@/hooks/use-current-token';
import { use, useState, useTransition } from 'react';
import { deleteBooking } from "@/actions/delete-booking";

interface Booking {
    id: string;
    user_id: string;
    roomId: string;
    check_in: string;
    check_out: string;
    guests: number;
    price: number;
}

interface MyBookingsProps {
    bookings: Booking[]
}

export const MyBookings = ({ bookings }: MyBookingsProps) => {
    const token = useCurrentToken();
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const handleDelete = async (id: any) => {
        startTransition(() => {
            
            deleteBooking(id, token)
                .then((data: any) => {
                    setError(data.error)
                    setSuccess(data.success)
                })
        });
    };

    return (
        <Card className="w-[800px] shadow-md">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    Bookings
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <Table>
                    <TableCaption>Registered Bookings</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">ID</TableHead>
                            <TableHead className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">Check In</TableHead>
                            <TableHead className="text-right truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">Check Out</TableHead>
                            <TableHead className="text-right truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings.map((booking) => (
                            <TableRow key={booking.id}>
                                <TableCell className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{booking.id}</TableCell>
                                <TableCell className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{booking.check_in}</TableCell>
                                <TableCell className="text-right truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{booking.check_out}</TableCell>
                                <TableCell className="text-right">
                                    <Button onClick={() => handleDelete(booking.id)} className="p-2 rounded bg-red-500 text-white hover:bg-red-700">
                                        -
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
