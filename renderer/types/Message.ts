import { FieldValue } from "firebase/firestore";

export interface Message {
  date: { seconds: number };
  displayName: string;
  message: string;
  photoURL: string;
}
