import { ReactNode, useEffect, useState } from 'react';

import {
  faAdd,
  faEllipsisVertical,
  faPencil,
  faSearch,
  faSortAlphaDownAlt,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Dropdown,
  Flex,
  Grid,
  Input,
  Layout,
  MenuProps,
  Modal,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from 'antd';
import { createStyles } from 'antd-style';

import employeeService from '@/services/employee';
import type { Employee } from '@/types/employee';

import AddEmployeeForm from './AddEmployeeForm';
import EditEmployeeForm from './EditEmployeeForm';

const { Content, Footer } = Layout;

const EmployeePage = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const [dataSource, setDataSource] = useState<Employee[]>([]);
  const [total, setTotal] = useState(dataSource.length || 0);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState<boolean>(false);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await employeeService.getAll();
        setTotal(data.length);
        setCurrentPage(1);
        setPageSize(5);
        setDataSource(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderText = (value: string | number, className: string) => {
    return <span className={className}>{value}</span>;
  };

  const renderBadge = (value: string) => {
    const colorMap: Record<string, string> = {
      active: 'green',
      deactive: 'red',
      pending: 'yellow',
    };

    return <Tag color={colorMap[value]}>{value}</Tag>;
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
      render: (_, employee, __) => {
        const items: MenuProps['items'] = [
          {
            key: '0',
            label: 'Chỉnh sửa',
            icon: <FontAwesomeIcon icon={faPencil} />,
            onClick: () => {
              setSelectedEmployee(employee);
              setIsEditModalOpen(true);
            },
          },
          {
            key: '1',
            label: <span className="text-red-500">Xóa</span>,
            icon: (
              <FontAwesomeIcon icon={faTrashCan} className="text-red-500" />
            ),
            onClick: () => {
              setSelectedEmployee(employee);
              setIsDeleteModalOpen(true);
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
    fixed: 'left',
  };

  const filterItem: MenuProps['items'] = [
    {
      key: '0',
      label: 'Tất cả',
    },
    {
      key: '1',
      label: 'Đang hoạt động',
    },
    {
      key: '2',
      label: 'Ngừng hoạt động',
    },
    {
      key: '3',
      label: 'Chờ xác nhận',
    },
  ];

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const useStyle = createStyles(({ css, token }) => {
    const { antCls } = token;
    return {
      customTable: css`
        ${antCls}-table {
          ${antCls}-table-container {
            ${antCls}-table-body,
            ${antCls}-table-content {
              scrollbar-width: thin;
              scrollbar-color: #eaeaea transparent;
              scrollbar-gutter: stable;
            }
          }
        }
      `,
    };
  });

  const { styles } = useStyle();

  return (
    <Layout>
      <Content className="p-4">
        <Flex align="center" justify="end" gap={16} wrap="wrap">
          <Dropdown menu={{ items: filterItem }}>
            <Button
              size="large"
              icon={<FontAwesomeIcon icon={faSortAlphaDownAlt} />}
            >
              <span className="font-semibold">Bộ lọc</span>
            </Button>
          </Dropdown>
          <Input
            size="large"
            placeholder="Tìm kiếm"
            style={{ width: isMobile ? '100%' : 250 }}
            prefix={<FontAwesomeIcon icon={faSearch} />}
          />
          <Button
            size="large"
            type="primary"
            block={isMobile}
            icon={<FontAwesomeIcon icon={faAdd} />}
            onClick={() => setIsAddModalOpen(true)}
          >
            <span className="font-semibold">Thêm mới</span>
          </Button>
        </Flex>

        <AddEmployeeForm
          open={isAddModalOpen}
          onCancel={() => setIsAddModalOpen(false)}
          onSave={(values) => {
            try {
              setLoadingAdd(true);
              employeeService.add(values).then(() => {
                employeeService.getAll().then((data) => {
                  setDataSource(data);
                  setTotal(data.length);
                  setCurrentPage(1);
                  setPageSize(5);
                });
              });
            } catch (error) {
              console.error('Error adding employee:', error);
            } finally {
              setLoadingAdd(false);
            }
          }}
          loading={loadingAdd}
        />

        <EditEmployeeForm
          employee={selectedEmployee}
          open={isEditModalOpen}
          onCancel={() => setIsEditModalOpen(false)}
          onEdit={(values) => {
            try {
              setLoadingEdit(true);
              employeeService.update(values).then(() => {
                employeeService.getAll().then((data) => {
                  setDataSource(data);
                });
              });
            } catch (error) {
              console.error('Error updating employee:', error);
            } finally {
              setLoadingEdit(false);
              setSelectedEmployee(null);
            }
          }}
          loading={loadingEdit}
        />

        <Modal
          title="Xóa nhân viên"
          open={isDeleteModalOpen}
          cancelText="Hủy"
          okText="Xóa"
          onCancel={() => setIsDeleteModalOpen(false)}
          onOk={() => {
            try {
              employeeService.delete(selectedEmployee?.id || '').then(() => {
                employeeService.getAll().then((data) => {
                  setDataSource(data);
                  setTotal(data.length);
                  setCurrentPage(1);
                  setPageSize(5);
                });
              });
              setIsDeleteModalOpen(false);
            } catch (error) {
              console.error('Error deleting employee:', error);
            } finally {
              setSelectedEmployee(null);
            }
          }}
        >
          <p>Bạn có chắc chắn muốn xóa nhân viên</p>
        </Modal>

        <br />

        <Table<Employee>
          className={styles.customTable}
          scroll={{ x: 'max-content' }}
          loading={loading}
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
        <Flex
          // justify="space-between"
          align="center"
          wrap="wrap"
          className="w-full justify-center gap-x-4 gap-y-2 sm:justify-between"
        >
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
