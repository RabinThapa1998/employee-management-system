import { EmployeesTable } from '~/components';
import { Link } from 'react-router-dom';
import { Button, Col, ConfigProvider, Row, Space, theme } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export function Employees() {
  const { token } = theme.useToken();

  return (
    <Row
      style={{
        padding: '30px',
      }}
    >
      <Space
        direction='horizontal'
        size='middle'
        style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
      >
        <div>search</div>
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
      <Col span={24}>
        <EmployeesTable />
      </Col>
    </Row>
  );
}
