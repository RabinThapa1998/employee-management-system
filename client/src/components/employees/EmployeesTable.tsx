import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IEmployeeSummary } from '~/types';
const columns: ColumnsType<IEmployeeSummary> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Full Name',
    dataIndex: 'full_name',
    key: 'full_name',
  },
  {
    title: 'Current Team',
    dataIndex: 'current_team',
    key: 'current_team',
  },
  {
    title: 'Mobile Number',
    dataIndex: 'mobile_number',
    key: 'mobile_number',
  },
  {
    title: 'Email Address',
    dataIndex: 'email_address',
    key: 'email_address',
  },
  {
    title: 'Designation',
    dataIndex: 'designation',
    key: 'designation',
  },
  {
    title: 'Billable Hours',
    dataIndex: 'billable_hours',
    key: 'billable_hours',
  },

  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        <p>view</p>
        <p>edit</p>
        <p>delete</p>
      </Space>
    ),
  },
];

const data: IEmployeeSummary[] = [
  {
    id: '1',
    full_name: 'David Doe',
    current_team: 'Fabrication Team 1',
    mobile_number: '+61 8386 3482',
    email_address: 'david33@gmail.com',
    designation: 'Electrical',
    billable_hours: '40 hours/week',
  },
];

export const EmployeesTable: React.FC = () => <Table columns={columns} dataSource={data} />;
