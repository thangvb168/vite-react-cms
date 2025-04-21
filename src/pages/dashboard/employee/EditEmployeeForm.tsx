import { useEffect } from 'react';

import { Form, Input, Modal, Radio, Spin } from 'antd';

import { Employee } from '@/types/employee';

interface EditEmployeeFormProps {
  employee: Employee | null;
  open: boolean;
  onCancel: () => void;
  onEdit: (employee: Employee) => void;
  loading: boolean;
}

const EditEmployeeForm = ({
  employee,
  open,
  onCancel,
  onEdit,
  loading,
}: EditEmployeeFormProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && employee) {
      form.setFieldsValue({
        ...employee,
      });
    }
  }, [open, form, employee]);

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  const handleSubmit = (values: Partial<Employee>) => {
    if (!employee) return;

    const updatedEmployee: Employee = {
      ...employee,
      ...values,
    };
    onEdit(updatedEmployee);
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Chỉnh sửa thông tin nhân viên"
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      confirmLoading={loading}
      okText="Chỉnh sửa"
      cancelText="Hủy"
      width={600}
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="code" label="Mã nhân viên">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="name"
            label="Họ và tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
          >
            <Input placeholder="Nhập họ tên" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại!' },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            name="position"
            label="Chức vụ"
            rules={[{ required: true, message: 'Vui lòng nhập chức vụ!' }]}
          >
            <Input placeholder="Nhập chức vụ" />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Giới tính"
            rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
          >
            <Radio.Group>
              <Radio value="male">Nam</Radio>
              <Radio value="female">Nữ</Radio>
              <Radio value="other">Khác</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default EditEmployeeForm;
