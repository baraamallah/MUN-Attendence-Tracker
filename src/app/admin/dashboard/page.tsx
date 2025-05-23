
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Users, Search, LayoutDashboard, BarChartHorizontalBig } from "lucide-react";
import { useParticipants } from "@/hooks/useParticipants"; // For potential summary data

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const { data: participants, isLoading } = useParticipants(); // Fetch all for summary

  const totalParticipants = participants?.length ?? 0;
  const presentParticipants = participants?.filter(p => p.attendanceStatus).length ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome, {user?.displayName || user?.email || "Admin"}! Here's an overview of your event.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Participants
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
                <div className="text-2xl font-bold">-</div>
            ) : (
                <div className="text-2xl font-bold">{totalParticipants}</div>
            )}
            <p className="text-xs text-muted-foreground">
              Registered delegates and staff
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Currently Present
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             {isLoading ? (
                <div className="text-2xl font-bold">-</div>
            ) : (
                <div className="text-2xl font-bold">{presentParticipants}</div>
            )}
            <p className="text-xs text-muted-foreground">
              Participants marked as present
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Quick Actions
            </CardTitle>
            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-col space-y-2">
             <Link href="/admin/dashboard/participants" passHref legacyBehavior>
                <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" /> Manage Participants
                </Button>
            </Link>
            <Link href="/admin/dashboard/search" passHref legacyBehavior>
                <Button variant="outline" className="w-full justify-start">
                    <Search className="mr-2 h-4 w-4" /> AI Delegate Search
                </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder for future charts or more detailed summaries */}
      {/* 
      <Card>
        <CardHeader>
          <CardTitle>Attendance Overview</CardTitle>
          <CardDescription>Chart showing attendance trends (placeholder).</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center bg-muted/50 rounded-md">
          <BarChartHorizontalBig className="h-16 w-16 text-muted-foreground" />
          <p className="ml-4 text-muted-foreground">Chart will be displayed here.</p>
        </CardContent>
      </Card>
      */}
    </div>
  );
}

// Helper Icon (can be moved to a shared icons file if used elsewhere)
function UserCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  )
}
