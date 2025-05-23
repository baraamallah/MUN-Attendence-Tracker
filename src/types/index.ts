export type ParticipantRole = "delegate" | "staff";

export interface Participant {
  id: string;
  fullName: string;
  email: string; // Used as a unique identifier and for potential communication
  role: ParticipantRole;
  schoolName: string;
  committee: string;
  attendanceStatus: boolean;
  createdAt?: Date; // Firestore typically handles timestamps well
  updatedAt?: Date;
}
