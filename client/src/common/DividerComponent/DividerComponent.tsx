import { Divider, DividerProps, theme } from 'antd';
import { useToken } from 'antd/es/theme/internal';

export function DividerComponent({ ...props }: DividerProps) {
  const {
    token: { colorBorder },
  } = theme.useToken();

  return <Divider style={{ borderBlockStart: `2px solid ${colorBorder}` }} {...props} />;
}
