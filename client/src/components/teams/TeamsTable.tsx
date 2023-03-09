import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Col,
  ConfigProvider,
  Input,
  message,
  Modal,
  Popover,
  Row,
  Slider,
  Space,
  Table,
  Tag,
  theme,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ITeamResponse, ITeamTable, Member } from '~/types';
import { Icons } from '~/assets';
import { useMutation, useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '~/config';
import QRCode from 'react-qr-code';
import { request } from '~/utils';
import { Link, useNavigate } from 'react-router-dom';
import { FilterFilled, PlusOutlined, SearchOutlined } from '@ant-design/icons';

export function TeamsTable() {
  const [messageApi, contextHolder] = message.useMessage();
  const { token } = theme.useToken();
  const [deleteTeamState, setDeleteTeamState] = useState<any>({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [manHourFilterVal, setManHourFilterVal] = useState(0);

  const navigate = useNavigate();
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
  const handleEdit = (id: string) => {
    navigate(id);
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
          <button className='edit' onClick={() => handleEdit('teams/' + _.id)}>
            <Icons.Edit />
          </button>
          <button className='delete' onClick={() => onDeleteModalOpen(_.id, _.team_name)}>
            <Icons.Delete />
          </button>
        </Space>
      ),
    },
  ];
  const memberStringFormatter = (members: Member[]) => {
    const temp = members.filter((item, idx) => idx < 15);
    const temp2 = temp.map((item) => item.name).join(',');
    const remaining = members.length - 15;
    if (remaining <= 0) {
      return temp2;
    }
    return temp2 + ' &' + (members.length - 15).toString() + ' more';
  };
  const teamFormattedData = useMemo(() => {
    const temp = teamList?.data.map((item, idx) => {
      const qrValue = 'team' + '=' + item.name + ' ' + 'password' + '=' + item.password;
      return {
        id: item.id,
        team_name: item.name,
        members: memberStringFormatter(item.members),
        mobile_qr_details: <QRCode value={qrValue} className='qr-code-small' />,
        total_man_hours: item.billable_hrs.toString(),
      };
    });
    return temp;
  }, [teamList]);
  const [team, setTeam] = useState(teamFormattedData);

  useEffect(() => {
    setTeam(teamFormattedData);
  }, [teamFormattedData]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value && teamFormattedData?.length) {
      const teamNameFilter = teamFormattedData?.filter((item) =>
        item.team_name.toLowerCase().includes(e.target.value.toLowerCase()),
      );
      const totalManHrsFilter = teamFormattedData?.filter((item) =>
        item.total_man_hours.toLowerCase().includes(e.target.value.toLowerCase()),
      );
      const membersFilter = teamFormattedData?.filter((item) =>
        item.members.toLowerCase().includes(e.target.value.toLowerCase()),
      );
      const filtered = [...new Set([...teamNameFilter, ...totalManHrsFilter, ...membersFilter])];
      setTeam(filtered);
    } else {
      setTeam(teamFormattedData);
    }
  };
  const handleManHourFilterChange = (val: number) => {
    setManHourFilterVal(val);
  };
  const handleManHourFilter = () => {
    const totalManHrsFilter = teamFormattedData?.filter(
      (item) => Number(item.total_man_hours) < manHourFilterVal,
    );

    setTeam(totalManHrsFilter);
    setOpenPopover(false);
  };
  const handleManHourFilterReset = () => {
    setManHourFilterVal(0);
    setTeam(teamFormattedData);
    setOpenPopover(false);
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
        <Space>
          <Input placeholder='Search' onChange={handleSearch} prefix={<SearchOutlined />} />
          <Popover
            placement='bottomLeft'
            title={'Filter'}
            open={openPopover}
            content={
              <div
                style={{
                  width: '400px',
                  padding: '15px 10px',
                }}
              >
                <Typography.Text>Choose man hour range</Typography.Text>
                <Slider
                  tooltip={{ open: true }}
                  defaultValue={8000}
                  min={5000}
                  max={20000}
                  marks={{
                    5000: '5000 Hours',
                    8000: '8000 Hours',
                    20000: '20000 Hours',
                  }}
                  onChange={handleManHourFilterChange}
                />
                <ConfigProvider
                  theme={{
                    token: { colorPrimary: token.colorWarning },
                  }}
                >
                  <Button type='primary' onClick={handleManHourFilter}>
                    Apply
                  </Button>
                </ConfigProvider>

                <Button type='text' danger onClick={handleManHourFilterReset}>
                  Clear Filter
                </Button>
              </div>
            }
            trigger='click'
          >
            <Button icon={<FilterFilled />} onClick={() => setOpenPopover(!openPopover)}>
              Filter
            </Button>
          </Popover>
        </Space>

        <Link to='/add-team'>
          <ConfigProvider
            theme={{
              token: { colorPrimary: token.colorWarning },
            }}
          >
            <Button type='primary' icon={<PlusOutlined />}>
              Add Team
            </Button>
          </ConfigProvider>
        </Link>
      </Space>

      <Table
        columns={columns}
        loading={isLoading}
        dataSource={team}
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
