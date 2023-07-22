import Button from '../../CommonStyles/Button';
import FlexRow from '../../CommonStyles/FlexRow';
import { SunIcon } from '@heroicons/react/20/solid';
import { MoonIcon } from '@heroicons/react/24/outline';
import Logo from '../../../assets/Images/logo.png';
import { ThemeMode } from '../../Helpers/Enums';
import FlexColumn from '../../CommonStyles/FlexColumn';
import { textColorMode } from '../../CommonStyles/ColorTheme';

type Props = {
  currentMode: ThemeMode;
  setCurrentMode: React.Dispatch<React.SetStateAction<ThemeMode>>;
};

const NavBar = ({ currentMode, setCurrentMode }: Props) => {
  const toggleTheme = () => {
    setCurrentMode((prevMode) =>
      prevMode === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light
    );
  };

  return (
    <FlexRow
      styles={`justify-between items-center p-4 text-${textColorMode(
        currentMode
      )}`}
    >
      <FlexColumn styles="justify-center">
        <Button
          onClick={() => console.log('Rina Mode')}
          style=" flex justify-center"
        >
          <img alt="logo" src={Logo} className="h-20 w-20" />
        </Button>
        <div className="flex justify-center"> FOCUS</div>
      </FlexColumn>
      <Button
        onClick={toggleTheme}
        style={`border rounded-full py-4 px-4 border-${textColorMode(
          currentMode
        )}`}
      >
        {currentMode === ThemeMode.Light ? (
          <MoonIcon className="h-6 w-6" />
        ) : (
          <SunIcon className="h-6 w-6" />
        )}
      </Button>
    </FlexRow>
  );
};

export default NavBar;
