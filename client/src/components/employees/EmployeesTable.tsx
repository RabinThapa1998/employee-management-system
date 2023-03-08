import React, { useMemo, useState } from 'react';
import {
  Col,
  Drawer,
  Row,
  Space,
  Table,
  Typography,
  theme,
  Button,
  ConfigProvider,
  Avatar,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IEmployeeResponse, IEmployeeSummary } from '~/types';
import { employeeSelector, useAppSelector } from '~/global-states';
import { Icons } from '~/assets';
import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '~/config';
import { EmployeeDrawerComponent } from './EmployeeDrawerComponent';
import { useNavigate } from 'react-router-dom';

export function EmployeesTable() {
  const [open, setOpen] = useState(false);
  const [employeeDrawer, setEmployeeDrawer] = useState<any>({});
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const openEmployeeDrawer = (data: any) => {
    setOpen(true);
    setEmployeeDrawer(data);
  };

  const closeEmployeeDrawer = () => {
    setOpen(false);
  };
  const handleEdit = (id: string) => {
    navigate(id);
  };
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
      dataIndex: 'email',
      key: 'email',

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
      dataIndex: 'billable_hrs',
      key: 'billable_hrs',

      width: 150,
    },

    {
      title: 'Action',
      key: 'action',

      width: 150,
      render: (_, record) => (
        <Space size='middle'>
          <button className='visibility' onClick={() => openEmployeeDrawer(_)}>
            <Icons.Visibility />
          </button>
          <button className='edit' onClick={() => handleEdit(_.employee_id)}>
            <Icons.Edit />
          </button>
          <button className='delete'>
            <Icons.Delete />
          </button>
        </Space>
      ),
    },
  ];
  const { data: employeeList, isLoading } = useQuery(['get-employee'], () =>
    fetch(new URL('employee', API_BASE_URL)).then(
      (res) => res.json() as Promise<IEmployeeResponse>,
    ),
  );

  const employeeFormattedData = useMemo(() => {
    const temp = employeeList?.data.map((item, idx) => {
      return {
        id: idx + 1,
        full_name: item.name + ' ' + item.middle_name + ' ' + item.surname,
        current_team: item.team.length ? item.team.map((i) => i.name) : 'Available',
        mobile_number: item.phone_number,
        email: item.email,
        designation: item.job_position,
        billable_hrs: `${item.billable_hrs} hours/week`,
        employee_id: item.id,
        billable_status: item.is_billable,
        start_date: item.starts_at,
        address: item.address,
      };
    });
    return temp;
  }, [employeeList]);

  return (
    <>
      <Table
        columns={columns}
        loading={isLoading}
        dataSource={employeeFormattedData}
        pagination={{ position: ['bottomRight'] }}
        className='table'
      />
      <Drawer
        title={<Typography.Title>Employee Information</Typography.Title>}
        placement='right'
        onClose={closeEmployeeDrawer}
        open={open}
        width={500}
      >
        <EmployeeDrawerComponent
          fullName={employeeDrawer?.full_name}
          email={employeeDrawer?.email}
          contact={employeeDrawer?.mobile_number}
          address={employeeDrawer?.address}
          designation={employeeDrawer?.designation}
          billableHours={employeeDrawer?.billable_hrs}
          billableStatus={employeeDrawer?.billable_status}
          startDate={employeeDrawer?.start_date}
          token={token}
          id={employeeDrawer?.employee_id}
        />
      </Drawer>
    </>
  );
}
