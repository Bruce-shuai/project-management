import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import { Card, Divider, Button } from "antd";
import styled from "@emotion/styled";
import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(true);

  return (
    <Background>
      <Container>
        <Header />
        <ShadowCard>
          <Title>{isRegister ? "请注册" : "请登录"}</Title>
          {/* Card 组件感觉还挺有意思的 */}
          {isRegister ? <RegisterScreen /> : <LoginScreen />}
          <Divider />
          <a // 这里变成a标签，着实挺好看的
            onClick={() => {
              setIsRegister(!isRegister);
            }}
          >
            {isRegister ? "已经有账号啦？直接登录" : "没有账号？注册新账号"}
          </a>
        </ShadowCard>
      </Container>
    </Background>
  );
};

// 把其当作普通的react 组件来使用
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
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

// 我艹，这个样式好难
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

export const LongButton = styled(Button)`
  width: 100%;
`;
