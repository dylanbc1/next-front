import Link from "next/link"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table"
//import { useCurrentToken } from "@/lib/auth";
import { getReports } from "@/actions/get-reports";
import { useEffect, useState } from "react";

export const OccupancyReport =  () => {
    //const token = await useCurrentToken();
    const [reports, setReports] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            // Replace this with your actual fetch call
            const data = await getReports("token",'occupancy');
            
            setReports(data);
        };

        fetchData();
    }, []);
    

    return (
        <Card className="w-[800px] shadow-md">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    Occupancy
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <Table>
                    <TableCaption>Reports</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="trucate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">Property ID</TableHead>
                            <TableHead className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>Slug</TableHead>
                            <TableHead className="text-right truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">Ocuppancy %</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reports && (reports as any[]).map((property) => (
                            <TableRow key={property}> 
                                <TableCell className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{property.propertyId}</TableCell>
                                <TableCell className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>{property.slug}</TableCell>
                                <TableCell className="text-right truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{property.occupancyRate}</TableCell>
                            </TableRow> 
                        ))}
                    </TableBody>
                </Table>       
            </CardContent>
        </Card>
  
    )
}