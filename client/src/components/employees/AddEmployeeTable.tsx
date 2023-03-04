import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
const formData = [
  {
    name: 'profile',
    label: 'Profile Image',
  },
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
      <div className='flex flex-row justify-start items-center gap-x-[80px]'>
        <div className='bg-[#C3C1BF] h-[120px] w-[120px] rounded-full flex  items-center justify-center'></div>
        <div className='flex flex-col gap-[10px] items-start justify-center'>
          <h2>Profile image</h2>
          <button>Upload Profile Image</button>
        </div>
      </div>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        layout='vertical'
      >
        <Form.Item
          label='Username'
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
