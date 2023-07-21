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
      className={`h-screen bg-cover bg-center ${
        currentMode === ThemeMode.Light ? 'bg-light-mode' : 'bg-dark-mode'
      } `} // BKMRK: I dont think we need opacity but opacity-80 seems fine
    >
      <NavBar currentMode={currentMode} setCurrentMode={setCurrentMode} />
      <Time />
      <Timer />
    </div>
  );
};

export default App;
