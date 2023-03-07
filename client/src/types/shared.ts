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
  team: Team[];
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
export interface Team {
  name: string;
  id: string;
}

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}

export interface ITeamTable {
  team_name: string;
  members: string;
  mobile_qr_details: string;
  total_man_hours: string;
}

export interface ITeamResponse {
  data: ITeamSingleResponse[];
}

export interface ITeamSingleResponse {
  name: string;
  password: string;
  members: Member[];
  billable_hrs: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export interface Member {
  name: string;
  id: string;
}
