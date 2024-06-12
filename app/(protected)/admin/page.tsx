
'use client'
import { RoleGate } from "@/components/auth/role-gate"
import { FormSucceess } from "@/components/form-success"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const AdminPage = () => {
    const onApiRouteClick = async () => {
        fetch("/api/admin")
        .then((response)=>{
            if (response.ok){
                console.log("okay")
            }else{
                console.error("Forbiden")
            }
            
        })
    }

    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p text-2xl font-semibold text-center>
                    🔐 Admin
                </p>
            </CardHeader>
                <CardContent className="space-y-4">
                    <RoleGate allowedRole="ADMIN">
                        <FormSucceess message="You are allowed to see this content"/>
                                <div className="flex flex-row items-center justify-between
                                rounded-lg border p-3 shadow-md">
                                    <p className="text-sm font-medium">
                                        Admin-Only API ROUTE
                                    </p>
                                    <Button onClick={onApiRouteClick}>
                                    Click to test
                                    </Button>
                                </div>
                            
                            <div className="flex flex-row items-center justify-between
                            rounded-lg border p-3 shadow-md">
                                <p className="text-sm font-medium">
                                    Admin-Only SERVER ACTION
                                </p>
                                <Button>
                                Click to test
                                </Button>
                            </div>
                    </RoleGate>
                    
                    
                </CardContent>
        </Card>
    )
}
export default AdminPage