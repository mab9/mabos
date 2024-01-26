import {Period} from "./period.enum";

export interface Setting {
  email: string; // settings are per user - this is 4 the future...
  isReminderEmailActivated: boolean;
}
