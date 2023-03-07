export interface IEmployeeSummary {
  id: number;
  full_name: string;
  current_team: string | string[];
  mobile_number: string;
  email_address: string;
  designation: string;
  billable_hrs: string;
}
export interface IEmployeeData {
  name: string;
  middle_name: string;
  surname: string;
  dob: string;
  gender: string;
  address: string;
  phone_number: string;
  email: string;
  starts_at: string;
  ends_at: string;
  job_position: string;
  team: string;
  is_billable: boolean;
  billable_hrs: string;
}

export type IBreadCrumbs = {
  title: string;
  link: string;
}[];

export interface IEmployeeResponse {
  data: ISingleEmployeeResponse[];
}

export interface ISingleEmployeeResponse {
  team: string[];
  name: string;
  middle_name: string;
  surname: string;
  dob: string;
  address: string;
  phone_number: string;
  email: string;
  gender: Gender;
  starts_at: string;
  ends_at: string;
  job_position: string;
  is_billable: boolean;
  billable_hrs: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}
