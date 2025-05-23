
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Search, User, Users, School, Landmark, AlertTriangle } from "lucide-react";
import type { Participant } from "@/types";
// Assuming searchDelegatesFlow is correctly exported from the AI module
// The path might need adjustment based on actual AI flow structure.
import { searchDelegatesFlow } from "@/ai/flows/delegateSearch"; 
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AISearchResult {
  participant: Participant;
  confidence: number;
  reasoning?: string;
}

export default function AiDelegateSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AISearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      setResults([]);
      setError("Please enter a search query.");
      setSearched(true);
      return;
    }
    setIsLoading(true);
    setError(null);
    setSearched(true);
    try {
      // Call the AI flow
      const searchResults = await searchDelegatesFlow(query);
      setResults(searchResults);
    } catch (err: any) {
      console.error("AI Search Error:", err);
      setError(err.message || "Failed to perform AI search.");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Search className="mr-2 h-6 w-6 text-primary" /> AI Delegate Search
        </CardTitle>
        <CardDescription>
          Find delegates using partial names, school, committee, or role. The AI will try to find the best match.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-6">
          <Input
            type="text"
            placeholder="e.g., 'Alice UNSC', 'Oxford delegate', 'Staff security'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-grow"
          />
          <Button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Search className="mr-2 h-4 w-4" />
            )}
            Search
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {searched && !isLoading && !error && results.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <Users className="mx-auto h-12 w-12 mb-2" />
            <p>No delegates found matching your query.</p>
            <p className="text-sm">Try a broader search term or check for typos.</p>
          </div>
        )}
        
        {results.length > 0 && (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {results.map((result) => (
                <Card key={result.participant.id} className="bg-background/50 border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex justify-between items-center">
                      {result.participant.fullName}
                      <Badge variant="outline" className="font-mono text-xs">
                        Confidence: {(result.confidence * 100).toFixed(0)}%
                      </Badge>
                    </CardTitle>
                    <CardDescription>{result.participant.email}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm space-y-1">
                    <p className="flex items-center"><User className="mr-2 h-4 w-4 text-muted-foreground" /> Role: {result.participant.role}</p>
                    <p className="flex items-center"><School className="mr-2 h-4 w-4 text-muted-foreground" /> School: {result.participant.schoolName}</p>
                    <p className="flex items-center"><Landmark className="mr-2 h-4 w-4 text-muted-foreground" /> Committee: {result.participant.committee}</p>
                    <p>Attendance: <Badge variant={result.participant.attendanceStatus ? "default" : "secondary"}>{result.participant.attendanceStatus ? "Present" : "Absent"}</Badge></p>
                    {result.reasoning && <p className="text-xs text-muted-foreground pt-1"><i>Reasoning: {result.reasoning}</i></p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
      {results.length > 0 && (
        <CardFooter>
          <p className="text-xs text-muted-foreground">Displaying top {results.length} AI-suggested matches.</p>
        </CardFooter>
      )}
    </Card>
  );
}

