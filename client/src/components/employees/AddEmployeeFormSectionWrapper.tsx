import React from 'react';
import './style.css';
export function AddEmployeeFormSectionWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className='add-employee-form mt-[50px]'>
      <div className='add-employee-form__left '>
        <h2 className='self-start'>{title}</h2>
      </div>

      <div className='add-employee-form__right flex flex-row gap-x-[30px] flex-wrap '>
        {children}
      </div>
    </div>
  );
}
