import { icons } from '~/assets';

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
      <div className='bg-white rounded-primary'></div>
    </div>
  );
}
