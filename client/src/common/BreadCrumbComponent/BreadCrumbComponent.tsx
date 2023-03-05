import { RightOutlined } from '@ant-design/icons';
import { Breadcrumb, ConfigProvider, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { IBreadCrumbs } from '~/types';

export function BreadCrumbComponent({ crumbs }: { crumbs: IBreadCrumbs }) {
  return (
    <Breadcrumb separator={<RightOutlined size={12} />}>
      {crumbs.map((c) => (
        <Breadcrumb.Item key={c.title}>
          <Link to={c.link}>{c.title}</Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}
