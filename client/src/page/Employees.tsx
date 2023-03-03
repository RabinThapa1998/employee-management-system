import { EmployeesTable } from '~/components';
import { Link } from 'react-router-dom';
export function Employees() {
  return (
    <div>
      <Link to='/add-employee'>
        <button>Add Employee</button>
      </Link>
      <EmployeesTable />
    </div>
  );
}
