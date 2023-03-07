import React, { useMemo } from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IEmployeeResponse, IEmployeeSummary } from '~/types';
import { employeeSelector, useAppSelector } from '~/global-states';
import { Icons } from '~/assets';
import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '~/config';

const columns: ColumnsType<IEmployeeSummary> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 100,
    align: 'center',
  },
  {
    title: 'Full Name',
    dataIndex: 'full_name',
    key: 'full_name',

    width: 200,
  },
  {
    title: 'Current Team',
    dataIndex: 'current_team',
    key: 'current_team',

    width: 150,
  },
  {
    title: 'Mobile Number',
    dataIndex: 'mobile_number',
    key: 'mobile_number',

    width: 150,
  },
  {
    title: 'Email Address',
    dataIndex: 'email_address',
    key: 'email_address',

    width: 200,
  },
  {
    title: 'Designation',
    dataIndex: 'designation',
    key: 'designation',

    width: 100,
  },
  {
    title: 'Billable Hours',
    dataIndex: 'billable_hours',
    key: 'billable_hrs',

    width: 150,
  },

  {
    title: 'Action',
    key: 'action',

    width: 150,
    render: (_, record) => (
      <Space size='middle'>
        <button className='visibility'>
          <Icons.Visibility />
        </button>
        <button className='edit'>
          <Icons.Edit />
        </button>
        <button className='delete'>
          <Icons.Delete />
        </button>
      </Space>
    ),
  },
];

export function EmployeesTable() {
  // const employeeList = useAppSelector(employeeSelector);

  const { data: employeeList, isLoading } = useQuery(['employeeTable'], () =>
    fetch(new URL('employee', API_BASE_URL)).then(
      (res) => res.json() as Promise<IEmployeeResponse>,
    ),
  );
  console.log('🚀 ~ file: EmployeesTable.tsx:88 ~ EmployeesTable ~ data:', employeeList);

  const employeeFormattedData = useMemo(() => {
    const temp = employeeList?.data.map((item, idx) => {
      return {
        id: idx + 1,
        full_name: item.name + ' ' + item.middle_name + ' ' + item.surname,
        current_team: item.team.length ? item.team.map((i) => i) : 'Available',
        mobile_number: item.phone_number,
        email_address: item.email,
        designation: item.job_position,
        billable_hrs: `${item.billable_hrs} hours/week`,
      };
    });
    return temp;
  }, [employeeList]);

  return (
    <Table
      columns={columns}
      loading={isLoading}
      dataSource={employeeFormattedData}
      pagination={{ position: ['bottomRight'] }}
      className='table'
    />
  );
}
