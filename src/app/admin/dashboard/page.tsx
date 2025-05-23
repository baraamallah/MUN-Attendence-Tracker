
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Users, Search, LayoutDashboard, BarChartHorizontalBig, Loader2, AlertTriangle } from "lucide-react";
import { useParticipants } from "@/hooks/useParticipants";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AdminDashboardPage() {
  const { user } = useAuth(); // Assuming admin status is already handled by layout
  const { data: participants, isLoading: participantsLoading, error: participantsError } = useParticipants();

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

      {participantsError && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error Loading Participant Data</AlertTitle>
          <AlertDescription>
            Could not fetch participant summaries. Please ensure you are connected and have the necessary permissions.
            {participantsError.message && <p className="text-xs mt-1">Details: {participantsError.message}</p>}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Participants
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {participantsLoading ? (
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            ) : participantsError ? (
                <span className="text-destructive text-sm font-semibold">Error</span>
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
             {participantsLoading ? (
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            ) : participantsError ? (
                <span className="text-destructive text-sm font-semibold">Error</span>
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
