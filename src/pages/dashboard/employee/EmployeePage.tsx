import { Button, Layout } from 'antd';

import {
  type ColumnType,
  ItemColumnStyle,
  TableList,
} from '@/components/TableList';
import employeeService from '@/services/employee';
import type { Employee } from '@/types/employee';

const { Content } = Layout;

const EmployeePage = () => {
  const columns: ColumnType<Employee>[] = [
    {
      title: 'Mã nhân viên',
      dataIndex: 'code',
      style: ItemColumnStyle.LINK,
    },
    {
      title: 'Tên nhân viên',
      dataIndex: 'name',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Chức vụ',
      dataIndex: 'position',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      style: ItemColumnStyle.BADGE,
    },
  ];

  return (
    <Layout>
      <Content>
        <TableList<Employee>
          columns={columns}
          rowKey={'id'}
          bordered
          hasCheckbox={true}
          hasAction={true}
          hasSearch={false}
          stickyPagination={true}
          service={employeeService}
        />
      </Content>
      <Button type="link" color="primary" href="#">
        1111
      </Button>
    </Layout>
  );
};

export default EmployeePage;
