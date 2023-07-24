import { ThemeMode } from '../Helpers/Enums';
import { bgColorMode, borderColorMode, boxTextColorMode } from './ColorTheme';
import FlexColumn from './FlexColumn';

type Props = {
  children: number;
  description: string;
  currentMode: ThemeMode;
};

const TimerComponentBox = ({ children, description, currentMode }: Props) => {
  return (
    <FlexColumn
      styles={`md:h-40 md:w-40 h-20 w-20 items-center p-3 border ${borderColorMode(
        currentMode
      )} rounded ${bgColorMode(
        currentMode
      )} m-3 opacity-90 flex justify-center shadow-md`}
    >
      <div className={`md:text-9xl text-5xl ${boxTextColorMode(currentMode)}`}>
        {children}
      </div>
      <div className={`md:text-sm text-xs ${boxTextColorMode(currentMode)}`}>
        {description}
      </div>
    </FlexColumn>
  );
};
export default TimerComponentBox;
