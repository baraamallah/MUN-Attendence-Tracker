import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  Timestamp,
  orderBy,
  QueryConstraint
} from "firebase/firestore";
import { db } from "./config";
import type { Participant, ParticipantRole } from "@/types";

const PARTICIPANTS_COLLECTION = "participants";

export const addParticipant = async (participantData: Omit<Participant, "id" | "createdAt" | "updatedAt">): Promise<Participant> => {
  const docRef = await addDoc(collection(db, PARTICIPANTS_COLLECTION), {
    ...participantData,
    attendanceStatus: participantData.attendanceStatus ?? false,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return { ...participantData, id: docRef.id, attendanceStatus: participantData.attendanceStatus ?? false, createdAt: new Date(), updatedAt: new Date() };
};

export const getParticipants = async (filters?: { schoolName?: string; committee?: string }): Promise<Participant[]> => {
  const qConstraints: QueryConstraint[] = [orderBy("fullName")];

  if (filters?.schoolName) {
    qConstraints.push(where("schoolName", "==", filters.schoolName));
  }
  if (filters?.committee) {
    qConstraints.push(where("committee", "==", filters.committee));
  }

  const q = query(collection(db, PARTICIPANTS_COLLECTION), ...qConstraints);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ 
    id: doc.id, 
    ...doc.data(),
    createdAt: (doc.data().createdAt as Timestamp)?.toDate(),
    updatedAt: (doc.data().updatedAt as Timestamp)?.toDate(),
  } as Participant));
};

export const updateParticipant = async (id: string, updates: Partial<Omit<Participant, "id" | "createdAt">>): Promise<void> => {
  const participantDoc = doc(db, PARTICIPANTS_COLLECTION, id);
  await updateDoc(participantDoc, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
};

export const deleteParticipant = async (id: string): Promise<void> => {
  const participantDoc = doc(db, PARTICIPANTS_COLLECTION, id);
  await deleteDoc(participantDoc);
};

// Helper to get unique school names and committees for filters
export const getUniqueFilterValues = async (): Promise<{ schools: string[], committees: string[] }> => {
  const querySnapshot = await getDocs(collection(db, PARTICIPANTS_COLLECTION));
  const participants = querySnapshot.docs.map(doc => doc.data() as Participant);
  
  const schools = Array.from(new Set(participants.map(p => p.schoolName).filter(Boolean))).sort();
  const committees = Array.from(new Set(participants.map(p => p.committee).filter(Boolean))).sort();
  
  return { schools, committees };
};
