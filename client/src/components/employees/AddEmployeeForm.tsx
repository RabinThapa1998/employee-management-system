import React, { useRef, useState } from 'react';
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
  Avatar,
} from 'antd';
import { TableSectionWrapper } from './TableSectionWrapper';
import { add, useAppDispatch } from '~/global-states';
import { Icons } from '~/assets';
import { BillableHourField } from '~/common';
import { useMutation } from '@tanstack/react-query';
import { dateToUnix } from '~/helpers';
import { request } from '~/utils';
import { basicInformation, billableInformation, jobs, workingHours } from './employeeformSchema';
import { UserOutlined } from '@ant-design/icons';

const { useToken } = theme;
export function AddEmployeeForm() {
  const dispatch = useAppDispatch();
  const ref = useRef<any>();
  const [profileUrl, setProfileUrl] = useState<string>('');
  const [messageApi, contextHolder] = message.useMessage();

  const { mutate, isLoading } = useMutation((values: any) => request.post('employee', values), {
    onSuccess: (res) => {
      messageApi.open({
        type: 'success',
        content: 'Employee added successfully',
      });
    },
    onError: (error: any) => {
      messageApi.open({
        type: 'error',
        content: error?.response?.data?.errors[0]?.message || 'Something went wrong Try again!',
      });
    },
  });
  const handleImageUpload = () => {
    ref?.current.click();
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) setProfileUrl(URL.createObjectURL(e.target.files[0]));
  };

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
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const { token } = useToken();
  return (
    <>
      {contextHolder}
      <Row style={{ background: 'white', padding: '1.875rem 3.75rem', borderRadius: '.3125rem' }}>
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
            <Row align={'middle'} style={{ margin: '0 0 3.125rem 0' }} gutter={70}>
              <Col span={4}>
                <Row justify={'end'}>
                  <Avatar
                    size={120}
                    icon={<UserOutlined />}
                    src={profileUrl}
                    style={{
                      minWidth: '7.5rem',
                    }}
                  />
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
                  <Button type='primary' icon={<Icons.Upload />} onClick={handleImageUpload}>
                    Upload Profile Image
                  </Button>
                  <input
                    type='file'
                    accept='image/*'
                    ref={ref}
                    style={{
                      display: 'none',
                    }}
                    onChange={handleImageChange}
                  />
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
                    minWidth: '9.125rem',
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
