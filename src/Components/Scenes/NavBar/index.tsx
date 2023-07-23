import Button from '../../CommonStyles/Button';
import FlexRow from '../../CommonStyles/FlexRow';
import { SunIcon } from '@heroicons/react/20/solid';
import { MoonIcon } from '@heroicons/react/24/outline';
import Logo from '../../../assets/Images/logo.png';
import { ThemeMode } from '../../Helpers/Enums';
import FlexColumn from '../../CommonStyles/FlexColumn';
import { textColorMode } from '../../CommonStyles/ColorTheme';
import { motion } from 'framer-motion';
import { useState } from 'react';

type Props = {
  currentMode: ThemeMode;
  setCurrentMode: React.Dispatch<React.SetStateAction<ThemeMode>>;
};

const NavBar = ({ currentMode, setCurrentMode }: Props) => {
  const [isRotating, setIsRotating] = useState(false);
  const handleRotateClick = () => {
    setIsRotating(!isRotating);
  };

  const toggleTheme = () => {
    setCurrentMode((prevMode) =>
      prevMode === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light
    );
    handleRotateClick();
  };

  return (
    <FlexRow
      styles={`justify-between items-center p-4 ${textColorMode(currentMode)}`}
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
      <motion.div
        style={{
          borderRadius: '50%',
          border: `1px solid ${textColorMode(currentMode)}`,
        }}
        whileTap={{ rotate: 360 }}
        whileHover={{ scale: 1.1 }}
        animate={{ rotate: isRotating ? 360 : 0 }}
        transition={{ duration: 1 }}
      >
        <Button onClick={toggleTheme} style={`py-4 px-4`}>
          {currentMode === ThemeMode.Light ? (
            <MoonIcon className="h-6 w-6" />
          ) : (
            <SunIcon className="h-6 w-6" />
          )}
        </Button>
      </motion.div>
    </FlexRow>
  );
};

export default NavBar;
