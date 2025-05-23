"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { Participant } from "@/types";
import AddEditParticipantDialog from "./AddEditParticipantDialog";
import { useUpdateParticipant, useDeleteParticipant } from "@/hooks/useParticipants";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit, Trash2, UserCheck, UserX, Loader2 } from "lucide-react";
import { useState } from "react";

interface ParticipantTableProps {
  participants: Participant[];
  isLoading?: boolean;
}

export default function ParticipantTable({ participants, isLoading: tableLoading }: ParticipantTableProps) {
  const updateMutation = useUpdateParticipant();
  const deleteMutation = useDeleteParticipant();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleAttendanceToggle = async (participant: Participant) => {
    setUpdatingId(participant.id);
    await updateMutation.mutateAsync({
      id: participant.id,
      updates: { attendanceStatus: !participant.attendanceStatus },
    });
    setUpdatingId(null);
  };

  if (tableLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2">Loading participants...</p>
      </div>
    );
  }

  if (!participants || participants.length === 0) {
    return <p className="text-center py-10 text-muted-foreground">No participants found. Add some to get started!</p>;
  }
  
  return (
    <div className="rounded-lg border shadow-sm overflow-hidden bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>School</TableHead>
            <TableHead>Committee</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-center">Attendance</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {participants.map((participant) => (
            <TableRow key={participant.id}>
              <TableCell className="font-medium">{participant.fullName}</TableCell>
              <TableCell>{participant.email}</TableCell>
              <TableCell>{participant.schoolName}</TableCell>
              <TableCell>{participant.committee}</TableCell>
              <TableCell>
                <Badge variant={participant.role === 'delegate' ? 'secondary' : 'outline'}>
                  {participant.role.charAt(0).toUpperCase() + participant.role.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <Button 
                  variant={participant.attendanceStatus ? "default" : "outline"} 
                  size="sm"
                  onClick={() => handleAttendanceToggle(participant)}
                  disabled={updateMutation.isPending && updatingId === participant.id}
                  className="w-28"
                >
                  {updateMutation.isPending && updatingId === participant.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : participant.attendanceStatus ? (
                    <><UserCheck className="h-4 w-4 mr-2" /> Present</>
                  ) : (
                    <><UserX className="h-4 w-4 mr-2" /> Absent</>
                  )}
                </Button>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <AddEditParticipantDialog
                  participant={participant}
                  triggerButton={
                    <Button variant="ghost" size="icon" title="Edit Participant">
                      <Edit className="h-4 w-4" />
                    </Button>
                  }
                />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" title="Delete Participant" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the participant
                        "{participant.fullName}" and all their associated data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteMutation.mutate(participant.id)}
                        disabled={deleteMutation.isPending}
                        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                      >
                        {deleteMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
