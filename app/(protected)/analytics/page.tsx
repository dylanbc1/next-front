'use client'
import { FinancialReport } from "@/components/analytics/financial";
import { OccupancyReport } from "@/components/analytics/occupancy";
import { RevenueByCity } from "@/components/analytics/revenue-by-city";
import { UserActivityReport } from "@/components/analytics/user-activity";
import { RoleGate } from "@/components/auth/role-gate";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SetStateAction, useState } from "react";



const AnalyticsPage = () => {
    const [selectedReport, setSelectedReport] = useState('');

    const handleReportSelection = (reportType: SetStateAction<string>) => {
        setSelectedReport(reportType);
    }

    return (
        <RoleGate allowedRole="ADMIN">
            <Card className="w-[1000px] shadow-md ">
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-4 gap-4">
                        <Button className="m-2" variant={selectedReport === 'revenue-by-city' ? "default" : "outline"} onClick={() => handleReportSelection('revenue-by-city')}>Revenue by City</Button>
                        <Button className="m-2" variant={selectedReport === 'financial' ? "default" : "outline"} onClick={() => handleReportSelection('financial')}>Financial</Button>
                        <Button className="m-2" variant={selectedReport === 'user-activity' ? "default" : "outline"} onClick={() => handleReportSelection('user-activity')}>User Activity</Button>
                        <Button className="m-2" variant={selectedReport === 'occupancy' ? "default" : "outline"} onClick={() => handleReportSelection('occupancy')}>Occupancy</Button>
                    </div>
                    <div className="flex justify-center">
                            {selectedReport === 'revenue-by-city' && <RevenueByCity />}
                            {selectedReport === 'financial' && <FinancialReport />}
                            {selectedReport === 'user-activity' && <UserActivityReport />}
                            {selectedReport === 'occupancy' && <OccupancyReport />}
                    </div>
                            
                </CardContent>
                
            </Card>
        </RoleGate>
        
        
        
    
    )
}


export default AnalyticsPage;