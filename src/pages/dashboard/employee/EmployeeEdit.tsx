import { useLocation, useParams } from 'react-router-dom';

import { FormItemProps, FormList } from '@/components/FormList';
import employeeService from '@/services/employee';
import { Employee } from '@/types/employee';

const EmployeeEdit = () => {
  const location = useLocation();
  const { state } = location;
  const { id } = useParams();

  const items: FormItemProps<Employee>[] = [
    {
      name: 'code',
      label: 'Mã nhân viên',
      type: 'input',
      disabled: true,
    },
    {
      name: 'name',
      label: 'Tên nhân viên',
      type: 'input',
      placeholder: 'Nhập tên nhân viên',
      rules: [
        { required: true, message: 'Vui lòng nhập tên nhân viên' },
        { min: 2, message: 'Tên phải có ít nhất 2 ký tự' },
        { max: 50, message: 'Tên không được vượt quá 50 ký tự' },
      ],
    },
    {
      name: 'phone',
      label: 'Số điện thoại',
      type: 'input',
      placeholder: 'Nhập số điện thoại',
      rules: [
        { required: true, message: 'Vui lòng nhập số điện thoại' },
        {
          pattern: /^(0|\+84)(\d{9})$/,
          message:
            'Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng Việt Nam.',
        },
      ],
    },
    {
      name: 'email',
      label: 'Email',
      type: 'input',
      placeholder: 'Nhập email',
      rules: [
        { required: true, message: 'Vui lòng nhập email' },
        { type: 'email', message: 'Email không hợp lệ' },
      ],
    },
    {
      name: 'gender',
      label: 'Giới tính',
      type: 'radio',
      placeholder: 'Chọn giới tính',
      options: [
        { label: 'Nam', value: 'male' },
        { label: 'Nữ', value: 'female' },
        { label: 'Khác', value: 'other' },
      ],
    },
    {
      name: 'position',
      label: 'Chức vụ',
      type: 'input',
      placeholder: 'Nhập chức vụ',
      rules: [
        { required: true, message: 'Vui lòng nhập chức vụ' },
        { max: 100, message: 'Chức vụ không được vượt quá 100 ký tự' },
      ],
    },
  ];

  return (
    <div className="">
      <FormList
        id={id}
        items={items}
        canEdit={true}
        service={employeeService}
        initialValues={state}
        colSpan={18}
      />
    </div>
  );
};

export default EmployeeEdit;
