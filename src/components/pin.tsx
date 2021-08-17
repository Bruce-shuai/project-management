import React from "react";
import { Rate } from "antd";

// 又是要具备透传能力
interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Pin = (props: PinProps) => {
  const { checked, onCheckedChange, ...restProps } = props;
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckedChange?.(!!num)}
      // 透传效果
      {...restProps}
    />
  );
};
