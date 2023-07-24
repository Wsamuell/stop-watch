import { useState } from 'react';
import Timer from './Components/Scenes/Timer';
import NavBar from './Components/Scenes/NavBar';
import { ThemeMode } from './Components/Helpers/Enums';
import Time from './Components/Scenes/Time';
import { motion } from 'framer-motion';

const App = () => {
  const [currentMode, setCurrentMode] = useState<ThemeMode>(ThemeMode.Light);
  const bgMode =
    currentMode === ThemeMode.Light ? 'bg-light-mode' : 'bg-dark-mode';

  return (
    <motion.div transition={{ duration: 1, ease: 'easeInOut', delay: 1 }}>
      <div className={`h-screen bg-cover bg-center ${bgMode}`}>
        <NavBar currentMode={currentMode} setCurrentMode={setCurrentMode} />
        <Time currentMode={currentMode} />
        <Timer currentMode={currentMode} />
      </div>
    </motion.div>
  );
};

export default App;
