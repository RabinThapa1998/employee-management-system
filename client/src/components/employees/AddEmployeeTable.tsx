import React from 'react';
import { Button, Checkbox, Form, Input, Divider, theme } from 'antd';
import './style.css';
import { AddEmployeeFormSectionWrapper } from './AddEmployeeFormSectionWrapper';
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
interface IForm {
  name: string;
  label: string;
  placeholder?: string;
  options?: string[];
  type: 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'time';
}

const basicInformation: IForm[] = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Enter name',
    type: 'text',
  },
  {
    name: 'middle_name',
    label: 'Middle Name',
    placeholder: 'Enter middle name',
    type: 'text',
  },
  {
    name: 'surname',
    label: 'Surname',
    placeholder: 'Enter surname',
    type: 'text',
  },
  {
    name: 'dob',
    label: 'Birth Date',
    placeholder: 'DD/MM/YYYY',
    type: 'date',
  },
  {
    name: 'gender',
    label: 'Gender',
    options: ['male', 'female', 'other'],
    placeholder: 'Choose Gender',
    type: 'select',
  },
  {
    name: 'address',
    label: 'Address',
    placeholder: 'Enter Address',
    type: 'text',
  },
  {
    name: 'phone_number',
    label: 'Phone Number',
    placeholder: 'Enter Phone Number',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email Address',
    placeholder: 'Enter Email Address',
    type: 'text',
  },
];
const workingHours: IForm[] = [
  {
    name: 'starts_at',
    label: 'Starts At',
    placeholder: 'HH-MM',
    type: 'time',
  },
  {
    name: 'ends_in',
    label: 'Ends In',
    placeholder: 'HH-MM',
    type: 'time',
  },
];
const jobs: IForm[] = [
  {
    name: 'job_position',
    label: 'Job Position',
    placeholder: 'Enter Job Position',
    type: 'text',
  },
  {
    name: 'team',
    label: 'Team',
    placeholder: 'Choose Team',
    options: ['team1', 'team2', 'team3'],
    type: 'select',
  },
];
const billableInformation = [
  {
    name: 'is_billable',
    label: 'This user is billable',
  },
  {
    name: 'billable_hrs',
    label: 'Billable Hours',
    placeholder: 'Enter Billable Hours',
  },
];

const { useToken } = theme;
export function AddEmployeeTable() {
  const { token } = useToken();
  return (
    <div className='rounded-primary bg-white px-[60px] py-[30px]'>
      <Form
        name='basic'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        layout='vertical'
      >
        <div className='add-employee-form'>
          <div className='add-employee-form__left'>
            <div className='bg-[#C3C1BF] h-[120px] w-[120px] rounded-full flex  items-center justify-center'></div>
          </div>
          <div className='add-employee-form__right flex flex-col gap-[10px] items-start self-center'>
            <h2>Profile image</h2>
            <button>Upload Profile Image</button>
          </div>
        </div>

        <AddEmployeeFormSectionWrapper title='Basic Information'>
          {basicInformation.map((item) => (
            <Form.Item
              label={item.label}
              name={item.name}
              key={item.name}
              className='w-[398px]'
              rules={[{ required: true, message: 'required' }]}
            >
              <Input placeholder={item.placeholder} />
            </Form.Item>
          ))}
        </AddEmployeeFormSectionWrapper>
        <Divider />

        <AddEmployeeFormSectionWrapper title='Working Hours'>
          {workingHours.map((item) => (
            <Form.Item
              label={item.label}
              name={item.name}
              key={item.name}
              className='w-[398px]'
              rules={[{ required: true, message: 'required' }]}
            >
              <Input placeholder={item.placeholder} />
            </Form.Item>
          ))}
        </AddEmployeeFormSectionWrapper>

        <Divider />
        <AddEmployeeFormSectionWrapper title='Jobs'>
          {jobs.map((item) => (
            <Form.Item
              label={item.label}
              name={item.name}
              key={item.name}
              className='w-[398px]'
              rules={[{ required: true, message: 'required' }]}
            >
              <Input placeholder={item.placeholder} />
            </Form.Item>
          ))}
        </AddEmployeeFormSectionWrapper>

        <Divider />
        <AddEmployeeFormSectionWrapper title='Billable Information'>
          {billableInformation.map((item) => (
            <Form.Item
              label={item.label}
              name={item.name}
              key={item.name}
              className='w-[398px]'
              rules={[{ required: true, message: 'required' }]}
            >
              <Input placeholder={item.placeholder} />
            </Form.Item>
          ))}
        </AddEmployeeFormSectionWrapper>

        <Form.Item>
          <Button type='primary' htmlType='submit' style={{ backgroundColor: token.colorPrimary }}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
