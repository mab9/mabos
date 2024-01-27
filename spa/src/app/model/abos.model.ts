import {Period} from "./period.enum";

export interface Abo {
  id: number | null;
  title: string;
  price: number; // in month
  period : Period;
  active: boolean;
  description: string;
  isEditing: boolean;
  startDate: string;
}
