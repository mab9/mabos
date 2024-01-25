import {Period} from "./period.enum";

export interface Abo {
  id: string;
  title: string;
  price: number;
  period : Period;
  active: boolean;
  validUntil : string;
  description: string;
}

export function sortCoursesByTitle(a1: Abo, a2: Abo) {
  return a1.title > a2.title;
}
