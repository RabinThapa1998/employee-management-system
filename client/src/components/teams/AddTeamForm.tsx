import { useMemo } from 'react';
import {
  Button,
  Checkbox,
  Form,
  Input,
  theme,
  Select,
  Row,
  Col,
  ConfigProvider,
  message,
  TreeSelect,
  Typography,
} from 'antd';
import { TableSectionWrapper } from '../employees/TableSectionWrapper';
import { add, useAppDispatch } from '~/global-states';
import { DownloadOutlined, PrinterFilled } from '@ant-design/icons';
import QRCode from 'react-qr-code';
import { BillableHourField } from '~/common';
import { API_BASE_URL } from '~/config';
import { useMutation, useQuery } from '@tanstack/react-query';
const { TreeNode } = TreeSelect;
const { Option } = Select;
import axios from 'axios';
import { request } from '~/utils';
import { ITeamSingleResponse } from '~/types';
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
    label: 'Team Name',
    placeholder: 'Enter Team Name',
    type: 'text',
  },
  {
    name: 'password',
    label: 'Team Password',
    placeholder: 'Enter Team Password',
    type: 'text',
  },
];

const { useToken } = theme;
interface IEmployeeOption {
  value: string;
  label: string;
  job_position: string;
  status: string;
}
interface ITeamForm {
  name: string;
  password: string;
  members: string[];
  billable_hrs: number;
}
export function AddTeamForm() {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm<ITeamForm>();
  const memberData = Form.useWatch('members', form);
  const getAccBillableHrs = (members: string[]) => {
    if (members)
      return members.reduce((acc: number, curr: string) => {
        const [id, billableHrs] = curr.split('-');
        return acc + Number(billableHrs);
      }, 0);
    return 0;
  };
  form.setFieldValue('billable_hrs', getAccBillableHrs(memberData));

  const { data: employeeList, isLoading: getEmployeeIsLoading } = useQuery(['get-employee'], () =>
    fetch(new URL('employee', API_BASE_URL)).then((res) => res.json()),
  );

  const employeeOptions = useMemo<IEmployeeOption[]>(() => {
    if (employeeList)
      return employeeList?.data.map((employee: any) => ({
        value: `${employee.id}-${employee.billable_hrs}`,
        label: employee.name,
        job_position: employee.job_position,
        status: employee.team.length ? 'Not Available' : 'Available',
      }));
    else return [];
  }, [employeeList]);

  const { mutate, isLoading } = useMutation(
    (values: any) => request.post('team', values) as Promise<Response>,
    {
      onSuccess: (res: Response) => {
        messageApi.open({
          type: 'success',
          content: 'Team added successfully',
        });
      },
      onError: (error: any) => {
        messageApi.open({
          type: 'error',
          content: error?.response?.data?.errors[0]?.message || 'Something went wrong Try again!',
        });
      },
    },
  );
  const onFinish = (values: any) => {
    mutate({ ...values, members: values.members.map((member: string) => member.split('-')[0]) });
  };

  const { token } = useToken();
  const qrValue =
    'team' +
    '=' +
    Form.useWatch('name', form) +
    ' ' +
    'password' +
    '=' +
    Form.useWatch('password', form);

  return (
    <>
      {contextHolder}
      <Row style={{ background: 'white', padding: '30px 60px', borderRadius: '5px' }}>
        <Col span={24}>
          <Form
            name='basic'
            form={form}
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
                  name={'members'}
                  rules={[{ required: true, message: 'required' }]}
                >
                  <Select
                    mode='multiple'
                    placeholder='Select Team Members'
                    style={{ width: '100%' }}
                    optionFilterProp='label'
                    loading={getEmployeeIsLoading}
                  >
                    {employeeOptions.map((employee) => (
                      <Option key={employee.value} value={employee.value}>
                        <Checkbox
                          checked={memberData?.includes(employee.value)}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'start',
                              width: '200px',
                            }}
                          >
                            <Typography.Title level={5}>{employee.label}</Typography.Title>
                            <Typography.Title level={5}>{employee.status}</Typography.Title>
                          </div>
                        </Checkbox>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Row>
                  <Col span={8}>
                    <Form.Item
                      label={'Billable Hours'}
                      name={'billable_hrs'}
                      rules={[{ required: true, message: 'required' }]}
                    >
                      <BillableHourField
                        placeholder={'Enter Billable Hours'}
                        bgColor={token.colorPrimary}
                        color={token.colorWhite}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </TableSectionWrapper>
            <TableSectionWrapper title='Team QR' align={'middle'} gutter={16} withDivider={false}>
              <Col span={4}>
                <QRCode value={qrValue} className='qr-code' />
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
                <Button
                  type='primary'
                  htmlType='submit'
                  size='middle'
                  style={{ width: '146px' }}
                  loading={isLoading}
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
