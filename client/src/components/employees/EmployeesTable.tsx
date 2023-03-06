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
    colSpan: 1,
    width: 100,
  },
  {
    title: 'Full Name',
    dataIndex: 'full_name',
    key: 'full_name',
    colSpan: 1,
    width: 150,
  },
  {
    title: 'Current Team',
    dataIndex: 'current_team',
    key: 'current_team',
    colSpan: 1,
    width: 150,
  },
  {
    title: 'Mobile Number',
    dataIndex: 'mobile_number',
    key: 'mobile_number',
    colSpan: 1,
    width: 150,
  },
  {
    title: 'Email Address',
    dataIndex: 'email_address',
    key: 'email_address',
    colSpan: 1,
    width: 200,
  },
  {
    title: 'Designation',
    dataIndex: 'designation',
    key: 'designation',
    colSpan: 1,
    width: 100,
  },
  {
    title: 'Billable Hours',
    dataIndex: 'billable_hours',
    key: 'billable_hours',
    colSpan: 1,
    width: 150,
  },

  {
    title: 'Action',
    key: 'action',
    colSpan: 1,
    width: 150,
    render: (_, record) => (
      <Space size='middle'>
        <p>view</p>
        <p>edit</p>
        <p>delete</p>
      </Space>
    ),
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
  return (
    <Table
      columns={columns}
      dataSource={employeeFormattedData}
      pagination={{ position: ['bottomRight'] }}
      className='table'
    />
  );
}
