import { useAuth } from "context/auth-context";
import { Form, Input, Typography } from "antd";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/useAsync";

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error | null) => void;
}) => {
  const { register, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      // 现在感受到了useAsync 的强大了...
      await run(register(values));
    } catch (e) {
      // onError(e);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      {user ? (
        <div>注册成功，用户名: {user?.name} </div>
      ) : (
        <Typography.Text type="danger">注册失败</Typography.Text>
      )}
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item
        name="confirm-password"
        rules={[
          {
            required: true,
            message: "请再次输入密码!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("两次输入的密码不一致!"));
            },
          }),
        ]}
      >
        <Input placeholder="确认密码" type="password" id="confirm-password" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType="submit" type="primary">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
