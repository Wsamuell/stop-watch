import { useState } from 'react';
import Timer from './Components/Scenes/Timer';
import NavBar from './Components/Scenes/NavBar';
import { ThemeMode } from './Components/Helpers/Enums';
import Time from './Components/Scenes/Time';

const App = () => {
  const [currentMode, setCurrentMode] = useState<ThemeMode>(ThemeMode.Light);
  const bgMode =
    currentMode === ThemeMode.Light ? 'bg-light-mode' : 'bg-dark-mode';

  return (
    //BKMRK: fix bg opacity later
    <div className={`h-screen bg-cover bg-center ${bgMode}`}>
      <NavBar currentMode={currentMode} setCurrentMode={setCurrentMode} />
      <Time currentMode={currentMode} />
      <Timer />
    </div>
  );
};

export default App;
