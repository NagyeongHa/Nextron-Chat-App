import { FieldValue } from "firebase/firestore";

export interface Message {
  date: FieldValue;
  displayName: string;
  message: string;
}
