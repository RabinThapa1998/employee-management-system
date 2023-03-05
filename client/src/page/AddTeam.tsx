import { Typography } from 'antd';
import { BreadCrumbComponent } from '~/common';
import { AddTeamTable } from '~/components';
import { IBreadCrumbs } from '~/types';

export function AddTeam() {
  const crumbs: IBreadCrumbs = [
    {
      title: 'Manage Users',
      link: '/',
    },
    {
      title: 'Teams',
      link: '/Teams',
    },
    {
      title: 'Add Team',
      link: '/add-Team',
    },
  ];
  return (
    <div>
      <div style={{ margin: '10px 0' }}>
        <BreadCrumbComponent crumbs={crumbs} />
        <Typography.Title level={1} style={{ fontWeight: 800 }}>
          Add Team
        </Typography.Title>
      </div>
      <AddTeamTable />
    </div>
  );
}
