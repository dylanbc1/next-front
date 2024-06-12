import { User } from "@/auth";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { currentUser, useCurrentToken } from "@/lib/auth";
import { UserRoleUpdater } from "./user/user-role-update";

interface UseerInfoProps {
    user?: User | null;
    label: string;
    access_token?: string | null;
}

export const UserInfo =  async ({ user, label, access_token }: UseerInfoProps) => {
    const token = await useCurrentToken();
    

    return (
        <Card className="w-[600px] shadow-md">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    {label}
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <p className="text-sm font-medium">
                            ID
                        </p>
                        <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                            {user?.id}
                            
                        </p>

                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <p className="text-sm font-medium">
                            Name
                        </p>
                        <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                            {user?.name}
                        </p>
                        
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <p className="text-sm font-medium">
                            Email
                        </p>
                        <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                            {user?.email}
                        </p>
                        
                </div>
               
                    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <p className="text-sm font-medium">
                            Role
                        </p>
                        <UserRoleUpdater user={user} access_token={token}/>
                    </div>
                
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <p className="text-sm font-medium">
                            Access Token
                        </p>
                        <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                            {access_token}
                        </p>
                </div>
                
            </CardContent>
        </Card>

    );
}

