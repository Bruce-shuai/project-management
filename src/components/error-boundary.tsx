// 错误边界
import React, { ReactNode } from "react";

// 错误边界的实现一定要使用类组件
// children:ReactNode 这两个挺搭的---必须搭配(本来就是这样设计的)
type FallbackRender = (props: { error: Error | null }) => React.ReactElement;
// <{children: ReactNode, fallbackRender: FallbackRender}, any> 可以写成 React.Component<React.PropsWithChildren<{fallbackRender: FallbackRender}>>
export class ErrorBoundary extends React.Component<
  { children: ReactNode; fallbackRender: FallbackRender },
  { error: Error | null }
> {
  state = { error: null };

  // 当子组件抛出异常，这里会接收到并且调用
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
