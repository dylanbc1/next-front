import Link from "next/link"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table"
//import { useCurrentToken } from "@/lib/auth";
import { getReports } from "@/actions/get-reports";
import { useEffect, useState } from "react";

export const RevenueByCity =  () => {
    //const token = await useCurrentToken();
    const [reports, setReports] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            // Replace this with your actual fetch call
            const data = await getReports("token",'revenue-by-city');
            
            setReports(data);
        };

        fetchData();
    }, []);
    //const reports = await getReports("token", "revenue-by-city");

    return (
        <Card className="w-[800px] shadow-md">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    Revenue by City
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <Table>
                    <TableCaption>Reports</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="trucate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">City</TableHead>
                            <TableHead className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>#Properties</TableHead>
                            <TableHead className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>#Bokings</TableHead>
                            <TableHead className="text-right truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">Earnings</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reports && Object.keys(reports).map((city) => (
                            <TableRow key={city}> 
                                <TableCell className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{city}</TableCell>
                                <TableCell className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>{(reports as any)[city].numberOfProperties}</TableCell>
                                <TableCell className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>{(reports as any)[city].numberOfBookings}</TableCell>
                                <TableCell className="text-right truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{(reports as any)[city].earnings}</TableCell>
                            </TableRow> 
                        ))}
                    </TableBody>
                </Table>       
            </CardContent>
        </Card>
  
    )
}