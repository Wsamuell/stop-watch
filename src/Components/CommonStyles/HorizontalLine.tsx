import { HorizontalLineSize, ThemeMode } from '../Helpers/Enums';
import { bgColorMode } from './ColorTheme';
import FlexColumn from './FlexColumn';

type Props = {
  currentMode: ThemeMode;
  height?: HorizontalLineSize;
};

const HorizontalLine = ({
  currentMode,
  height = HorizontalLineSize.Medium,
}: Props) => {
  return (
    <FlexColumn styles="justify-around">
      <div
        className={`w-1 ${height} ${bgColorMode(
          currentMode
        )} justify-around opacity-50`}
      ></div>
    </FlexColumn>
  );
};

export default HorizontalLine;
