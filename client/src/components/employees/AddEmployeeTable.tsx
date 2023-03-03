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
    name: 'name',
    label: 'Name',
  },
  {
    name: 'middle_name',
    label: 'Middle Name',
  },
  {
    name: 'surname',
    label: 'Surname',
  },
  {
    name: 'dob',
    label: 'Birth Date',
  },
  {
    name: 'gender',
    label: 'Gender',
    options: ['male', 'female', 'other'],
  },
  {
    name: 'address',
    label: 'Address',
  },
  {
    name: 'phone_number',
    label: 'Phone Number',
  },
  {
    name: 'email',
    label: 'Email Address',
  },
];

export function AddEmployeeTable() {
  return (
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
  );
}
