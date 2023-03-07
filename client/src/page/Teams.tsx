import { PlusOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Row, theme, Col, Space } from 'antd';
import { Link } from 'react-router-dom';
import { TeamsTable } from '~/components';

export function Teams() {
  const { token } = theme.useToken();

  return (
    <Row>
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
        <div>search</div>
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
      <Col span={24}>
        <TeamsTable />
      </Col>
    </Row>
  );
}
