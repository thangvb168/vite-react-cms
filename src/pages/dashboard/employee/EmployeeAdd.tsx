import { FormItemProps, FormList } from '@/components/FormList';
import employeeService from '@/services/employee';
import { Employee } from '@/types/employee';

const EmployeeAdd = () => {
  const items: FormItemProps<Employee>[] = [
    {
      name: 'name',
      label: 'Tên nhân viên',
      type: 'input',
      placeholder: 'Nhập tên nhân viên',
      rules: [{ required: true, message: 'Vui lòng nhập tên nhân viên' }],
    },
    {
      name: 'phone',
      label: 'Số điện thoại',
      type: 'input',
      placeholder: 'Nhập số điện thoại',
      rules: [{ required: true, message: 'Vui lòng nhập số điện thoại' }],
    },
    {
      name: 'email',
      label: 'Email',
      type: 'input',
      placeholder: 'Nhập email',
      rules: [{ required: true, message: 'Vui lòng nhập email' }],
    },
    {
      name: 'position',
      label: 'Chức vụ',
      type: 'input',
      placeholder: 'Nhập chức vụ',
    },
  ];

  return (
    <div className="">
      <FormList items={items} canEdit={true} service={employeeService} />
    </div>
  );
};

export default EmployeeAdd;
