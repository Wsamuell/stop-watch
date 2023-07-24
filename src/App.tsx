import { useState } from 'react';
import Timer from './Components/Scenes/Timer';
import NavBar from './Components/Scenes/NavBar';
import { ThemeMode } from './Components/Helpers/Enums';
import Time from './Components/Scenes/Time';
import { motion } from 'framer-motion';

const App = () => {
  const [currentMode, setCurrentMode] = useState<ThemeMode>(ThemeMode.Light);
  // const bgMode =
  //   currentMode === ThemeMode.Light ? 'bg-light-mode' : 'bg-dark-mode';
  const backgroundImg =
    currentMode === ThemeMode.Light
      ? `bg-[url('../src/assets/Images/light-beach.jpg')]`
      : `bg-[url('../src/assets/Images/dark-road.jpg')]`;

  return (
    <motion.div
      transition={{ duration: 1, ease: 'easeInOut', delay: 1 }}
      className={`h-screen bg-cover bg-center ${backgroundImg}`}
    >
      <NavBar currentMode={currentMode} setCurrentMode={setCurrentMode} />
      <Time currentMode={currentMode} />
      <Timer currentMode={currentMode} />
    </motion.div>
  );
};

export default App;
