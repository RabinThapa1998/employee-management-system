import { IForm } from '~/types';

export const basicInformation: IForm[] = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Enter name',
    type: 'string',
    required: true,
  },
  {
    name: 'middle_name',
    label: 'Middle Name',
    placeholder: 'Enter middle name',
    type: 'string',
    required: false,
  },
  {
    name: 'surname',
    label: 'Surname',
    placeholder: 'Enter surname',
    type: 'string',
    required: true,
  },
  {
    name: 'dob',
    label: 'Birth Date',
    placeholder: 'DD/MM/YYYY',
    type: 'date',
    required: true,
  },
  {
    name: 'gender',
    label: 'Gender',
    options: [
      {
        value: 'male',
        label: 'Male',
      },
      {
        value: 'female',
        label: 'Female',
      },
      {
        value: 'other',
        label: 'Other',
      },
    ],
    placeholder: 'Choose Gender',
    type: 'string',
    required: true,
  },
  {
    name: 'address',
    label: 'Address',
    placeholder: 'Enter Address',
    type: 'string',
    required: true,
  },
  {
    name: 'phone_number',
    label: 'Phone Number',
    placeholder: 'Enter Phone Number',
    type: 'string',
    required: true,
  },
  {
    name: 'email',
    label: 'Email Address',
    placeholder: 'Enter Email Address',
    type: 'email',
    required: true,
  },
];
export const workingHours: IForm[] = [
  {
    name: 'starts_at',
    label: 'Starts At',
    placeholder: 'HH-MM',
    type: 'string',
    required: true,
  },
  {
    name: 'ends_at',
    label: 'Ends In',
    placeholder: 'HH-MM',
    type: 'string',
    required: true,
  },
];
export const jobs: IForm[] = [
  {
    name: 'job_position',
    label: 'Job Position',
    placeholder: 'Enter Job Position',
    type: 'string',
    required: true,
  },
  {
    name: 'team',
    label: 'Team',
    placeholder: 'Choose Team',
    options: [
      {
        value: 'available',
        label: 'Available',
      },
    ],
    type: 'string',
    required: true,
  },
];
export const billableInformation = [
  {
    name: 'is_billable',
    label: 'This user is billable',
    type: 'checkbox',
    required: true,
  },
  {
    name: 'billable_hrs',
    label: 'Billable Hours',
    placeholder: 'Enter Billable Hours',
    required: true,
  },
];
