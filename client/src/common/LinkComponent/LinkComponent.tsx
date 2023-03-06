import { Typography } from 'antd';
import { NavLink } from 'react-router-dom';
import './style.css';

export function LinkComponent({ title, link }: { title: string; link: string }) {
  return (
    <NavLink
      to={link}
      className={({ isActive }) => {
        return `link-component ${isActive ? 'link-component-active' : ''}`;
      }}
    >
      <Typography.Title level={2} style={{ color: 'inherit' }}>
        {title}
      </Typography.Title>
    </NavLink>
  );
}
