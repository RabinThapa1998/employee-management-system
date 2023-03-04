import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import './style.css';
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
const basicInformation = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Enter name',
  },
  {
    name: 'middle_name',
    label: 'Middle Name',
    placeholder: 'Enter middle name',
  },
  {
    name: 'surname',
    label: 'Surname',
    placeholder: 'Enter surname',
  },
  {
    name: 'dob',
    label: 'Birth Date',
    placeholder: 'DD/MM/YYYY',
  },
  {
    name: 'gender',
    label: 'Gender',
    options: ['male', 'female', 'other'],
    placeholder: 'Choose Gender',
  },
  {
    name: 'address',
    label: 'Address',
    placeholder: 'Enter Address',
  },
  {
    name: 'phone_number',
    label: 'Phone Number',
    placeholder: 'Enter Phone Number',
  },
  {
    name: 'email',
    label: 'Email Address',
    placeholder: 'Enter Email Address',
  },
];
const formData = [
  {
    name: 'profile',
    label: 'Profile Image',
  },

  {
    name: 'starts_at',
    label: 'Starts At',
    placeholder: 'HH-MM',
  },
  {
    name: 'ends_in',
    label: 'Ends In',
    placeholder: 'HH-MM',
  },
  {
    name: 'job_position',
    label: 'Job Position',
    placeholder: 'Enter Job Position',
  },
  {
    name: 'team',
    label: 'Team',
    placeholder: 'Choose Team',
    options: ['team1', 'team2', 'team3'],
  },
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

export function AddEmployeeTable() {
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
        <div className='add-employee-form mt-[50px]'>
          <div className='add-employee-form__left '>
            <h2 className='self-start'>Basic Information</h2>
          </div>

          <div className='add-employee-form__right flex flex-row gap-x-[30px] flex-wrap '>
            {basicInformation.map((item) => (
              <Form.Item
                label={item.label}
                name={item.name}
                key={item.name}
                className='w-[398px]'
                rules={[{ required: true, message: 'required' }]}
              >
                <Input />
              </Form.Item>
            ))}
          </div>
        </div>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
