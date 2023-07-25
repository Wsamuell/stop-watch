import Button from '../../CommonStyles/Button';
import FlexRow from '../../CommonStyles/FlexRow';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import Logo from '../../../assets/Images/logo.png';
import { ThemeMode } from '../../Helpers/Enums';
import FlexColumn from '../../CommonStyles/FlexColumn';
import {
  lightModeColorSwitch,
  textColorMode,
} from '../../CommonStyles/ColorTheme';
import { motion } from 'framer-motion';
import { useState } from 'react';

type Props = {
  currentMode: ThemeMode;
  rinaMode: boolean;
  setRinaMode: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentMode: React.Dispatch<React.SetStateAction<ThemeMode>>;
};

const NavBar = ({
  currentMode,
  setCurrentMode,
  rinaMode,
  setRinaMode,
}: Props) => {
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
    <FlexRow styles={`justify-between items-center p-4`}>
      <FlexColumn styles={`justify-center ${textColorMode(currentMode)}`}>
        <Button
          onClick={() => setRinaMode(!rinaMode)}
          style=" flex justify-center"
        >
          <img alt="logo" src={Logo} className="h-20 w-20" />
        </Button>
        <div className="flex justify-center"> FOCUS</div>
      </FlexColumn>
      <motion.div
        style={{
          borderRadius: '50%',
          border: `1px solid ${lightModeColorSwitch(currentMode)}`,
          backgroundColor: `${lightModeColorSwitch(currentMode)}`,
        }}
        whileTap={{ rotate: 360 }}
        whileHover={{ scale: 1.1 }}
        animate={{ rotate: isRotating ? 360 : 0 }}
        transition={{ duration: 1 }}
      >
        <Button
          onClick={toggleTheme}
          style={`py-4 px-4 ${lightModeColorSwitch(currentMode)}`}
        >
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
