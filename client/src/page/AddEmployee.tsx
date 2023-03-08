import { Typography } from 'antd';
import { BreadCrumbComponent } from '~/common';
import { AddEmployeeForm } from '~/components';
import { IBreadCrumbs } from '~/types';

export function AddEmployee() {
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
      link: '/add-employee',
    },
  ];
  return (
    <div>
      <div style={{ margin: '10px 0' }}>
        <BreadCrumbComponent crumbs={crumbs} />
        <Typography.Title level={1} style={{ fontWeight: 800 }}>
          Add Employee
        </Typography.Title>
      </div>
      <AddEmployeeForm />
    </div>
  );
}
