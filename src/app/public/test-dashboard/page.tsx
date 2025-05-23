
"use client";

import { useParticipants } from "@/hooks/useParticipants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertTriangle, ListChecks } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TestDashboardNoAuthPage() {
  const { data: participants, isLoading, error } = useParticipants();

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-screen bg-background">
      <Card className="max-w-3xl mx-auto shadow-xl my-8">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center">
              <ListChecks className="h-8 w-8 mr-3 text-primary" />
              <CardTitle className="text-2xl sm:text-3xl">Test Dashboard (No Auth)</CardTitle>
            </div>
            <Link href="/" passHref legacyBehavior>
              <Button variant="outline" size="sm" className="mt-2 sm:mt-0">Back to Home</Button>
            </Link>
          </div>
          <CardDescription className="mt-3 text-sm space-y-1">
            <p>
              This page attempts to load participant data directly from Firestore without requiring login.
              It's for testing data fetching and Firestore connectivity.
            </p>
            <div className="p-3 mt-2 border-l-4 border-destructive bg-destructive/10 text-destructive-foreground/90 rounded-md">
              <p className="font-semibold">
                <AlertTriangle className="inline h-5 w-5 mr-1" />
                Security Warning for Testing:
              </p>
              <ul className="list-disc list-inside pl-2 text-xs">
                <li>For this page to display data, your Firestore Security Rules must temporarily allow public read access to the 'participants' collection.</li>
                <li>Example insecure rule: <code>match /participants/{'{document=**}'} {'{ allow read: if true; }'}</code></li>
                <li>
                  <strong>REVERT TO SECURE RULES IMMEDIATELY AFTER TESTING.</strong> Exposing data publicly is a security risk.
                </li>
              </ul>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-lg font-medium">Loading participant data...</p>
              <p className="text-sm">Attempting to fetch from Firestore.</p>
            </div>
          )}
          {error && (
            <div className="bg-destructive/10 border border-destructive text-destructive p-6 rounded-lg shadow">
              <div className="flex items-center mb-3">
                <AlertTriangle className="h-7 w-7 mr-3" />
                <h3 className="font-semibold text-xl">Oops! Error Loading Data</h3>
              </div>
              <p className="mb-2 text-md">An error occurred while trying to fetch participant data:</p>
              <pre className="bg-destructive/20 p-3 rounded-md text-sm overflow-x-auto mb-3">{error.message}</pre>
              <p className="text-sm">
                This could be due to your Firestore Security Rules not allowing public read access (even for testing),
                a network issue, or an incorrect Firebase project configuration.
              </p>
              <p className="text-sm mt-1">Please check your Firestore rules and the browser console for more details.</p>
            </div>
          )}
          {!isLoading && !error && participants && (
            <>
              {participants.length > 0 ? (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Participants List ({participants.length})</h3>
                  <ul className="space-y-3 max-h-[50vh] overflow-y-auto pr-2 rounded-md border p-3 bg-muted/30">
                    {participants.map((participant) => (
                      <li key={participant.id} className="p-3 border rounded-md shadow-sm bg-card hover:bg-muted/50 transition-colors">
                        <p className="font-semibold text-card-foreground">{participant.fullName}</p>
                        <p className="text-sm text-muted-foreground">Email: {participant.email}</p>
                        <p className="text-sm text-muted-foreground">School: {participant.schoolName}</p>
                        <p className="text-sm text-muted-foreground">Committee: {participant.committee}</p>
                         <p className="text-sm text-muted-foreground">Role: <span className="capitalize">{participant.role}</span></p>
                        <p className="text-sm text-muted-foreground">Present: {participant.attendanceStatus ? "Yes" : "No"}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <ListChecks className="h-12 w-12 mx-auto mb-4 text-primary/50" />
                  <p className="text-xl font-medium">No Participants Found</p>
                  <p className="text-sm">The 'participants' collection might be empty, or data could not be fetched due to permissions.</p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
