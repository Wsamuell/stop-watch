import { useState } from 'react';
import Timer from './Components/Scenes/Timer';
import NavBar from './Components/Scenes/NavBar';
import { ThemeMode } from './Components/Helpers/Enums';
import Time from './Components/Scenes/Time';
// import { AnimatePresence, motion } from 'framer-motion';

const App = () => {
  const [currentMode, setCurrentMode] = useState<ThemeMode>(ThemeMode.Light);
  const bgMode =
    currentMode === ThemeMode.Light ? 'bg-light-mode' : 'bg-dark-mode';

  // BKMRK: smooth transition between bg images fix later
  // <AnimatePresence>
  //   <motion.div
  //     style={{
  //       height: '100vh', // Set height to 100% of viewport height
  //       width: '100vw', // Set width to 100% of viewport width
  //       backgroundImage: `${tester}`,
  //     }}
  //     initial={{ opacity: 0 }} // Initial opacity when the component mounts
  //     animate={{ opacity: 1 }} // Animate to full opacity
  //     exit={{ opacity: 0 }} // Animate to opacity 0 when exiting
  //   >
  //     <div className={`h-screen bg-cover bg-center ${bgMode}`}>
  //       <NavBar currentMode={currentMode} setCurrentMode={setCurrentMode} />
  //       <Time currentMode={currentMode} />
  //       <Timer currentMode={currentMode} />
  //     </div>
  //   </motion.div>
  // </AnimatePresence>;

  return (
    //BKMRK: fix bg opacity later
    <div className={`h-screen bg-cover bg-center ${bgMode}`}>
      <NavBar currentMode={currentMode} setCurrentMode={setCurrentMode} />
      <Time currentMode={currentMode} />
      <Timer currentMode={currentMode} />
    </div>
  );
};

export default App;
