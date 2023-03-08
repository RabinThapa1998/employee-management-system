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
  message,
} from 'antd';
import { TableSectionWrapper } from './TableSectionWrapper';
import { add, useAppDispatch } from '~/global-states';
import { Icons } from '~/assets';
import { BillableHourField } from '~/common';
import { useMutation } from '@tanstack/react-query';
import { API_BASE_URL } from '~/config';
import { dateToUnix } from '~/helpers';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
type option = {
  value: string | number | undefined;
  label: string;
}[];
interface IForm {
  name: string;
  label: string;
  placeholder?: string;
  options?: option;
  type: 'string' | 'number' | 'date' | 'select' | 'checkbox' | 'time' | 'email';
  required: boolean;
}

const basicInformation: IForm[] = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Enter name',
    type: 'string',
    required: true,
  },
  {
    name: 'middle_name',
    label: 'Middle Name',
    placeholder: 'Enter middle name',
    type: 'string',
    required: false,
  },
  {
    name: 'surname',
    label: 'Surname',
    placeholder: 'Enter surname',
    type: 'string',
    required: true,
  },
  {
    name: 'dob',
    label: 'Birth Date',
    placeholder: 'DD/MM/YYYY',
    type: 'date',
    required: true,
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
    type: 'string',
    required: true,
  },
  {
    name: 'address',
    label: 'Address',
    placeholder: 'Enter Address',
    type: 'string',
    required: true,
  },
  {
    name: 'phone_number',
    label: 'Phone Number',
    placeholder: 'Enter Phone Number',
    type: 'string',
    required: true,
  },
  {
    name: 'email',
    label: 'Email Address',
    placeholder: 'Enter Email Address',
    type: 'email',
    required: true,
  },
];
const workingHours: IForm[] = [
  {
    name: 'starts_at',
    label: 'Starts At',
    placeholder: 'HH-MM',
    type: 'string',
    required: true,
  },
  {
    name: 'ends_at',
    label: 'Ends In',
    placeholder: 'HH-MM',
    type: 'string',
    required: true,
  },
];
const jobs: IForm[] = [
  {
    name: 'job_position',
    label: 'Job Position',
    placeholder: 'Enter Job Position',
    type: 'string',
    required: true,
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
    type: 'string',
    required: true,
  },
];
const billableInformation = [
  {
    name: 'is_billable',
    label: 'This user is billable',
    type: 'checkbox',
    required: true,
  },
  {
    name: 'billable_hrs',
    label: 'Billable Hours',
    placeholder: 'Enter Billable Hours',
    required: true,
  },
];

const { useToken } = theme;
export function AddEmployeeForm() {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const { mutate, isLoading } = useMutation(
    (values: any) =>
      fetch(new URL('employee', API_BASE_URL), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      }),
    {
      onSuccess: (res) => {
        if (res.status === 200) {
          messageApi.open({
            type: 'success',
            content: 'Employee added successfully',
          });
        } else {
          res.json().then((data) => {
            messageApi.open({
              type: 'error',
              content: data.errors[0].message,
            });
          });
        }
      },
      onError: (error) => {
        console.log('🚀 ~ file: AddEmployeeForm.tsx:183 ~ AddEmployeeForm ~ error:', error);
        messageApi.open({
          type: 'error',
          content: 'Something went wrong Try again!',
        });
      },
    },
  );

  const onFinish = (values: any) => {
    const dob = dateToUnix(values.dob);
    const starts_at = dateToUnix(values.starts_at);
    const ends_at = dateToUnix(values.ends_at);

    if (values.team === 'available') {
      mutate({ ...values, starts_at: starts_at, ends_at: ends_at, dob: dob, team: [] });
    } else {
      mutate({ ...values, starts_at: starts_at, ends_at: ends_at, dob: dob });
    }
    dispatch(add(values));
  };

  const { token } = useToken();
  return (
    <>
      {contextHolder}
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
            onChange={(e) => console.log(e)}
          >
            <Row align={'middle'} style={{ margin: '0 0 50px 0' }} gutter={70}>
              <Col span={4}>
                <Row justify={'end'}>
                  <Icons.Profile />
                </Row>
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

            <TableSectionWrapper title='Basic Information'>
              {basicInformation.map((item) => {
                if (item.name === 'gender') {
                  return (
                    <Col key={item.name} span={8}>
                      <Form.Item
                        label={item.label}
                        name={item.name}
                        rules={[{ required: item.required, message: 'required' }]}
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
                        rules={[{ required: item.required, message: 'required' }]}
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
                      rules={[{ required: item.required, type: item.type as any }]}
                    >
                      <Input placeholder={item.placeholder} />
                    </Form.Item>
                  </Col>
                );
              })}
            </TableSectionWrapper>

            <TableSectionWrapper title='Working Hours'>
              {workingHours.map((item) => (
                <Col key={item.name} span={8}>
                  <Form.Item
                    label={item.label}
                    name={item.name}
                    rules={[{ required: item.required, message: 'required' }]}
                  >
                    <TimePicker
                      placeholder={item.placeholder}
                      format={'HH:mm'}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
              ))}
            </TableSectionWrapper>

            <TableSectionWrapper title='Jobs'>
              {jobs.map((item) => {
                if (item.name === 'team') {
                  return (
                    <Col key={item.name} span={8}>
                      <Form.Item
                        label={item.label}
                        name={item.name}
                        //
                        rules={[{ required: item.required, message: 'required' }]}
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
                      rules={[{ required: item.required, message: 'required' }]}
                    >
                      <Input placeholder={item.placeholder} />
                    </Form.Item>
                  </Col>
                );
              })}
            </TableSectionWrapper>

            <TableSectionWrapper title='Billable Information'>
              {billableInformation.map((item) => {
                if (item.name === 'is_billable') {
                  return (
                    <Col key={item.name} span={8}>
                      <ConfigProvider
                        theme={{
                          token: { colorPrimary: '#000' },
                        }}
                      >
                        <Form.Item
                          name={item.name}
                          rules={[{ required: item.required, message: 'required' }]}
                          valuePropName='checked'
                          initialValue={true}
                        >
                          <Checkbox defaultChecked>{item.label}</Checkbox>
                        </Form.Item>
                      </ConfigProvider>
                    </Col>
                  );
                }
                return (
                  <Col key={item.name} span={8}>
                    <Form.Item
                      label={item.label}
                      name={item.name}
                      rules={[{ required: item.required, message: 'required' }]}
                    >
                      <BillableHourField
                        placeholder={item.placeholder}
                        bgColor={token.colorBorder}
                        color={token.colorText}
                      />
                    </Form.Item>
                  </Col>
                );
              })}
            </TableSectionWrapper>

            <Form.Item>
              <ConfigProvider
                theme={{
                  token: { colorPrimary: token.colorWarning },
                }}
              >
                <Button
                  type='primary'
                  htmlType='submit'
                  size='middle'
                  loading={isLoading}
                  style={{
                    minWidth: '146px',
                  }}
                >
                  Save
                </Button>
              </ConfigProvider>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
