import { Table as AntdTable } from 'antd';
import type { TableProps as AntdTableProps } from 'antd';

type TableProps<T> = AntdTableProps<T>;

const Table = <T,>(props: TableProps<T>) => {
  const { columns, dataSource, ...rest } = props;

  return (
    <AntdTable
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      rowKey={(record) => record.id}
      {...rest}
    />
  );
};

export default Table;
export type { TableProps } from 'antd';
