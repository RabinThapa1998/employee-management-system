import { Typography } from 'antd';
import { BreadCrumbComponent } from '~/common';
import { EditEmployeeForm } from '~/components';
import { IBreadCrumbs } from '~/types';

export function EditEmployee() {
  const crumbs: IBreadCrumbs = [
    {
      title: 'Manage Users',
      link: '/employees',
    },
    {
      title: 'Employee',
      link: '/employees',
    },
    {
      title: 'Add Employee',
      link: '/:id',
    },
  ];
  return (
    <div>
      <div style={{ margin: '10px 0' }}>
        <BreadCrumbComponent crumbs={crumbs} />
        <Typography.Title level={1} style={{ fontWeight: 800 }}>
          Edit Employee
        </Typography.Title>
      </div>
      <EditEmployeeForm />
    </div>
  );
}
