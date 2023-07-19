import { ChangeEvent } from 'react';
import FlexRow from './FlexRow';

type Props = {
  childText?: string;
  value: number;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ childText, value, placeholder = '00', onChange }: Props) => {
  return (
    <FlexRow>
      <input
        className=""
        type="number"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {childText && <div>{childText}</div>}
    </FlexRow>
  );
};

export default Input;
