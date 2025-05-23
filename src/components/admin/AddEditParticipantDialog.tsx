"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { Participant, ParticipantRole } from "@/types";
import { useAddParticipant, useUpdateParticipant } from "@/hooks/useParticipants";
import { useEffect, useState } from "react";
import { Loader2, PlusCircle, Edit } from "lucide-react";

const participantSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  role: z.enum(["delegate", "staff"], { required_error: "Role is required." }),
  schoolName: z.string().min(2, { message: "School name must be at least 2 characters." }),
  committee: z.string().min(2, { message: "Committee must be at least 2 characters." }),
  attendanceStatus: z.boolean().default(false),
});

type ParticipantFormValues = z.infer<typeof participantSchema>;

interface AddEditParticipantDialogProps {
  participant?: Participant; // For editing existing participant
  triggerButton?: React.ReactNode; // Custom trigger button
}

export default function AddEditParticipantDialog({ participant, triggerButton }: AddEditParticipantDialogProps) {
  const [open, setOpen] = useState(false);
  const isEditMode = !!participant;
  
  const addMutation = useAddParticipant();
  const updateMutation = useUpdateParticipant();

  const form = useForm<ParticipantFormValues>({
    resolver: zodResolver(participantSchema),
    defaultValues: participant 
      ? {
          fullName: participant.fullName,
          email: participant.email,
          role: participant.role,
          schoolName: participant.schoolName,
          committee: participant.committee,
          attendanceStatus: participant.attendanceStatus,
        }
      : {
          fullName: "",
          email: "",
          role: "delegate",
          schoolName: "",
          committee: "",
          attendanceStatus: false,
        },
  });

  useEffect(() => {
    if (participant && open) {
      form.reset({
        fullName: participant.fullName,
        email: participant.email,
        role: participant.role,
        schoolName: participant.schoolName,
        committee: participant.committee,
        attendanceStatus: participant.attendanceStatus,
      });
    } else if (!participant && open) {
      form.reset({
        fullName: "",
        email: "",
        role: "delegate",
        schoolName: "",
        committee: "",
        attendanceStatus: false,
      });
    }
  }, [participant, open, form]);

  const onSubmit = async (data: ParticipantFormValues) => {
    if (isEditMode && participant) {
      await updateMutation.mutateAsync({ id: participant.id, updates: data });
    } else {
      await addMutation.mutateAsync(data);
    }
    setOpen(false); // Close dialog on success
  };

  const isLoading = addMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton ? (
          triggerButton
        ) : isEditMode ? (
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4 mr-2" /> Edit
          </Button>
        ) : (
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Participant
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Participant" : "Add New Participant"}</DialogTitle>
          <DialogDescription>
            {isEditMode ? "Update the details of the participant." : "Enter the details for the new participant."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="delegate">Delegate</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="schoolName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Springfield High" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="committee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Committee / Community</FormLabel>
                  <FormControl>
                    <Input placeholder="UNSC / Secretariat" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="attendanceStatus"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Attendance Status</FormLabel>
                    <p className="text-xs text-muted-foreground">
                      Mark if the participant is present.
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isLoading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditMode ? "Save Changes" : "Add Participant"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
