'use client'
import Link from "next/link";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { Button } from "../ui/button"; // Importa el componente Button
import { useCurrentUser } from '@/hooks/use-current-user';
import { useCurrentToken } from '@/hooks/use-current-token';
import { use, useState, useTransition } from 'react';
import { deleteBooking } from "@/actions/delete-booking";
import { deleteProperty } from "@/actions/delete-property";

interface Property{
    id: string;
    name: string;
    cost_per_night: number;
    city: string;
    country: string;
    image: string
}
interface MyPropertiesProps {
    properties: Property[]
}

export const MyProperties = ({ properties }: MyPropertiesProps) => {
    const token = useCurrentToken();
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const handleDelete = async (id: any) => {
        startTransition(() => {
            
            deleteProperty(id, token)
                .then((data: any) => {
                    "setError(data.error)"
                    "setSuccess(data.success)"
                })
        });
    };

    return (
        <Card className="w-[800px] shadow-md">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    Properties
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <Table>
                    <TableCaption>Registered Properties</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">ID</TableHead>
                            <TableHead className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">City</TableHead>
                            <TableHead className="text-right truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">Country</TableHead>
                            <TableHead className="text-right truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {properties.map((property) => (
                            <TableRow key={property.id}>
                                <TableCell className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{property.id}</TableCell>
                                <TableCell className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{property.city}</TableCell>
                                <TableCell className="text-right truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{property.country}</TableCell>
                                <TableCell className="text-right">
                                    <Button onClick={() => handleDelete(property.id)} className="p-2 rounded bg-red-500 text-white hover:bg-red-700">
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
