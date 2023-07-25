import { useState } from 'react';
import Timer from './Components/Scenes/Timer';
import NavBar from './Components/Scenes/NavBar';
import { ThemeMode } from './Components/Helpers/Enums';
import Time from './Components/Scenes/Time';
import { motion } from 'framer-motion';
import Footer from './Components/Scenes/Footer';

const App = () => {
  const [currentMode, setCurrentMode] = useState<ThemeMode>(ThemeMode.Light);
  const [rinaMode, setRinaMode] = useState(false);

  const backgroundImg = (currentMode: ThemeMode) => {
    switch (currentMode) {
      case ThemeMode.Light:
        return `bg-[url('../src/assets/Images/light-beach.jpg')]`;
      case ThemeMode.Dark:
        return `bg-[url('../src/assets/Images/dark-road.jpg')]`;
    }
  };
  const rinaModeBg = `bg-[url('../src/assets/Images/rinaBg.jpg')]`;

  return (
    <motion.div
      transition={{ duration: 1, ease: 'easeInOut', delay: 1 }}
      className={`flex flex-col justify-between h-screen bg-cover bg-center ${
        rinaMode ? rinaModeBg : backgroundImg(currentMode)
      }`}
    >
      <NavBar
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
        rinaMode={rinaMode}
        setRinaMode={setRinaMode}
      />
      <Time currentMode={currentMode} />
      <Timer currentMode={currentMode} />
      <Footer currentMode={currentMode} />
    </motion.div>
  );
};

export default App;
