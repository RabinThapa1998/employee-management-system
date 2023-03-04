import React, { useMemo } from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IEmployeeSummary } from '~/types';
import { employeeSelector, useAppSelector } from '~/global-states';
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

export function EmployeesTable() {
  const employeeList = useAppSelector(employeeSelector);
  console.log('🚀 ~ file: EmployeesTable.tsx:70 ~ EmployeesTable ~ employeeList:', employeeList);

  const employeeFormattedData = useMemo(() => {
    const temp = employeeList.map((item, idx) => {
      return {
        id: idx,
        full_name: item.name + ' ' + item.middle_name + ' ' + item.surname,
        current_team: item.team,
        mobile_number: item.phone_number,
        email_address: item.email,
        designation: item.job_position,
        billable_hours: item.billable_hrs,
      };
    });
    return temp;
  }, [employeeList]);
  return <Table columns={columns} dataSource={employeeFormattedData} />;
}
