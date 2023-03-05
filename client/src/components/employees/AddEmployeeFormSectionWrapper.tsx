import { Col, Divider, Row, Typography } from 'antd';
import React from 'react';
export function AddEmployeeFormSectionWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Row>
      <Col span={4}>
        <Typography.Title className='self-start' level={3} style={{ fontWeight: 800 }}>
          {title}
        </Typography.Title>
      </Col>
      <Col span={20}>
        <Row gutter={16}>{children}</Row>
        <Row>
          <Col span={24}>
            <Divider style={{ borderBlockStart: '2px solid #C3C1BF' }} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
