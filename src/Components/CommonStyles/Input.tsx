import { ChangeEvent } from 'react';
import FlexColumn from './FlexColumn';
import { ThemeMode } from '../Helpers/Enums';
import { boxTextColorMode, textColorMode } from './ColorTheme';

type Props = {
  childText?: string;
  value: number | '';
  placeholder?: string;
  onChange: (value: number) => void;
  currentMode: ThemeMode;
};

const Input = ({
  childText,
  value,
  placeholder = '00',
  onChange,
  currentMode,
}: Props) => {
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
    <FlexColumn
      styles={`items-center p-3 border rounded bg-${textColorMode(
        currentMode
      )} m-3 opacity-75 border-${textColorMode(
        currentMode
      )} md:w-40 md:h-40 w-20 h-20 justify-between`}
    >
      <input
        className={`md:w-20 md:h-20 w-10 h-10 md:text-5xl text-2xl text-center outline-none text-${boxTextColorMode(
          currentMode
        )}`}
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
