import { icons } from '~/assets';

export function Teams() {
  return (
    <div className=''>
      <h1>Manage Users</h1>
      <div className='flex'>
        <div className='h-[88px] w-[304px] bg-brand-primary rounded-[5px] px-5 flex flex-row items-center justify-between'>
          <div className='flex flex-col text-white'>
            <p>Teams</p>
            <p>23</p>
          </div>
          <div className='h-[42px] w-[42px] flex flex-row items-center justify-center rounded-[5px] bg-[#FFFFFF33]'>
            {<icons.teams />}
          </div>
        </div>
      </div>
    </div>
  );
}
