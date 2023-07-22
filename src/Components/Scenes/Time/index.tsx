import React, { useEffect } from 'react';
import FlexColumn from '../../CommonStyles/FlexColumn';
import { textColorMode } from '../../CommonStyles/ColorTheme';
import { ThemeMode } from '../../Helpers/Enums';

type Prop = {
  currentMode: ThemeMode;
};

const Time = ({ currentMode }: Prop) => {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  const updateCurrentTime = () => {
    setCurrentTime(new Date());
    requestAnimationFrame(updateCurrentTime);
  };

  useEffect(() => {
    const animationId = requestAnimationFrame(updateCurrentTime);

    return () => cancelAnimationFrame(animationId);
  }, []);
  return (
    <FlexColumn styles={`items-center p-3 text-${textColorMode(currentMode)}`}>
      <div className="md:text-7xl text-3xl opacity-50 font-light italic">
        {currentTime.toLocaleTimeString()}
      </div>
    </FlexColumn>
  );
};

export default Time;
