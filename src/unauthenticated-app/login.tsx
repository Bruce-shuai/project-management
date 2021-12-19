import { useAuth } from "context/auth-context";
import { Form, Input, Typography } from "antd";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/useAsync";

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error | null) => void;
}) => {
  const { login, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
    } catch (e) {
      // onError(e);
    }
  };

  return (
    // form格式里的 onSubmit 事件是在form标签上使用，而非button标签
    <Form onFinish={handleSubmit}>
      {user ? (
        <div>登录成功，用户名: {user?.name} </div>
      ) : (
        <Typography.Text type="danger">登录失败</Typography.Text>
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
      <Form.Item>
        <LongButton loading={isLoading} htmlType="submit" type="primary">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
