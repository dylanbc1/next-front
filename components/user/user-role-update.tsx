'use client';

import { useState } from "react";
import { User } from "@/auth";
import { updateUserRole } from "@/actions/update-user-role";

interface UserRoleUpdaterProps {
    user?: User | null;
    access_token?: string | null;
}

export const UserRoleUpdater = ({ user, access_token }: UserRoleUpdaterProps) => {
    const [selectedRole, setSelectedRole] = useState(user?.role || '');
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRole(event.target.value);
    };

    const handleUpdateRole = async () => {
        if (user && selectedRole !== user.role) {
            setUpdating(true);
            setError(null);
            try {
                const updatedUser = await updateUserRole(user, selectedRole, access_token || '');
                console.log("User role updated:", updatedUser);
                
            } catch (err) {
                setError("Error updating user role");
            } finally {
                setUpdating(false);
            }
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <select
                value={selectedRole}
                onChange={handleRoleChange}
                className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md"
            >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
                <option value="OWNER">OWNER</option>
            </select>
            <button
                onClick={handleUpdateRole}
                disabled={updating}
                className="text-xs bg-blue-800 text-white rounded p-1"
            >
                {updating ? 'Updating...' : 'Update Role'}
            </button>
            {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>
    );
};
