
"use client"; 

import { useState } from "react";
import AddEditParticipantDialog from "@/components/admin/AddEditParticipantDialog";
import FilterControls from "@/components/admin/FilterControls";
import ParticipantTable from "@/components/admin/ParticipantTable";
import { useParticipants, type ParticipantFilters } from "@/hooks/useParticipants";
import { Users } from "lucide-react";

export default function ParticipantsPage() {
  const [filters, setFilters] = useState<ParticipantFilters>({});
  const { data: participants, isLoading, error } = useParticipants(filters);

  const handleFilterChange = (newFilters: ParticipantFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <Users className="mr-3 h-8 w-8 text-primary" /> Participant Management
          </h1>
          <p className="text-muted-foreground">
            View, add, edit, and manage event participants.
          </p>
        </div>
        <AddEditParticipantDialog />
      </div>
      
      <FilterControls onFilterChange={handleFilterChange} currentFilters={filters} />
      {error && <p className="text-destructive">Error loading participants: {error.message}</p>}
      <ParticipantTable participants={participants || []} isLoading={isLoading} />
    </div>
  );
}
