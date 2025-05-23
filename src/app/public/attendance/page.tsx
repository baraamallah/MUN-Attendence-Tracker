"use client";

import AttendanceStatusTable from "@/components/public/AttendanceStatusTable";
import { useParticipants, type ParticipantFilters } from "@/hooks/useParticipants";
import { Loader2, Users, ServerCrash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PublicAttendancePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  
  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const { data: participants, isLoading, error } = useParticipants(); // Fetch all participants initially

  const filteredParticipants = participants?.filter(participant =>
    participant.fullName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    participant.schoolName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    participant.committee.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <Users className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          MUN Attendance Status
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Check your attendance record for the event. Updates are live.
        </p>
      </header>

      <Card className="max-w-5xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle>Participant List</CardTitle>
          <CardDescription>Search by name, school, or committee to find your status.</CardDescription>
          <div className="mt-4">
            <Input
              type="text"
              placeholder="Search participants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md"
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-lg">Loading attendance records...</p>
            </div>
          )}
          {error && (
            <div className="flex flex-col items-center justify-center py-20 text-destructive">
              <ServerCrash className="h-12 w-12 mb-4" />
              <p className="text-lg font-semibold">Oops! Something went wrong.</p>
              <p>Could not load attendance data: {error.message}</p>
              <p className="mt-2 text-sm">Please try refreshing the page or check back later.</p>
            </div>
          )}
          {!isLoading && !error && (
            <AttendanceStatusTable participants={filteredParticipants || []} searchTerm={debouncedSearchTerm}/>
          )}
        </CardContent>
      </Card>
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>If you have any questions about your attendance, please contact the event organizers.</p>
        <p>&copy; {new Date().getFullYear()} MUN Organizers. All rights reserved.</p>
      </footer>
    </div>
  );
}
