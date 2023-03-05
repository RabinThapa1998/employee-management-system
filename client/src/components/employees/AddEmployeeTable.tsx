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
import { AddEmployeeFormSectionWrapper } from './AddEmployeeFormSectionWrapper';
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
    name: 'name',
    label: 'Name',
    placeholder: 'Enter name',
    type: 'text',
  },
  {
    name: 'middle_name',
    label: 'Middle Name',
    placeholder: 'Enter middle name',
    type: 'text',
  },
  {
    name: 'surname',
    label: 'Surname',
    placeholder: 'Enter surname',
    type: 'text',
  },
  {
    name: 'dob',
    label: 'Birth Date',
    placeholder: 'DD/MM/YYYY',
    type: 'date',
  },
  {
    name: 'gender',
    label: 'Gender',
    options: [
      {
        value: 'male',
        label: 'Male',
      },
      {
        value: 'female',
        label: 'Female',
      },
      {
        value: 'other',
        label: 'Other',
      },
    ],
    placeholder: 'Choose Gender',
    type: 'select',
  },
  {
    name: 'address',
    label: 'Address',
    placeholder: 'Enter Address',
    type: 'text',
  },
  {
    name: 'phone_number',
    label: 'Phone Number',
    placeholder: 'Enter Phone Number',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email Address',
    placeholder: 'Enter Email Address',
    type: 'text',
  },
];
const workingHours: IForm[] = [
  {
    name: 'starts_at',
    label: 'Starts At',
    placeholder: 'HH-MM',
    type: 'time',
  },
  {
    name: 'ends_in',
    label: 'Ends In',
    placeholder: 'HH-MM',
    type: 'time',
  },
];
const jobs: IForm[] = [
  {
    name: 'job_position',
    label: 'Job Position',
    placeholder: 'Enter Job Position',
    type: 'text',
  },
  {
    name: 'team',
    label: 'Team',
    placeholder: 'Choose Team',
    options: [
      {
        value: 'available',
        label: 'Available',
      },
    ],
    type: 'select',
  },
];
const billableInformation = [
  {
    name: 'is_billable',
    label: 'This user is billable',
    type: 'checkbox',
  },
  {
    name: 'billable_hrs',
    label: 'Billable Hours',
    placeholder: 'Enter Billable Hours',
  },
];

const { useToken } = theme;
export function AddEmployeeTable() {
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
          <Row align={'middle'}>
            <Col span={4}>
              <div className='bg-[#C3C1BF] h-[120px] w-[120px] rounded-full flex  items-center justify-center'></div>
            </Col>
            <Col span={20}>
              <Typography.Title level={3} style={{ fontWeight: 800 }}>
                Profile image
              </Typography.Title>
              <ConfigProvider
                theme={{
                  token: { colorPrimary: token.colorSuccess },
                }}
              >
                <Button type='primary' icon={<Icons.Upload />}>
                  Upload Profile Image
                </Button>
              </ConfigProvider>
            </Col>
          </Row>
          <Divider> </Divider>

          <AddEmployeeFormSectionWrapper title='Basic Information'>
            {basicInformation.map((item) => {
              if (item.name === 'gender') {
                return (
                  <Col key={item.name} span={8}>
                    <Form.Item
                      label={item.label}
                      name={item.name}
                      rules={[{ required: true, message: 'required' }]}
                    >
                      <Select placeholder={item.placeholder} options={item.options} />
                    </Form.Item>
                  </Col>
                );
              }
              if (item.name === 'dob') {
                return (
                  <Col key={item.name} span={8}>
                    <Form.Item
                      label={item.label}
                      name={item.name}
                      rules={[{ required: true, message: 'required' }]}
                    >
                      <DatePicker
                        placeholder={item.placeholder}
                        format={'DD/MM/YYYY'}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                );
              }
              return (
                <Col key={item.name} span={8}>
                  <Form.Item
                    label={item.label}
                    name={item.name}
                    rules={[{ required: true, message: 'required' }]}
                  >
                    <Input placeholder={item.placeholder} />
                  </Form.Item>
                </Col>
              );
            })}
          </AddEmployeeFormSectionWrapper>
          <Divider />

          <AddEmployeeFormSectionWrapper title='Working Hours'>
            {workingHours.map((item) => (
              <Col key={item.name} span={8}>
                <Form.Item
                  label={item.label}
                  name={item.name}
                  rules={[{ required: true, message: 'required' }]}
                >
                  <TimePicker
                    placeholder={item.placeholder}
                    format={'HH:mm'}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
            ))}
          </AddEmployeeFormSectionWrapper>

          <Divider />
          <AddEmployeeFormSectionWrapper title='Jobs'>
            {jobs.map((item) => {
              if (item.name === 'team') {
                return (
                  <Col key={item.name} span={8}>
                    <Form.Item
                      label={item.label}
                      name={item.name}
                      //
                      rules={[{ required: true, message: 'required' }]}
                    >
                      <Select
                        placeholder={item.placeholder}
                        options={item.options}
                        //
                      />
                    </Form.Item>
                  </Col>
                );
              }
              return (
                <Col key={item.name} span={8}>
                  <Form.Item
                    label={item.label}
                    name={item.name}
                    rules={[{ required: true, message: 'required' }]}
                  >
                    <Input placeholder={item.placeholder} />
                  </Form.Item>
                </Col>
              );
            })}
          </AddEmployeeFormSectionWrapper>

          <Divider />
          <AddEmployeeFormSectionWrapper title='Billable Information'>
            {billableInformation.map((item) => {
              if (item.name === 'is_billable') {
                return (
                  <Col key={item.name} span={8}>
                    <Form.Item name={item.name}>
                      <ConfigProvider
                        theme={{
                          token: { colorPrimary: '#000' },
                        }}
                      >
                        <Checkbox>{item.label}</Checkbox>
                      </ConfigProvider>
                    </Form.Item>
                  </Col>
                );
              }
              return (
                <Col key={item.name} span={8}>
                  <Form.Item
                    label={item.label}
                    name={item.name}
                    rules={[{ required: true, message: 'required' }]}
                  >
                    <TimePicker placeholder={item.placeholder} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              );
            })}
          </AddEmployeeFormSectionWrapper>

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
