"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Participant } from "@/types";
import { UserCheck, UserX, Users } from "lucide-react";

interface AttendanceStatusTableProps {
  participants: Participant[];
  searchTerm: string;
}

export default function AttendanceStatusTable({ participants, searchTerm }: AttendanceStatusTableProps) {
  if (participants.length === 0 && searchTerm) {
     return (
      <div className="text-center py-10 text-muted-foreground">
        <Users className="mx-auto h-12 w-12 mb-2" />
        <p className="text-lg">No participants found matching "{searchTerm}".</p>
        <p className="text-sm">Please check your spelling or try a different search term.</p>
      </div>
    );
  }

  if (participants.length === 0 && !searchTerm) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <Users className="mx-auto h-12 w-12 mb-2" />
        <p className="text-lg">No participants to display at the moment.</p>
        <p className="text-sm">Attendance records will appear here once added by the admin.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border shadow-sm overflow-hidden bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>School</TableHead>
            <TableHead>Committee</TableHead>
            <TableHead className="text-center">Role</TableHead>
            <TableHead className="text-center">Attendance Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {participants.map((participant) => (
            <TableRow key={participant.id}>
              <TableCell className="font-medium">{participant.fullName}</TableCell>
              <TableCell>{participant.schoolName}</TableCell>
              <TableCell>{participant.committee}</TableCell>
              <TableCell className="text-center">
                 <Badge variant={participant.role === 'delegate' ? 'secondary' : 'outline'}>
                  {participant.role.charAt(0).toUpperCase() + participant.role.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                {participant.attendanceStatus ? (
                  <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-white">
                    <UserCheck className="mr-1 h-4 w-4" /> Present
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <UserX className="mr-1 h-4 w-4" /> Absent
                  </Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
