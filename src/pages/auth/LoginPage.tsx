import { useEffect, useState } from 'react';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Flex, Form, Input, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Joi from 'joi';

import { useAuth } from '@/contexts/auth';

const { Title } = Typography;

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

const LoginPage = () => {
  const { login, error } = useAuth();
  const [loginErrorMsg, setLoginErrorMsg] = useState('');
  const [form] = useForm();

  useEffect(() => {
    if (error) {
      setLoginErrorMsg(error);
    }
  }, [error]);

  const schema = Joi.object({
    email: Joi.string().email({ tlds: false }).required().messages({
      'string.empty': 'Vui lòng nhập email của bạn!',
      'string.email': 'Email không đúng định dạng!',
    }),
    password: Joi.string().required().min(8).messages({
      'string.empty': 'Vui lòng nhập mật khẩu của bạn!',
      'string.min': 'Mật khẩu phải có ít nhất 8 ký tự!',
    }),
    remember: Joi.boolean(),
  });

  const onFinish = async (values: FieldType) => {
    const { error } = schema.validate(values, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => ({
        name: err.path[0],
        errors: [err.message],
      }));

      form.setFields(errors);
      return;
    }

    await login({
      email: values.email || '',
      password: values.password || '',
    });
  };

  return (
    <Flex justify="center" align="center" style={{ height: '100vh' }}>
      <Card style={{ width: 380, padding: 24, borderRadius: 8 }}>
        <Title level={3} style={{ textAlign: 'center' }}>
          Đăng nhập
        </Title>
        <Form
          form={form}
          name="login"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            remember: true,
            email: 'testuser@gmail.com',
            password: '12345678',
          }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email của bạn!' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              autoComplete="email"
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu của bạn!' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mật khẩu"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Ghi nhớ đăng nhập</Checkbox>
          </Form.Item>

          {loginErrorMsg && (
            <Form.Item>
              <Typography.Text type="danger">{loginErrorMsg}</Typography.Text>
            </Form.Item>
          )}

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
};

export default LoginPage;
