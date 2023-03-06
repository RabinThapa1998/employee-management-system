import { Input, InputProps, theme } from 'antd';

interface BillableHourFieldProps extends InputProps {
  bgColor: string;
  color: string;
}
export function BillableHourField({ color, bgColor, ...rest }: BillableHourFieldProps) {
  return (
    <div className='billableHrs-container'>
      <Input className='billableHrs-container__input' type='number' {...rest} />
      <div className='billableHrs-container__hrs' style={{ background: bgColor, color: color }}>
        Hours
      </div>
    </div>
  );
}
