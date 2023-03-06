import { Col, Divider, Row, Typography, RowProps } from 'antd';
import React from 'react';
import { DividerComponent } from '~/common';

interface ITableSectionWrapper extends RowProps {
  title: string;
  children: React.ReactNode;
  withDivider?: boolean;
}
export function TableSectionWrapper({
  title,
  children,
  withDivider = true,
  ...rest
}: ITableSectionWrapper) {
  return (
    <Row gutter={80}>
      <Col span={4}>
        <Row justify={'end'}>
          <Typography.Title
            className='self-start'
            level={3}
            style={{ fontWeight: 800, textAlign: 'end' }}
          >
            {title}
          </Typography.Title>
        </Row>
      </Col>
      <Col span={20}>
        <Row gutter={16} {...rest}>
          {children}
        </Row>
        {withDivider && (
          <Row>
            <Col span={24}>
              <DividerComponent />
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
}
