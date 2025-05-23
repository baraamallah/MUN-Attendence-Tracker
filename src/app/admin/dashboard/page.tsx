
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Users, Search, LayoutDashboard, UserCheck, Loader2, AlertTriangle, ArrowRight } from "lucide-react";
import { useParticipants } from "@/hooks/useParticipants";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

export default function AdminDashboardPage() {
  const { user } = useAuth(); 
  const { data: participants, isLoading: participantsLoading, error: participantsError } = useParticipants();

  const totalParticipants = participants?.length ?? 0;
  const presentParticipants = participants?.filter(p => p.attendanceStatus).length ?? 0;

  const quickActionLinkClasses = "group flex flex-col justify-between items-start p-4 rounded-lg border bg-card hover:bg-muted/50 transition-all duration-200 shadow-sm hover:shadow-md min-h-[100px]";

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
            Could not fetch participant summaries. This might be due to network issues or Firestore permissions.
            Please ensure your Firestore security rules allow the admin user to read the 'participants' collection.
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
            <UserCheckIcon className="h-4 w-4 text-muted-foreground" />
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
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <LayoutDashboard className="h-4 w-4 text-muted-foreground mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-3 pt-2">
            <Link href="/admin/dashboard/participants" passHref legacyBehavior>
              <a className={cn(quickActionLinkClasses, "hover:border-primary/50")}>
                <div className="flex items-center">
                  <Users className="mr-3 h-6 w-6 text-primary" />
                  <span className="font-semibold text-md">Manage Participants</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mt-auto pt-1 group-hover:text-primary">
                  View & Edit List <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform"/>
                </div>
              </a>
            </Link>
            <Link href="/admin/dashboard/search" passHref legacyBehavior>
               <a className={cn(quickActionLinkClasses, "hover:border-accent/50")}>
                <div className="flex items-center">
                  <Search className="mr-3 h-6 w-6 text-accent" />
                  <span className="font-semibold text-md">AI Delegate Search</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mt-auto pt-1 group-hover:text-accent">
                  Find Delegates <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform"/>
                </div>
              </a>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper Icon (can be moved to a shared icons file if used elsewhere)
function UserCheckIcon(props: React.SVGProps<SVGSVGElement>) { // Renamed from UserCheck to avoid conflict with lucide-react if it exists
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
