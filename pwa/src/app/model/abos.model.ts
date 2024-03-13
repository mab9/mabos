import {Period} from "./period.enum";
import {format} from "date-fns";
import {TagsEnum} from "./tags.enum";

export interface Abo {
  id: number | null;
  title: string;
  price: number; // in month
  period : Period;
  active: boolean;
  description: string;
  startDate: string;
  isAutoRenewal: boolean;
  tag: TagsEnum | null,

  // meta data
  isEditing: boolean;
  costsPerYear: number;

  // // Reminder
  expReminder: boolean;
  expReminderPeriod: Period;
  expReminderPeriodAmounts: number;
}

export const createAbo = (today = new Date(), period = Period.MONTH): Abo => {
  const formattedDate = format(today, 'yyyy-MM-dd');
  return {
    id: null,
    title: 'New subs...',
    price: 0,
    period: period,
    active: false,
    tag: null,
    description: '',
    costsPerYear: 0,
    isEditing: false,
    isAutoRenewal: false,
    startDate: formattedDate,

    expReminder: true,
    expReminderPeriod: Period.WEEK,
    expReminderPeriodAmounts: 1,
  }
}
