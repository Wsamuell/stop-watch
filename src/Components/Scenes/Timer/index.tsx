import React, { ChangeEvent, Fragment, useEffect } from 'react';
import Input from '../../CommonStyles/Input';
import FlexRow from '../../CommonStyles/FlexRow';
import FlexColumn from '../../CommonStyles/FlexColumn';
import Button from '../../CommonStyles/Button';
import { TimerState } from '../../Helpers/Enums';
import { TimerProps } from '../../Helpers/Interfaces';
import { convertToDuration } from '../../Helpers/TimeHelpers';
import TimerComponentBox from '../../CommonStyles/TimerComponentBox';
import TimerDot from '../../CommonStyles/TimerDot';

type Props = {};

const Timer = ({}: Props) => {
  const [hours, setHours] = React.useState<TimerProps['hours']>(0);
  const [minutes, setMinutes] = React.useState<TimerProps['minutes']>(0);
  const [seconds, setSeconds] = React.useState<TimerProps['seconds']>(0);
  const [timerState, setTimerState] = React.useState(TimerState.Stopped);
  const DisabledState = hours === 0 && minutes === 0 && seconds === 0;

  const duration = convertToDuration({ hours, minutes, seconds });
  // const startTimer = () => {
  //   setTimerState(TimerState.Running);
  // };

  console.log(convertToDuration({ hours, minutes, seconds }));

  // useEffect(() => {
  //   const updateTimer = () => {
  //     if (hours === 0 && minutes === 0 && seconds === 0) {
  //       clearInterval(intervalId);
  //       // Timer finished, do something here if needed
  //     } else {
  //       if (seconds === 0) {
  //         if (minutes === 0) {
  //           setHours((prev) => prev - 1);
  //           setMinutes(59);
  //         } else {
  //           setMinutes((prev) => prev - 1);
  //         }
  //         setSeconds(59);
  //       } else {
  //         setSeconds((prev) => prev - 1);
  //       }
  //     }
  //   };
  //   const intervalId = setInterval(updateTimer, 1000);

  //   // Cleanup the interval when the component is unmounted
  //   return () => clearInterval(intervalId);
  // }, [hours, minutes, seconds]);
  return (
    <FlexColumn styles="p-3 items-center">
      {timerState === TimerState.Stopped && (
        <FlexRow styles="">
          <Input
            childText="Hours"
            value={hours}
            onChange={(event) => setHours(Number(event.target.value))}
            placeholder="00"
          />
          <Input
            childText="Minutes"
            value={minutes}
            onChange={(event) => setMinutes(Number(event.target.value))}
            placeholder="30"
          />
          <Input
            childText="Seconds"
            value={seconds}
            onChange={(event) => setSeconds(Number(event.target.value))}
            placeholder="00"
          />
        </FlexRow>
      )}
      {timerState === TimerState.Running && (
        <FlexRow styles="text-8xl">
          {duration.getDays > 0 && (
            <Fragment>
              <TimerComponentBox>{duration.getDays}</TimerComponentBox>
              <TimerDot />
            </Fragment>
          )}
          <TimerComponentBox>{duration.getHours}</TimerComponentBox>
          <TimerDot />
          <TimerComponentBox>{duration.getMinutes}</TimerComponentBox>
          <TimerDot />
          <TimerComponentBox>{duration.getSeconds}</TimerComponentBox>
        </FlexRow>
      )}
      <FlexRow styles="w-1/2 justify-between">
        <Button
          onClick={() => setTimerState(TimerState.Stopped)}
          children="Cancel"
          disabled={DisabledState}
        />

        <Button
          onClick={() => setTimerState(TimerState.Running)}
          children="Start"
          disabled={DisabledState}
        />
      </FlexRow>
    </FlexColumn>
  );
};

export default Timer;
