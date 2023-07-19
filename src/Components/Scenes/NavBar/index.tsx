import { useState } from 'react';
import Button from '../../CommonStyles/Button';
import FlexRow from '../../CommonStyles/FlexRow';
import { SunIcon } from '@heroicons/react/20/solid';
import { MoonIcon } from '@heroicons/react/24/outline';
import { ThemeMode } from '../../Helpers/Enums';
import { motion } from 'framer-motion';

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
    <FlexRow styles="justify-between items-center p-4">
      <div className="line-through">RINA'S TIMER</div>
      <Button onClick={toggleTheme}>
        {currentMode === ThemeMode.Light ? (
          <SunIcon className="h-6 w-6" />
        ) : (
          <MoonIcon className="h-6 w-6" />
        )}
      </Button>
    </FlexRow>
  );
};

export default NavBar;
