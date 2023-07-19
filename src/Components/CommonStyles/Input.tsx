import { ChangeEvent } from 'react';
import FlexColumn from './FlexColumn';

type Props = {
  childText?: string;
  value: number;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ childText, value, placeholder = '00', onChange }: Props) => {
  return (
    <FlexColumn styles="items-center p-3 border rounded bg-white m-3">
      <input
        className="w-20 h-20 text-center outline-none"
        type="text"
        value={value}
        pattern="[0-9]{0,2}"
        placeholder={placeholder}
        onChange={onChange}
        maxLength={2}
      />
      {childText && <div>{childText}</div>}
    </FlexColumn>
  );
};

export default Input;
