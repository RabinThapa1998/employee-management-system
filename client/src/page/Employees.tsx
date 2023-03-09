import { EmployeesTable } from '~/components';
import { Link } from 'react-router-dom';
import { Button, Col, ConfigProvider, Row, Space, theme } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export function Employees() {
  const { token } = theme.useToken();

  return (
    <Row>
      <Col span={24}>
        <EmployeesTable />
      </Col>
    </Row>
  );
}
