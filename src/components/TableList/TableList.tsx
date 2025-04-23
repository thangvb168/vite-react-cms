import { ReactNode } from 'react';

import {
  faEllipsisVertical,
  faPen,
  faSearch,
  faSort,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Table as AntdTable,
  Button,
  Dropdown,
  Input,
  Pagination,
  PaginationProps,
  Space,
  Tag,
} from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import {
  ColumnType as AntdColumnType,
  TableProps as AntdTableProps,
} from 'antd/es/table';

import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT } from '@/constants/pagination';
import { useListing } from '@/hooks/useCRUD';
import { PaginationMeta } from '@/types/apiResponse';
import { CRUDService } from '@/types/crudService';
import { AnyRecord } from '@/types/utils';

const renderCell = (text: string | number, style?: ItemColumnStyle) => {
  switch (style) {
    case ItemColumnStyle.BADGE:
      let color = 'default';
      if (text === 'active') {
        color = 'green';
      } else if (text === 'inactive') {
        color = 'red';
      } else if (text === 'pending') {
        color = 'orange';
      }
      return (
        <Tag color={color}>
          <span className="font-semibold">{text}</span>
        </Tag>
      );
    case ItemColumnStyle.LINK:
      return (
        <Button type="link" href="#">
          <span className="font-semibold">{text}</span>
        </Button>
      );
    default:
      return <span className="font-semibold">{text}</span>;
  }
};

export enum ItemColumnStyle {
  TEXT,
  BADGE,
  LINK,
}

export type ColumnType<T> = AntdColumnType<T> & {
  style?: ItemColumnStyle;
};

export type ActionColumnProps<T> = ItemType & {
  callback?: (t: T) => void;
};

export type Props<T> = {
  columns?: ColumnType<T>[];
  rowKey?: string;
  bordered?: boolean;

  stickyPagination?: boolean;

  hasCheckbox?: boolean;
  hasAction?: boolean;
  hasSearch?: boolean;

  service: CRUDService<T>;
};

const PAGE_SIZE_OPTIONS: string[] = ['5', '10', '20', '50', '100'];

const defaultPagination: PaginationProps = {
  pageSize: PAGE_SIZE_DEFAULT,
  current: PAGE_DEFAULT,
  pageSizeOptions: PAGE_SIZE_OPTIONS,
  showSizeChanger: true,
};

export const TableList = <T extends AnyRecord>(props: Props<T>) => {
  let {
    columns = [],
    rowKey = 'index',
    bordered = false,

    stickyPagination = true,

    hasCheckbox = false,
    hasAction = true,
    hasSearch = true,

    service,
  } = props;

  const {
    data,
    totalRecords,
    page,
    pageSize,
    isLoading,
    searchParams,
    setSearchParams,
  } = useListing({
    defaultSearchParams: {
      page: defaultPagination.current,
      pageSize: defaultPagination.pageSize,
      searchTerm: '',
    },
    getListService: async (searchParams) => {
      const response = await service.getAll({
        page: searchParams.page ?? PAGE_DEFAULT,
        pageSize: searchParams.pageSize ?? PAGE_SIZE_DEFAULT,
        searchTerm: searchParams.searchTerm ?? '',
      });

      const meta: Partial<PaginationMeta> = response.meta ?? {};

      return {
        data: response.data ?? [],
        totalRecords: meta.totalRecords ?? 0,
        totalPages: meta.totalPages ?? 0,
        page: meta.page ?? PAGE_DEFAULT,
        pageSize: meta.pageSize ?? PAGE_SIZE_DEFAULT,
      };
    },
  });

  if (hasAction) {
    const actionColumn: ColumnType<T> = {
      title: 'Thao tác',
      key: 'action',
      fixed: 'right',
      align: 'center',
      width: 100,
      render: (_, t, __) => {
        return (
          <Dropdown
            menu={{
              items: [
                {
                  label: <span className="text-blue-500">Sửa</span>,
                  icon: (
                    <FontAwesomeIcon className="text-blue-500" icon={faPen} />
                  ),
                  key: 'edit',
                },
                {
                  label: <span className="text-red-500">Xóa</span>,
                  icon: (
                    <FontAwesomeIcon className="text-red-500" icon={faTrash} />
                  ),
                  key: 'delete',
                },
              ],
            }}
            placement="bottomRight"
            trigger={['click']}
          >
            <Button
              type="default"
              shape="circle"
              icon={<FontAwesomeIcon icon={faEllipsisVertical} />}
            />
          </Dropdown>
        );
      },
    };

    columns = [...columns, actionColumn];
  }

  columns = columns.map((column) => {
    if (column.style) {
      return {
        ...column,
        render: (text: string | number) => renderCell(text, column.style),
      };
    }

    return column;
  });

  const rowSelection: AntdTableProps<T>['rowSelection'] = {
    columnTitle: (originNode: ReactNode) => {
      return (
        <Space>
          {hasCheckbox && originNode}
          <span>#</span>
        </Space>
      );
    },
    renderCell: (_, __, index, originNode) => {
      return (
        <Space>
          {hasCheckbox && originNode}
          <span className="font-semibold">
            {(page - 1) * pageSize + index + 1}
          </span>
        </Space>
      );
    },
    fixed: 'left',
  };

  return (
    <div className="flex h-full grow flex-col justify-between">
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-end gap-2">
          {hasSearch && (
            <div className="flex items-center gap-2">
              <Button size="large" icon={<FontAwesomeIcon icon={faSort} />}>
                Bộ lọc
              </Button>
              <Input
                placeholder="Tìm kiếm"
                prefix={<FontAwesomeIcon icon={faSearch} />}
                size="large"
                value={searchParams.searchTerm}
                onChange={(e) => {
                  setSearchParams((prev) => ({
                    ...prev,
                    searchTerm: e.target.value,
                  }));
                }}
                style={{ width: 300 }}
              />
            </div>
          )}
          <div className="flex items-center gap-2">
            <Button
              className="grow md:grow-0"
              size="large"
              type="primary"
              danger
              disabled={true}
            >
              Xóa
            </Button>
            <Button className="grow md:grow-0" size="large" type="primary">
              Tạo mới
            </Button>
          </div>
        </div>
        <AntdTable<T>
          className="grow"
          scroll={{ x: 'max-content' }}
          dataSource={data}
          columns={columns}
          pagination={false}
          rowKey={rowKey}
          bordered={bordered}
          loading={isLoading}
          rowSelection={rowSelection}
        />
      </div>
      {stickyPagination && (
        <div className="flex items-center justify-between bg-white px-4 py-1">
          <div className="font-semibold text-gray-500">
            Hiển thị từ
            <span className="mx-1 text-black">
              {(page - 1) * (pageSize ?? 10) + 1}
            </span>
            đến
            <span className="mx-1 text-black">
              {Math.min(page * pageSize, totalRecords)}
            </span>
            của
            <span className="mx-1 text-black">{totalRecords}</span> kết quả
          </div>
          <Pagination
            pageSize={pageSize}
            current={page}
            total={totalRecords}
            pageSizeOptions={defaultPagination.pageSizeOptions}
            showSizeChanger={defaultPagination.showSizeChanger}
            onChange={(newPage: number, newPageSize: number) => {
              setSearchParams((prev) => ({
                ...prev,
                page: newPage,
                pageSize: newPageSize,
              }));
            }}
          />
        </div>
      )}
    </div>
  );
};
