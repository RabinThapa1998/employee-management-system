import React, { useMemo, useState } from 'react';
import { Button, Col, message, Modal, Row, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ITeamResponse, ITeamTable } from '~/types';
import { Icons } from '~/assets';
import { useMutation, useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '~/config';
import QRCode from 'react-qr-code';
import { request } from '~/utils';

export function TeamsTable() {
  const [messageApi, contextHolder] = message.useMessage();
  const [deleteTeamState, setDeleteTeamState] = useState<any>({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const {
    data: teamList,
    isLoading,
    refetch,
  } = useQuery(
    ['get-team'],
    () => request.get('team').then((res) => res.data) as Promise<ITeamResponse>,
  );

  const { mutate: deleteMutate, isLoading: isDeleteLoading } = useMutation(
    (id: string) => {
      return request.delete(`team/${id}`);
    },
    {
      onSuccess: (res) => {
        message.success('Team deleted successfully');
      },
      onError: (err) => {
        message.error('Something went wrong');
      },
      onSettled: () => {
        onDeleteModalClose();
        refetch();
      },
    },
  );

  const onDeleteModalOpen = (id: string, TeamName: string) => {
    setOpenDeleteModal(true);
    setDeleteTeamState({ id, TeamName });
  };
  const onDeleteModalClose = () => {
    setOpenDeleteModal(false);
  };
  const handleDelete = () => {
    deleteMutate(deleteTeamState.id);
  };
  const handleCancel = () => {
    onDeleteModalClose();
  };
  const columns: ColumnsType<any> = [
    {
      title: 'Team Name',
      dataIndex: 'team_name',
      key: 'team_name',
      width: 200,
      render: (text, record) => (
        <div
          style={{
            paddingLeft: '30px',
          }}
        >
          {record.team_name}
        </div>
      ),
      onHeaderCell: () => {
        return {
          style: {
            paddingLeft: '30px',
          },
        };
      },
    },
    {
      title: 'Members',
      dataIndex: 'members',
      key: 'members',

      width: 150,
    },
    {
      title: 'QR Details',
      dataIndex: 'mobile_qr_details',
      key: 'mobile_qr_details',
      width: 150,
      align: 'center',
    },
    {
      title: 'Total Man Hours',
      dataIndex: 'total_man_hours',
      key: 'total_man_hours',

      width: 200,
    },
    {
      title: 'Action',
      key: 'action',

      width: 150,
      render: (_, record) => (
        <Space size='middle'>
          <button className='edit'>
            <Icons.Edit />
          </button>
          <button className='delete' onClick={() => onDeleteModalOpen(_.id, _.team_name)}>
            <Icons.Delete />
          </button>
        </Space>
      ),
    },
  ];

  const teamFormattedData = useMemo(() => {
    const temp = teamList?.data.map((item, idx) => {
      const qrValue = 'team' + '=' + item.name + ' ' + 'password' + '=' + item.password;
      return {
        id: item.id,
        team_name: item.name,
        members: item.members.map((i) => i.name).join(', '),
        mobile_qr_details: <QRCode value={qrValue} className='qr-code-small' />,
        total_man_hours: item.billable_hrs.toString(),
      };
    });
    return temp;
  }, [teamList]);

  return (
    <>
      {contextHolder}

      <Table
        columns={columns}
        loading={isLoading}
        dataSource={teamFormattedData}
        pagination={{ position: ['bottomRight'] }}
        className='table'
      />
      <Modal
        title={<Typography.Title level={1}>Delete Team</Typography.Title>}
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
            {deleteTeamState?.TeamName}{' '}
          </Typography.Text>
          from the list?
        </Typography.Paragraph>
      </Modal>
    </>
  );
}
