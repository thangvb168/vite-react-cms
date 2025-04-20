import { SelectProps as antdSelectProps } from 'antd';

export type SelectProps = antdSelectProps & {
  width?: string;
};

const Select = (props: SelectProps) => {
  const { width, ...rest } = props;

  return <Select {...rest} style={{ width: width || '100%', ...rest.style }} />;
};

export default Select;
