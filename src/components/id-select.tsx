import { Select } from "antd";
import { Raw } from "types";

// 组件透传 React.ComponentProps 让Select自带的所有类型都传到了SelectProps里去了
type SelectProps = React.ComponentProps<typeof Select>;

// 透传方法真的牛逼
interface IdSelectProps
  // Omit: Construct a type with the properties of T except for those in type K.
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value: Raw | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}
/**
 * value 可以传入多种类型的值
 * onChange 只会回调 number | undefined 类型
 * 当 isNaN(Number(value)) 为true的时候，代表选择默认类型
 * 当选择默认类型的时候，onChange会回调undefined
 * @param props
 */
export const IdSelect = (props: IdSelectProps) => {
  // 这里的解构 有一说一 用得真好
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      // 这里 options?.length 是什么个原理呢？
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

// unknown 类型用起来挺有意思的
const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
