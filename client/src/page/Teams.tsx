import { PlusOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Row, theme, Col, Space } from 'antd';
import { Link } from 'react-router-dom';
import { TeamsTable } from '~/components';

export function Teams() {
  const { token } = theme.useToken();

  return (
    <Row>
      <Col span={24}>
        <TeamsTable />
      </Col>
    </Row>
  );
}
