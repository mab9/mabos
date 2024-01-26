import {Period} from "./period.enum";

export interface Abo {
  id: number | null;
  title: string;
  price: number; // in month
  period : Period;
  active: boolean;
  description: string;
  isEditing: boolean;
}

export function sortCoursesByTitle(a1: Abo, a2: Abo) {
  return a1.title > a2.title;
}
