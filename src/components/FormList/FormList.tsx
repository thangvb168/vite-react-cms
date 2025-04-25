import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Form as AntdForm,
  FormItemProps as AntdFormItemProps,
  FormProps as AntdFormProps,
  Button,
  Col,
  Flex,
  Input,
  Row,
  Skeleton,
  message,
} from 'antd';
import FormItem from 'antd/es/form/FormItem';
import clsx from 'clsx';

import { useCreate, useGetById, useUpdate } from '@/hooks/useCRUD';
import { CRUDService } from '@/types/crudService';
import { AnyRecord } from '@/types/utils';

export type ItemType = 'input' | 'textarea' | 'number' | 'mentions' | 'date';

export type FormItemProps<T> = AntdFormItemProps<T> & {
  name: keyof T;
  type: ItemType;
  placeholder?: string;
  disabled?: boolean;
  render?: () => React.ReactNode;
  colSpan?: number;
};

export type FormListProps<T> = AntdFormProps<T> & {
  items: FormItemProps<T>[];
  service: CRUDService<T>;

  id?: string;
  canEdit?: boolean;

  colSpan?: number;
  gap?: number;

  initData?: Partial<T>;
};

const renderItem = (type: ItemType, disabled = false, placeholder: string) => {
  switch (type) {
    case 'input':
      return <Input disabled={disabled} placeholder={placeholder} />;
    default:
      return <Input placeholder={placeholder} />;
  }
};

export const FormList = <T extends AnyRecord>({
  items,
  service,
  id,
  canEdit = false,
  colSpan = 20,
  gap = 16,
  initData = {},
  ...formProps
}: FormListProps<T>) => {
  const [form] = AntdForm.useForm();
  const navigate = useNavigate();

  const {
    data: getByIdData,
    idLoading: isGetByIdLoading,
    handleGetById,
  } = useGetById<T>({
    id: id || '',
    getIdService: async (id) => {
      const res = await service.getById(id);
      if (!res?.data) throw new Error('No data');
      return res.data;
    },
  });

  const {
    data: createData,
    isLoading: isCreateLoading,
    handleCreate,
  } = useCreate<T>({
    createService: async (data) => {
      const response = await service.create(data);

      if (!response || !response.data) {
        throw new Error('No data returned from the server');
      }

      return response.data;
    },
    onSuccess: (data) => console.log('Created:', data),
    onError: (err) => console.error('Create failed:', err),
  });

  const {
    data: updateDate,
    isLoading: isUpdateLoading,
    handleUpdate,
  } = useUpdate<T>({
    id: id || '',
    updateService: async (id, data) => {
      const response = await service.update(id, data);

      if (!response || !response.data) {
        throw new Error('No data returned from the server');
      }

      return response.data;
    },
    onSuccess: (data) => console.log('Updated:', data),
    onError: (err) => console.error('Update failed:', err),
  });

  const handleView = () => navigate(-1);

  const isEditPage = Boolean(id);
  const isCreatePage = !id;
  const isViewPage = id && !canEdit;

  const handleFinish = isCreatePage
    ? handleCreate
    : isViewPage
      ? handleView
      : handleUpdate;

  const [messageApi, messageContext] = message.useMessage();

  const onFinish = async () => {
    const hide = messageApi.loading('Đang xử lý...', 0);

    try {
      const values = form.getFieldsValue();
      await handleFinish(values);
      hide();

      messageApi.success('Thành công!', 1);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      hide();
      messageApi.error('Có lỗi xảy ra, vui lòng thử lại.', 2);
      console.error('Error:', error);
    }
  };

  const textSubmit = isCreatePage
    ? 'Thêm mới'
    : isViewPage
      ? 'Xem'
      : 'Cập nhật';

  const formLoading = isCreatePage
    ? isCreateLoading
    : isViewPage
      ? false
      : isUpdateLoading;

  useEffect(() => {
    if (getByIdData) {
      form.setFieldsValue(getByIdData);
    }
  }, [getByIdData]);

  if (isGetByIdLoading) {
    return (
      <AntdForm layout="vertical" {...formProps}>
        {items.map((item, index) => {
          let { type, disabled, placeholder, render, label, ...antdItemProps } =
            item;

          if (typeof label == 'string') {
            label = (
              <span className="font-semibold">
                {label.charAt(0).toUpperCase() + label.slice(1)}
              </span>
            );
          }

          return (
            <AntdForm.Item key={index} label={label} {...antdItemProps}>
              <Skeleton.Input active={true} block />
            </AntdForm.Item>
          );
        })}
        <FormItem label={null}>
          <Button type="primary" disabled>
            {textSubmit}
          </Button>
        </FormItem>
      </AntdForm>
    );
  }

  return (
    <>
      {messageContext}
      <AntdForm
        form={form}
        layout="vertical"
        initialValues={initData}
        onFinish={onFinish}
        {...formProps}
      >
        <Row gutter={gap}>
          {items.map((item, index) => {
            let {
              type,
              disabled,
              placeholder,
              render,
              label,
              ...antdItemProps
            } = item;

            if (typeof label == 'string') {
              label = (
                <span className="font-semibold">
                  {label.charAt(0).toUpperCase() + label.slice(1)}
                </span>
              );
            }

            return (
              <Col
                className={clsx(colSpan > 12 ? 'mx-auto' : '')}
                span={item.colSpan ?? colSpan}
              >
                <AntdForm.Item key={index} label={label} {...antdItemProps}>
                  {render
                    ? render()
                    : renderItem(type, disabled, placeholder || '')}
                </AntdForm.Item>
              </Col>
            );
          })}

          <Col
            className={clsx(colSpan > 12 ? 'mx-auto' : '')}
            span={colSpan > 12 ? colSpan : 24}
          >
            <FormItem label={null}>
              <Flex justify="end" gap={16}>
                <Button loading={formLoading} type="primary" htmlType="submit">
                  {textSubmit}
                </Button>
              </Flex>
            </FormItem>
          </Col>
        </Row>
      </AntdForm>
    </>
  );
};
