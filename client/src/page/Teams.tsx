import { Button } from 'antd';
import { Link } from 'react-router-dom';

export function Teams() {
  return (
    <div>
      <Link to='/add-team'>
        <Button>Add Team</Button>
      </Link>
    </div>
  );
}
