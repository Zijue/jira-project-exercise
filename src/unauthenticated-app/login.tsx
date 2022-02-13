import { useAuth } from "context/auth-context";
import { FormEvent } from "react";
import { Button, Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";

export const LoginScreen = () => {
  const { login, user } = useAuth();

  //   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //     event.preventDefault(); //阻止表单的默认提交行为
  //     const username = (event.currentTarget.elements[0] as HTMLInputElement)
  //       .value;
  //     const password = (event.currentTarget.elements[1] as HTMLInputElement)
  //       .value;
  //     login({ username, password });
  //   };
  //使用antd表单的效果
  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名" type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder="密码" type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType="submit" type="primary">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
