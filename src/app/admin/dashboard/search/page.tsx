
"use client";

import AiDelegateSearch from "@/components/admin/AiDelegateSearch";
import { Search } from "lucide-react";

export default function AiSearchPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <Search className="mr-3 h-8 w-8 text-primary" /> AI Delegate Search
        </h1>
        <p className="text-muted-foreground">
          Use artificial intelligence to find specific delegates based on various criteria.
        </p>
      </div>
      <AiDelegateSearch />
    </div>
  );
}
