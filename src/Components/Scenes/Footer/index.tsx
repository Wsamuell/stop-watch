import { textColorMode } from '../../CommonStyles/ColorTheme';
import FlexColumn from '../../CommonStyles/FlexColumn';
import { ThemeMode } from '../../Helpers/Enums';

type Props = {
  currentMode: ThemeMode;
};

const Footer = ({ currentMode }: Props) => {
  return (
    <FlexColumn styles={`p-6 ${textColorMode(currentMode)}`}>
      Samuel Odubamowo
    </FlexColumn>
  );
};

export default Footer;
