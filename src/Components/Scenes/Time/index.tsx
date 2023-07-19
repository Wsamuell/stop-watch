import React, { useEffect } from 'react';
import FlexColumn from '../../CommonStyles/FlexColumn';

const Time = () => {
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
    <FlexColumn styles="items-center p-3">
      <div>{currentTime.toLocaleTimeString()}</div>
    </FlexColumn>
  );
};

export default Time;
