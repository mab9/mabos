
export interface User {
  id: number | null;
  email: string;
  name: string;
  role: string;

  sendEmailReminders: boolean;
  createDate: string;
}
