import Link from "next/link"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table"
//import { useCurrentToken } from "@/lib/auth";
import { getReports } from "@/actions/get-reports";
import { useEffect, useState } from "react";

export const UserActivityReport =  () => {
    //const token = await useCurrentToken();
    const [reports, setReports] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            // Replace this with your actual fetch call
            const data = await getReports("token",'user-activity');
            
            setReports(data);
        };

        fetchData();
    }, []);
    //const reports = await getReports("token", "revenue-by-city");

    return (
        <Card className="w-[800px] shadow-md">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    User Activity
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <Table>
                    <TableCaption>Reports</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="trucate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">User ID</TableHead>
                            <TableHead className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>#Bokings</TableHead>
                            <TableHead className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>Preferred Property</TableHead>
                            <TableHead className="text-right truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">Total Spent</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reports && Object.keys(reports).map((user) => (
                            <TableRow key={user}> 
                                <TableCell className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{user}</TableCell>
                                <TableCell className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>{(reports as any)[user].totalBookings}</TableCell>
                                <TableCell className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>{Object.keys((reports as any)[user].preferredProperties).reduce((a, b) => (reports as any)[user].preferredProperties[a].count > (reports as any)[user].preferredProperties[b].count ? a : b)}</TableCell>
                                <TableCell className="text-right truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{(reports as any)[user].totalSpent}</TableCell>
                            </TableRow> 
                        ))}
                    </TableBody>
                </Table>       
            </CardContent>
        </Card>
  
    )
}