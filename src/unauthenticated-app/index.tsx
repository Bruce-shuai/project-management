import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import { Card, Divider, Button, Typography } from "antd";
import styled from "@emotion/styled";
import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";
import { useDocumentTitle } from "utils";

/* 未登录账户的页面 */
export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useDocumentTitle("请登录注册以继续");

  return (
    <Background>
      <Container>
        <Header />
        <Button
          onClick={() => {
            throw new Error("点击抛出一个异常");
          }}
        >
          抛出异常
        </Button>
        <ShadowCard>
          <Title>{isRegister ? "请注册" : "请登录"}</Title>
          {error ? (
            <Typography.Text type="danger">{error.message}</Typography.Text>
          ) : null}
          {isRegister ? (
            <RegisterScreen onError={setError} />
          ) : (
            <LoginScreen onError={setError} />
          )}
          <Divider />
          {/* 有超链接样式效果的button */}
          <Button
            type="link"
            onClick={() => {
              setIsRegister(!isRegister);
            }}
          >
            {isRegister ? "已经有账号啦？直接登录" : "没有账号？注册新账号"}
          </Button>
        </ShadowCard>
      </Container>
    </Background>
  );
};

// ---------------------------CSS-in-JS---------------------------

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  box-sizing: border-box;
  /* X轴偏移量、Y轴偏移量、模糊半径、扩散半径和颜色 */
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  /* text-align CSS属性定义行内内容（例如文字）
  如何相对它的块父元素对齐。text-align 并不控制块元素自己的对齐，
  只控制它的行内内容的对齐。 */
  text-align: center;
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

// 这个样式挺有意思的
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  /* 这里对于url的使用挺有意思的 */
  background-image: url(${left}), url(${right});
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

export const LongButton = styled(Button)`
  width: 100%;
`;
