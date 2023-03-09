import React, { useEffect, useMemo, useState } from 'react';
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
  Modal,
  message,
  Input,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IEmployeeResponse, IEmployeeSummary } from '~/types';
import { Icons } from '~/assets';
import { useMutation, useQuery } from '@tanstack/react-query';
import { EmployeeDrawerComponent } from './EmployeeDrawerComponent';
import { Link, useNavigate } from 'react-router-dom';
import { request } from '~/utils';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

export function EmployeesTable() {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteEmployeeState, setDeleteEmployeeState] = useState<any>({});
  const [employeeDrawer, setEmployeeDrawer] = useState<any>({});
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const [messageApi, contextHolder] = message.useMessage();
  const {
    data: employeeList,
    isLoading,
    refetch,
  } = useQuery(
    ['get-employee'],
    () => request.get('employee').then((res) => res.data) as Promise<IEmployeeResponse>,
  );
  const { mutate: deleteMutate, isLoading: isDeleteLoading } = useMutation(
    (id: string) => request.delete(`employee/${id}`),
    {
      onSuccess: (res) => {
        message.success('Employee deleted successfully');
      },
      onError: (error: any) => {
        messageApi.open({
          type: 'error',
          content: error?.response?.data?.errors[0]?.message || 'Something went wrong Try again!',
        });
      },
      onSettled: () => {
        onDeleteModalClose();
        refetch();
      },
    },
  );

  const onDeleteModalOpen = (id: string, fullName: string) => {
    setOpenDeleteModal(true);
    setDeleteEmployeeState({ id, fullName });
  };
  const onDeleteModalClose = () => {
    setOpenDeleteModal(false);
  };
  const handleDelete = () => {
    deleteMutate(deleteEmployeeState.id);
  };
  const handleCancel = () => {
    console.log('Cancel');
    onDeleteModalClose();
  };

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
          <button className='delete' onClick={() => onDeleteModalOpen(_.employee_id, _.full_name)}>
            <Icons.Delete />
          </button>
        </Space>
      ),
    },
  ];

  const employeeFormattedData = useMemo(() => {
    const temp = employeeList?.data.map((item, idx) => {
      return {
        id: idx + 1,
        full_name: item.name + ' ' + item.middle_name + ' ' + item.surname,
        current_team: item.team.length ? item.team.map((i) => i.name)[0] : 'Available',
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
  const [employee, setEmployee] = useState(employeeFormattedData);
  useEffect(() => {
    setEmployee(employeeFormattedData);
  }, [employeeFormattedData]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value && employeeFormattedData?.length) {
      const fullNameFilter = employeeFormattedData?.filter((item) =>
        item.full_name.toLowerCase().includes(e.target.value.toLowerCase()),
      );
      const currentTeamFilter = employeeFormattedData?.filter((item) =>
        item.current_team.toLowerCase().includes(e.target.value.toLowerCase()),
      );
      const mobileFilter = employeeFormattedData?.filter((item) =>
        item.mobile_number.toLowerCase().includes(e.target.value.toLowerCase()),
      );
      const emailFilter = employeeFormattedData?.filter((item) =>
        item.email.toLowerCase().includes(e.target.value.toLowerCase()),
      );
      const designationFilter = employeeFormattedData?.filter((item) =>
        item.designation.toLowerCase().includes(e.target.value.toLowerCase()),
      );
      const billableHrsFilter = employeeFormattedData?.filter((item) =>
        item.billable_hrs.toLowerCase().includes(e.target.value.toLowerCase()),
      );
      const filtered = [
        ...new Set([
          ...fullNameFilter,
          ...currentTeamFilter,
          ...mobileFilter,
          ...emailFilter,
          ...designationFilter,
          ...billableHrsFilter,
        ]),
      ];
      console.log('🚀 ~ file: EmployeesTable.tsx:213 ~ handleSearch ~ filtered:', filtered);
      setEmployee(filtered);
    } else {
      setEmployee(employeeFormattedData);
    }
  };
  return (
    <>
      {contextHolder}
      <Space
        direction='horizontal'
        size='middle'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          padding: '30px 20px',
        }}
      >
        <Input placeholder='Search' onChange={handleSearch} prefix={<SearchOutlined />} />

        <Link to='/add-employee'>
          <ConfigProvider
            theme={{
              token: { colorPrimary: token.colorWarning },
            }}
          >
            <Button type='primary' icon={<PlusOutlined />}>
              Add Employee
            </Button>
          </ConfigProvider>
        </Link>
      </Space>

      <Table
        columns={columns}
        loading={isLoading}
        dataSource={employee}
        pagination={{ position: ['bottomRight'] }}
        className='table'
      />
      <Modal
        title={<Typography.Title level={1}>Delete Employee</Typography.Title>}
        open={openDeleteModal}
        onOk={handleDelete}
        onCancel={handleCancel}
        footer={
          <Row justify='start'>
            <Col>
              <Space>
                <Button type='primary' onClick={handleDelete} danger>
                  Delete
                </Button>
                <Button onClick={handleCancel} type='primary'>
                  Cancel
                </Button>
              </Space>
            </Col>
          </Row>
        }
      >
        <Typography.Paragraph style={{ margin: '30px 0' }}>
          Are you sure you want to delete
          <Typography.Text style={{ fontWeight: 800 }}>
            {' '}
            {deleteEmployeeState?.fullName}{' '}
          </Typography.Text>
          from the list?
        </Typography.Paragraph>
      </Modal>

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
