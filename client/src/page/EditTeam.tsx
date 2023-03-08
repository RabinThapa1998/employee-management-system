import { Typography } from 'antd';
import { BreadCrumbComponent } from '~/common';
import { EditTeamForm } from '~/components';
import { IBreadCrumbs } from '~/types';

export function EditTeam() {
  const crumbs: IBreadCrumbs = [
    {
      title: 'Manage Users',
      link: '/',
    },
    {
      title: 'Teams',
      link: '/',
    },
    {
      title: 'Edit Team',
      link: '/:id',
    },
  ];
  return (
    <div>
      <div style={{ margin: '10px 0' }}>
        <BreadCrumbComponent crumbs={crumbs} />
        <Typography.Title level={1} style={{ fontWeight: 800 }}>
          Edit Team
        </Typography.Title>
      </div>
      <EditTeamForm />
    </div>
  );
}
