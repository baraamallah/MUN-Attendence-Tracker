// This is a MOCK AI flow.
// In a real scenario, this file would contain actual Genkit flow definitions.
// For the purpose of this exercise, we simulate its existence and functionality.

import type { Participant } from '@/types';

interface AISearchResult {
  participant: Participant;
  confidence: number; // A score from 0 to 1
  reasoning?: string; // Optional explanation from AI
}

// Mock data - replace with actual participant data source if needed for richer mock
const mockParticipants: Participant[] = [
  { id: '1', fullName: 'Alice Wonderland', email: 'alice@example.com', role: 'delegate', schoolName: 'Oxford Academy', committee: 'UNSC', attendanceStatus: true },
  { id: '2', fullName: 'Bob The Builder', email: 'bob@example.com', role: 'staff', schoolName: 'MIT', committee: 'Secretariat', attendanceStatus: false },
  { id: '3', fullName: 'Charlie Brown', email: 'charlie@example.com', role: 'delegate', schoolName: 'Stanford High', committee: 'DISEC', attendanceStatus: true },
  { id: '4', fullName: 'Alicia Keys', email: 'alicia@example.com', role: 'delegate', schoolName: 'Oxford Academy', committee: 'ECOSOC', attendanceStatus: false },
];

/**
 * Simulates an AI flow that searches for delegates.
 * @param query - The search query (e.g., partial name, school, committee)
 * @returns A promise that resolves to an array of likely results or an empty array.
 */
export async function searchDelegatesFlow(query: string): Promise<AISearchResult[]> {
  console.log(`AI Flow: Searching delegates with query: "${query}"`);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (!query.trim()) {
    return [];
  }

  const lowerCaseQuery = query.toLowerCase();
  const results: AISearchResult[] = [];

  mockParticipants.forEach(p => {
    let confidence = 0;
    let reasoning = "";

    if (p.fullName.toLowerCase().includes(lowerCaseQuery)) {
      confidence = Math.max(confidence, 0.8);
      reasoning += `Name match. `;
    }
    if (p.schoolName.toLowerCase().includes(lowerCaseQuery)) {
      confidence = Math.max(confidence, 0.6);
      reasoning += `School match. `;
    }
    if (p.committee.toLowerCase().includes(lowerCaseQuery)) {
      confidence = Math.max(confidence, 0.5);
      reasoning += `Committee match. `;
    }
     if (p.role.toLowerCase().includes(lowerCaseQuery)) {
      confidence = Math.max(confidence, 0.4);
      reasoning += `Role match. `;
    }

    if (confidence > 0.3) { // Arbitrary threshold for inclusion
      results.push({
        participant: p,
        confidence: Math.min(0.95, confidence + (Math.random() * 0.1)), // Add some randomness
        reasoning: reasoning.trim() || "General similarity.",
      });
    }
  });

  // Sort by confidence
  results.sort((a, b) => b.confidence - a.confidence);
  
  console.log(`AI Flow: Found ${results.length} results.`);
  return results.slice(0, 5); // Return top 5 results
}
