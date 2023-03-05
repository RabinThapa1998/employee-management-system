import React from 'react';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Divider,
  theme,
  Select,
  DatePicker,
  TimePicker,
  Typography,
  Row,
  Col,
  Space,
  ConfigProvider,
} from 'antd';
import { AddEmployeeFormSectionWrapper } from '../employees/AddEmployeeFormSectionWrapper';
import { add, useAppDispatch } from '~/global-states';
import { Icons } from '~/assets';
import { CloudUploadOutlined } from '@ant-design/icons';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
type option = {
  value: string;
  label: string;
}[];
interface IForm {
  name: string;
  label: string;
  placeholder?: string;
  options?: option;
  type: 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'time';
}

const basicInformation: IForm[] = [
  {
    name: 'team_name',
    label: 'Team Name',
    placeholder: 'Enter Team Name',
    type: 'text',
  },
  {
    name: 'team_password',
    label: 'Team Password',
    placeholder: 'Enter Team Password',
    type: 'text',
  },
];

const { useToken } = theme;
export function AddTeamTable() {
  const dispatch = useAppDispatch();
  const onFinish = (values: any) => {
    dispatch(add(values));
  };

  const { token } = useToken();
  return (
    // <div className='rounded-primary bg-white px-[60px] py-[30px]'>
    <Row style={{ background: 'white', padding: '30px 60px', borderRadius: '5px' }}>
      <Col span={24}>
        <Form
          name='basic'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          layout='vertical'
          wrapperCol={{ span: 24 }}
        >
          <AddEmployeeFormSectionWrapper title='Basic Information'>
            {basicInformation.map((item) => (
              <Col key={item.name} span={8}>
                <Form.Item
                  label={item.label}
                  name={item.name}
                  rules={[{ required: true, message: 'required' }]}
                >
                  <Input placeholder={item.placeholder} />
                </Form.Item>
              </Col>
            ))}
          </AddEmployeeFormSectionWrapper>
          <Divider />

          <Form.Item>
            <ConfigProvider
              theme={{
                token: { colorPrimary: token.colorWarning },
              }}
            >
              <Button type='primary' htmlType='submit' size='middle'>
                Save
              </Button>
            </ConfigProvider>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
