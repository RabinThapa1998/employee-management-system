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
import { useMutation, useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '~/config';
import { dateToUnix, unixToDate } from '~/helpers';
import { useParams } from 'react-router-dom';
import { basicInformation, billableInformation, jobs, workingHours } from './employeeformSchema';
import dayjs from 'dayjs';
const { useToken } = theme;
export function EditEmployeeForm() {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams();
  const [form] = Form.useForm<any>();

  const { data } = useQuery(
    ['get-employee', id],
    () =>
      fetch(new URL(`employee/${id}`, API_BASE_URL))
        .then((res) => res.json())
        .then((d) => d.data),
    {
      onSuccess: (response) => {
        form.setFieldsValue({
          ...response,
          starts_at: dayjs(unixToDate(response.starts_at)),
          dob: dayjs(unixToDate(response.dob)),
          ends_at: dayjs(unixToDate(response.ends_at)),
          team: response.team.length === 0 ? 'available' : response.team[0].name,
        });
      },
    },
  );

  const { mutate, isLoading } = useMutation(
    (values: any) =>
      fetch(new URL(`employee/${id}`, API_BASE_URL), {
        method: 'PATCH',
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
            content: 'Updated successfully',
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
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const { token } = useToken();
  return (
    <>
      {contextHolder}
      <Row style={{ background: 'white', padding: '30px 60px', borderRadius: '5px' }}>
        <Col span={24}>
          <Form
            name='employee-form'
            initialValues={{ remember: true }}
            form={form}
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
                  Save & Update
                </Button>
              </ConfigProvider>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
