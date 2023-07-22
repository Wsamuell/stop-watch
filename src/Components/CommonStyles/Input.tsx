import { ChangeEvent } from 'react';
import FlexColumn from './FlexColumn';

type Props = {
  childText?: string;
  value: number | '';
  placeholder?: string;
  onChange: (value: number) => void;
};

const Input = ({ childText, value, placeholder = '00', onChange }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (
      inputValue === '' ||
      (/^\d{1,2}$/.test(inputValue) && !isNaN(parseInt(inputValue, 10)))
    ) {
      const parsedValue = inputValue === '' ? 0 : parseInt(inputValue, 10);
      onChange(parsedValue);
    }
  };

  return (
    <FlexColumn styles="items-center p-3 border rounded bg-white m-3 opacity-75">
      <input
        className="w-20 h-20 text-center outline-none"
        type="text"
        value={value === '' ? '' : value.toString()}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={(event) => event.target.select()}
        maxLength={2}
      />
      {childText && <div>{childText}</div>}
    </FlexColumn>
  );
};

export default Input;
