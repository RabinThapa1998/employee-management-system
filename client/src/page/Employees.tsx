import { EmployeesTable } from '~/components';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
export function Employees() {
  return (
    <div>
      <Link to='/add-employee'>
        <Button>Add Employee</Button>
      </Link>
      <EmployeesTable />
    </div>
  );
}
