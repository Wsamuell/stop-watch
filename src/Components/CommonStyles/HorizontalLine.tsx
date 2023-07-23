import { HorizontalLineSize, ThemeMode } from '../Helpers/Enums';
import { textColorMode } from './ColorTheme';
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
        className={`w-1 ${height} bg-${textColorMode(
          currentMode
        )} justify-around`}
      ></div>
    </FlexColumn>
  );
};

export default HorizontalLine;
