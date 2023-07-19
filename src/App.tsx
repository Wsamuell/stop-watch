import { useState } from 'react';
import Timer from './Components/Scenes/Timer';
import NavBar from './Components/Scenes/NavBar';
import { ThemeMode } from './Components/Helpers/Enums';
import Time from './Components/Scenes/Time';

const App = () => {
  const [currentMode, setCurrentMode] = useState(ThemeMode.Light);

  return (
    //BKMRK: fix bg opacity later
    <div
      className={`h-screen bg-cover bg-center backdrop-blur-sm ${
        currentMode === ThemeMode.Light ? 'bg-dark-mode' : 'bg-light-mode'
      }`}
    >
      <NavBar currentMode={currentMode} setCurrentMode={setCurrentMode} />
      <Time />
      <Timer />
    </div>
  );
};

export default App;
