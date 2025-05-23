"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUniqueFilterValues } from "@/hooks/useParticipants";
import { X } from "lucide-react";

interface FilterControlsProps {
  onFilterChange: (filters: { schoolName?: string; committee?: string }) => void;
  currentFilters: { schoolName?: string; committee?: string };
}

export default function FilterControls({ onFilterChange, currentFilters }: FilterControlsProps) {
  const { data: filterValues, isLoading, error } = useUniqueFilterValues();

  const handleSchoolChange = (value: string) => {
    onFilterChange({ ...currentFilters, schoolName: value === "all" ? undefined : value });
  };

  const handleCommitteeChange = (value: string) => {
    onFilterChange({ ...currentFilters, committee: value === "all" ? undefined : value });
  };

  const clearFilters = () => {
    onFilterChange({});
  };
  
  if (isLoading) return <p className="text-sm text-muted-foreground">Loading filters...</p>;
  if (error) return <p className="text-sm text-destructive">Error loading filters.</p>;

  const hasActiveFilters = currentFilters.schoolName || currentFilters.committee;

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 border rounded-lg shadow-sm bg-card">
      <div className="flex-1">
        <label htmlFor="school-filter" className="block text-sm font-medium mb-1">Filter by School</label>
        <Select onValueChange={handleSchoolChange} value={currentFilters.schoolName || "all"}>
          <SelectTrigger id="school-filter">
            <SelectValue placeholder="All Schools" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Schools</SelectItem>
            {filterValues?.schools.map((school) => (
              <SelectItem key={school} value={school}>{school}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1">
        <label htmlFor="committee-filter" className="block text-sm font-medium mb-1">Filter by Committee</label>
        <Select onValueChange={handleCommitteeChange} value={currentFilters.committee || "all"}>
          <SelectTrigger id="committee-filter">
            <SelectValue placeholder="All Committees" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Committees</SelectItem>
            {filterValues?.committees.map((committee) => (
              <SelectItem key={committee} value={committee}>{committee}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {hasActiveFilters && (
         <div className="flex items-end">
            <Button variant="outline" onClick={clearFilters} className="w-full sm:w-auto">
                <X className="mr-2 h-4 w-4" /> Clear Filters
            </Button>
         </div>
      )}
    </div>
  );
}
