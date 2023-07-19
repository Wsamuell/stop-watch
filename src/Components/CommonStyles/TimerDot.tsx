import FlexColumn from './FlexColumn';
import { StopIcon } from '@heroicons/react/24/outline';

const TimerDot = () => {
  return (
    <FlexColumn styles="justify-around">
      <StopIcon className="h-3 w-3" />
      <StopIcon className="h-3 w-3" />
    </FlexColumn>
  );
};

export default TimerDot;
