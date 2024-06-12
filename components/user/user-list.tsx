'use client'
import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Card, CardContent, CardHeader } from '../ui/card';
import Link from 'next/link';

interface UserProps {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface UserListProps {
    users: UserProps[];
}

export const UserList = ({ users }: UserListProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; 
  
    const totalPages = Math.ceil(users.length / itemsPerPage);
  
    const handleNextPage = () => {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
  
    const handlePreviousPage = () => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedUsers = users.slice(startIndex, startIndex + itemsPerPage);

    return (
        <Card className="w-[800px] shadow-md">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    Users
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <Table>
                    <TableCaption>Registered Users</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">ID</TableHead>
                            <TableHead className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>Name</TableHead>
                            <TableHead className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>Email</TableHead>
                            <TableHead className="text-right truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {selectedUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                                    <Link href={`/users/${user.id}`} key={user.id}>
                                        {user.id}
                                    </Link>
                                </TableCell>
                                <TableCell className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>{user.name}</TableCell>
                                <TableCell className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>{user.email}</TableCell>
                                <TableCell className="text-right truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{user.role}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>       
                <div className="flex justify-between items-center mt-4">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="px-4 py-2 bg-gray-300 rounded"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </CardContent>
        </Card>
    )
}