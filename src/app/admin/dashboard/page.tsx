"use client"; // Required for useState, useEffect, and custom hooks

import { useState } from "react";
import AddEditParticipantDialog from "@/components/admin/AddEditParticipantDialog";
import FilterControls from "@/components/admin/FilterControls";
import ParticipantTable from "@/components/admin/ParticipantTable";
import AiDelegateSearch from "@/components/admin/AiDelegateSearch";
import { useParticipants, type ParticipantFilters } from "@/hooks/useParticipants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Search, ListFilter } from "lucide-react";

export default function AdminDashboardPage() {
  const [filters, setFilters] = useState<ParticipantFilters>({});
  const { data: participants, isLoading, error } = useParticipants(filters);

  const handleFilterChange = (newFilters: ParticipantFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Participant Management</h1>
          <p className="text-muted-foreground">
            View, add, edit, and manage event participants.
          </p>
        </div>
        <AddEditParticipantDialog />
      </div>
      
      <Tabs defaultValue="manage" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:w-[400px]">
          <TabsTrigger value="manage"><Users className="mr-2 h-4 w-4" />Manage Participants</TabsTrigger>
          <TabsTrigger value="ai-search"><Search className="mr-2 h-4 w-4" />AI Search</TabsTrigger>
        </TabsList>
        <TabsContent value="manage" className="mt-6">
          <FilterControls onFilterChange={handleFilterChange} currentFilters={filters} />
          {error && <p className="text-destructive">Error loading participants: {error.message}</p>}
          <ParticipantTable participants={participants || []} isLoading={isLoading} />
        </TabsContent>
        <TabsContent value="ai-search" className="mt-6">
          <AiDelegateSearch />
        </TabsContent>
      </Tabs>
    </div>
  );
}
