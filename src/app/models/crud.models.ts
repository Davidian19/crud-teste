export interface IEmployee {
  id?: number;
  name: string;
  specialty: string;
  crm: string;
  phone: string;
  email: string;
  hireDate: Date;
  startTime: string;
  endTime: string;
  status: boolean;
  availableDays: string[];
}
