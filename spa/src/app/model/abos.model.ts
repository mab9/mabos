import {Period} from "./period.enum";
import {format} from "date-fns";

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

  isExpiringThisMonth: boolean;
  isAutoRenewal: boolean;

  // // Reminder
  expReminder: boolean;
  expReminderPeriod: Period;
  expReminderPeriodAmounts: number;
}

export const createAbo = (today = new Date(), period = Period.MONTH): Abo => {
  const formattedDate = format(today, 'yyyy-MM-dd');
  return {
    id: null,
    title: 'New Abo',
    price: 0,
    period: period,
    active: false,
    description: '',
    isEditing: false,
    isExpiringThisMonth: false,
    isAutoRenewal: false,
    startDate: formattedDate,

    expReminder: true,
    expReminderPeriod: Period.WEEK,
    expReminderPeriodAmounts: 1,
  }
}
