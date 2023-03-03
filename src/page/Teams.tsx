import { icons } from '~/assets';
import { Link } from 'react-router-dom';
function OverviewCard() {
  return (
    <div
      className='h-[88px] w-[304px] bg-brand-primary rounded-primary
     px-5 flex flex-row items-center justify-between'
    >
      <div className='flex flex-col text-white'>
        <p>Teams</p>
        <p>23</p>
      </div>
      <div
        className='h-[42px] w-[42px] flex flex-row items-center justify-center rounded-primary
       bg-[#FFFFFF33]'
      >
        {<icons.teams />}
      </div>
    </div>
  );
}

export function Teams() {
  return (
    <div className=''>
      <h1>Manage Users</h1>
      <div className='flex flex-row gap-5'>
        <OverviewCard />
        <OverviewCard />
      </div>
      <div className='bg-white rounded-primary pt-[15px] mt-5'>
        <div className='flex flex-row gap-5 h-[58px]'>
          <Link
            to={'/'}
            className='bg-[#F1F1F1] flex flex-row items-center justify-center px-5 rounded-t-primary'
          >
            <h3>Teams</h3>
          </Link>
          <Link to={'/employees'}>
            <h3>Employees</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}
