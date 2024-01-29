import {Period} from "./period.enum";

export interface Abo {
  id: number | null;
  title: string;
  price: number; // in month
  period : Period;
  active: boolean;
  description: string;
  startDate: string;
  // autoRenewal : boolean; // auslaufendes abo oder auto verlängerung.

  // meta data
  isEditing: boolean;

  // // Reminder
  // expReminder: boolean;
  // expReminderPeriod: Period;
  // expReminderPeriodAmounts: number;
}
