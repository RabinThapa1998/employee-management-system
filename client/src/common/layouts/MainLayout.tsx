import React, { useState } from 'react';
import {
  ArrowLeftOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Icons } from '~/assets';
import { Link, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

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
        />
      </Sider>
      <Layout className='site-layout'>
        <Header className='header'>
          <button className='go-back-arrow' onClick={() => navigate(-1)}>
            <ArrowLeftOutlined />
          </button>
        </Header>
        <Content style={{ padding: '0 26px', background: colorBgContainer }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
