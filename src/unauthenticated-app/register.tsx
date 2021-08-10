import { useAuth } from "context/auth-context";
import { Form, Input, Button } from "antd";

export const RegisterScreen = () => {
  const { register, user } = useAuth();
  const handleSubmit = (values: { username: string; password: string }) => {
    // Form组件的使用，让整个页面清爽了好多
    register(values);
  };

  return (
    // form格式里的 onSubmit 事件是在form标签上使用，而非button标签
    <Form onFinish={handleSubmit}>
      {user ? <div>注册成功，用户名: {user?.name} </div> : <div>注册失败</div>}
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id="username" />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <Button htmlType={"submit"} type={"primary"}>
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};
