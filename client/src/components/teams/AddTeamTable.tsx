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
import { TableSectionWrapper } from '../employees/TableSectionWrapper';
import { add, useAppDispatch } from '~/global-states';
import { Icons } from '~/assets';
import { CloudUploadOutlined, DownloadOutlined, PrinterFilled } from '@ant-design/icons';
import QRCode from 'react-qr-code';
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
          <TableSectionWrapper title='Basic Information'>
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
          </TableSectionWrapper>

          <TableSectionWrapper title='Members'>
            <Col span={10}>
              <Form.Item
                label={'Team Members'}
                name={'team_members'}
                rules={[{ required: true, message: 'required' }]}
              >
                <Select
                  placeholder={'Select Employees'}
                  options={[
                    {
                      value: '1',
                      label: '1',
                    },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Row>
                <Col span={8}>
                  <Form.Item
                    label={'Billable Hours'}
                    name={'billable_hours'}
                    rules={[{ required: true, message: 'required' }]}
                  >
                    <Input placeholder={'Enter Billable Hours'} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </TableSectionWrapper>
          <TableSectionWrapper title='Team QR' align={'middle'} gutter={16} withDivider={false}>
            <Col span={4}>
              <QRCode
                value='hey'
                style={{
                  width: '100%',
                  height: '100%',
                  border: '1px solid #C3C1BF',
                  padding: '2px',
                  borderRadius: '5px',
                  maxHeight: '118px',
                  maxWidth: '118px',
                }}
              />
            </Col>
            <Col span={4}>
              <ConfigProvider
                theme={{
                  token: { colorBorder: token.colorPrimary, colorText: token.colorPrimary },
                }}
              >
                <Button icon={<PrinterFilled />} style={{ width: '135px' }}>
                  Print
                </Button>
              </ConfigProvider>
              <div style={{ height: '15px' }}></div>
              <ConfigProvider
                theme={{
                  token: {
                    colorBorder: token.colorSuccess,
                    colorText: token.colorSuccess,
                  },
                }}
              >
                <Button icon={<DownloadOutlined />} style={{ width: '135px' }}>
                  Download
                </Button>
              </ConfigProvider>
            </Col>
          </TableSectionWrapper>

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
