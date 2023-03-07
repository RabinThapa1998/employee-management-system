import React, { useMemo } from 'react';
import { message, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ITeamResponse, ITeamTable } from '~/types';
import { Icons } from '~/assets';
import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '~/config';
import QRCode from 'react-qr-code';

export function TeamsTable() {
  const [messageApi, contextHolder] = message.useMessage();

  const { data: teamList, isLoading } = useQuery(['get-team'], () =>
    fetch(new URL('team', API_BASE_URL)).then((res) => res.json() as Promise<ITeamResponse>),
  );
  const handleTeamDelete = (id: string) => {
    fetch(new URL(`team/${id}`, API_BASE_URL), {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 'success') {
          message.success('Team deleted successfully');
        } else {
          message.error('Something went wrong');
        }
      });
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
          <button className='delete' onClick={() => handleTeamDelete(_.id)}>
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
    </>
  );
}
