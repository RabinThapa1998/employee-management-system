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
import { DividerComponent } from '~/common';
import { EditOutlined, UserOutlined } from '@ant-design/icons';

const Card = ({ title, desc, token }: { title: string; desc: string; token: any }) => (
  <Col span={12}>
    <Typography.Title level={4} style={{ color: token.colorTextDisabled, marginBottom: '6px' }}>
      {title}
    </Typography.Title>
    <Typography.Text>{desc}</Typography.Text>
  </Col>
);
export function EmployeesTable() {
  const [open, setOpen] = useState(false);
  const { token } = theme.useToken();

  const openEmployeeDrawer = () => {
    setOpen(true);
  };

  const closeEmployeeDrawer = () => {
    setOpen(false);
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
          <button className='visibility' onClick={openEmployeeDrawer}>
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
        email_address: item.email,
        designation: item.job_position,
        billable_hrs: `${item.billable_hrs} hours/week`,
        employee_id: item.id,
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
        <Row>
          <Col span={24}>
            <Avatar size={120} icon={<UserOutlined />} />
            <Typography.Title style={{ paddingTop: '30px' }}>Chadwick</Typography.Title>
            <Typography.Text style={{ color: token.colorTextDisabled }}>
              Chadwick@gmail.com
            </Typography.Text>
            <div
              style={{
                backgroundColor: token.colorPrimary,
                width: '98px',
                height: '32px',
                color: 'white',
                borderRadius: '20px',
                display: 'grid',
                placeItems: 'center',
                marginTop: '10px',
              }}
            >
              <Typography.Title level={4} style={{ color: 'white' }}>
                Employee
              </Typography.Title>
            </div>
          </Col>
          <DividerComponent />
          <Col span={24}>
            <Row>
              <Card title='Designation' desc='Fabricator' token={token} />
              <Card title='Contact' desc='Fabricator' token={token} />
            </Row>
            <Row style={{ marginTop: '20px' }}>
              <Card title='Address' desc='Address' token={token} />
            </Row>
          </Col>
          <DividerComponent />
          <Col span={24}>
            <Row>
              <Card title='Start Date' desc='Fabricator' token={token} />
              <Card title='Role' desc='Fabricator' token={token} />
            </Row>
            <Row style={{ marginTop: '20px' }}>
              <Card title='Billable Status' desc='Address' token={token} />
              <Card title='Billable Hours' desc='Address' token={token} />
            </Row>
          </Col>
          <Col span={24}>
            <ConfigProvider
              theme={{
                token: { colorPrimary: token.colorWarning },
              }}
            >
              <Button
                icon={<EditOutlined />}
                type='primary'
                style={{ width: '100%', marginTop: '30px' }}
              >
                Edit Profile
              </Button>
            </ConfigProvider>
          </Col>
        </Row>
      </Drawer>
    </>
  );
}
