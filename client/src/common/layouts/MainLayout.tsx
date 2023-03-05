import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { icons } from '~/assets';
import { Link } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
function OverviewCard() {
  return (
    <div
      className='h-[88px] w-[304px] bg-brand-primary rounded-primary
     px-5 flex flex-row items-center justify-between'
    >
      <div className='flex flex-col text-white'>
        <p>Teams</p>
        <p>23</p>
      </div>
      <div
        className='h-[42px] w-[42px] flex flex-row items-center justify-center rounded-primary
       bg-[#FFFFFF33]'
      >
        {<icons.teams />}
      </div>
    </div>
  );
}

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className='layout-container'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo' />
        <Menu
          className='layout-container__menu'
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout className='site-layout'>
        <Header style={{ padding: 0, background: '#fff' }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content style={{ padding: '0 26px' }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
