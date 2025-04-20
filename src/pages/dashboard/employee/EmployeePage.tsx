import { ReactNode, useState } from 'react';

import {
  faEllipsisVertical,
  faPencil,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Dropdown,
  Flex,
  Layout,
  MenuProps,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from 'antd';

import { mockEmployees } from '@/mocks/data/employees';
import type { Employee } from '@/types/employee';

const { Content, Footer } = Layout;

const EmployeePage = () => {
  const dataSource = mockEmployees;

  const [total, setTotal] = useState(dataSource.length || 0);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const renderText = (value: string | number, className: string) => {
    return <span className={className}>{value}</span>;
  };

  const renderBadge = (value: string) => {
    if (value === 'active')
      return (
        <span className="rounded-md border border-green-500 p-1 font-semibold text-green-500">
          Đang hoạt động
        </span>
      );
    if (value === 'deactive')
      return (
        <span className="rounded-md border border-red-500 p-1 font-semibold text-red-500">
          Ngừng hoạt động
        </span>
      );
    if (value === 'pending')
      return (
        <span className="rounded-md border border-yellow-500 p-1 font-semibold text-yellow-500">
          Chờ xác nhận
        </span>
      );
  };

  const columns: TableColumnsType<Employee> = [
    {
      title: 'Mã nhân viên',
      dataIndex: 'code',
      render: (text: string) => renderText(text, 'text-primary font-semibold'),
    },
    {
      title: 'Tên nhân viên',
      dataIndex: 'name',
      render: (text: string) => renderText(text, 'text-black font-semibold'),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      render: (text: string) => renderText(text, 'text-black font-semibold'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (text: string) => renderText(text, 'text-black font-semibold'),
    },
    {
      title: 'Chức vụ',
      dataIndex: 'position',
      render: (text: string) => renderText(text, 'text-black font-semibold'),
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      render: (text: string) => renderText(text, 'text-black font-semibold'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (text: string) => renderBadge(text),
    },
    {
      title: 'Thao tác',
      fixed: 'right',
      render: (_, __, index) => {
        const items: MenuProps['items'] = [
          {
            key: '0',
            label: 'Chỉnh sửa',
            icon: <FontAwesomeIcon icon={faPencil} />,
            onClick: () => {
              console.log('Edit clicked');
            },
          },
          {
            key: '1',
            label: <span className="text-red-500">Xóa</span>,
            icon: (
              <FontAwesomeIcon icon={faTrashCan} className="text-red-500" />
            ),
            onClick: () => {
              console.log('Logout clicked::', index);
            },
          },
        ];

        return (
          <Flex justify="center" align="center">
            <Dropdown menu={{ items }} trigger={['click']}>
              <Button shape="circle" size="small">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </Button>
            </Dropdown>
          </Flex>
        );
      },
    },
  ];

  const rowSelection: TableProps<Employee>['rowSelection'] = {
    columnTitle: (originNode: ReactNode) => {
      return (
        <Space>
          {originNode}
          <span>#</span>
        </Space>
      );
    },
    renderCell: (_, __, index, originNode) => {
      return (
        <Space>
          {originNode}
          <span>{index + 1}</span>
        </Space>
      );
    },
  };

  return (
    <Layout>
      <Content>
        <Table<Employee>
          bordered
          rowKey={'id'}
          rowSelection={rowSelection}
          dataSource={dataSource}
          columns={columns}
          pagination={{
            pageSize: pageSize,
            current: currentPage,
            position: [],
          }}
        />
      </Content>
      <Footer>
        <Flex justify="space-between" align="center">
          <div className="font-semibold text-gray-500">
            Hiển thị từ
            <span className="mx-1 text-black">
              {(currentPage - 1) * pageSize + 1}
            </span>
            đến
            <span className="mx-1 text-black">
              {Math.min(currentPage * pageSize, total)}
            </span>
            của
            <span className="mx-1 text-black">{total}</span> kết quả
          </div>

          <Pagination
            hideOnSinglePage={true}
            align="end"
            showSizeChanger
            pageSizeOptions={[5, 10, 15]}
            pageSize={pageSize}
            total={total}
            defaultCurrent={1}
            onChange={(page, pageSize) => {
              setPageSize(pageSize);
              setCurrentPage(page);
            }}
          />
        </Flex>
      </Footer>
    </Layout>
  );
};

export default EmployeePage;
