import { FormItemProps, FormRule } from 'antd';

export type FieldType =
  | 'input'
  | 'textarea'
  | 'number'
  | 'select'
  | 'checkbox'
  | 'date';

export interface FormField {
  label: string;
  type: FieldType;
  //   rules?:
}
