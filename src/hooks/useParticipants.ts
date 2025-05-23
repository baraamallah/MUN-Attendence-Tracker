"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getParticipants, 
  addParticipant as apiAddParticipant, 
  updateParticipant as apiUpdateParticipant, 
  deleteParticipant as apiDeleteParticipant,
  getUniqueFilterValues as apiGetUniqueFilterValues
} from "@/lib/firebase/firestore";
import type { Participant } from "@/types";
import { useToast } from "@/hooks/use-toast";

const PARTICIPANTS_QUERY_KEY = "participants";
const UNIQUE_FILTERS_QUERY_KEY = "uniqueFilters";

export interface ParticipantFilters {
  schoolName?: string;
  committee?: string;
}

export function useParticipants(filters?: ParticipantFilters) {
  return useQuery<Participant[], Error>({
    queryKey: [PARTICIPANTS_QUERY_KEY, filters],
    queryFn: () => getParticipants(filters),
  });
}

export function useUniqueFilterValues() {
  return useQuery<{ schools: string[], committees: string[] }, Error>({
    queryKey: [UNIQUE_FILTERS_QUERY_KEY],
    queryFn: apiGetUniqueFilterValues,
  });
}

export function useAddParticipant() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (participantData: Omit<Participant, "id" | "createdAt" | "updatedAt">) => apiAddParticipant(participantData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PARTICIPANTS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [UNIQUE_FILTERS_QUERY_KEY] });
      toast({ title: "Success", description: "Participant added successfully." });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: `Failed to add participant: ${error.message}`, variant: "destructive" });
    },
  });
}

export function useUpdateParticipant() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string, updates: Partial<Omit<Participant, "id" | "createdAt">> }) => apiUpdateParticipant(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PARTICIPANTS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [UNIQUE_FILTERS_QUERY_KEY] }); // In case school/committee changed
      toast({ title: "Success", description: "Participant updated successfully." });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: `Failed to update participant: ${error.message}`, variant: "destructive" });
    },
  });
}

export function useDeleteParticipant() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => apiDeleteParticipant(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PARTICIPANTS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [UNIQUE_FILTERS_QUERY_KEY] });
      toast({ title: "Success", description: "Participant deleted successfully." });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: `Failed to delete participant: ${error.message}`, variant: "destructive" });
    },
  });
}
