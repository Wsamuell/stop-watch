import React, { Fragment, useEffect } from 'react';
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
  const [days, setDays] = React.useState<TimerProps['days']>(0);
  const [hours, setHours] = React.useState<TimerProps['hours']>(0);
  const [minutes, setMinutes] = React.useState<TimerProps['minutes']>(0);
  const [seconds, setSeconds] = React.useState<TimerProps['seconds']>(0);
  const [timerState, setTimerState] = React.useState(TimerState.Select);
  const [startTime, setStartTime] = React.useState<number>(0);
  const [intervalId, setIntervalId] = React.useState<number | null>(null);

  const DisabledState =
    days === 0 && hours === 0 && minutes === 0 && seconds === 0;

  const duration = convertToDuration({
    totalSeconds: getTotalInSeconds as number,
    days: days as number, // Cast to non-nullable types
    hours: hours as number,
    minutes: minutes as number,
    seconds: seconds as number,
  });
  // const getTotalInSeconds = (duration: TimerProps) => {
  //   return (
  //     duration.days * 86400 +
  //     duration.hours * 3600 +
  //     duration.minutes * 60 +
  //     duration.seconds
  //   );
  // };

  const handleStart = () => {
    setTimerState(TimerState.Running);
    setStartTime(Date.now());
    requestAnimationFrame(updateTimer);
  };

  const handleCancel = () => {
    setTimerState(TimerState.Select);
    setDays(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    if (intervalId !== null) {
      cancelAnimationFrame(intervalId);
      setIntervalId(null);
    }
  };
  const time = new Date();
  // const currentTime = Date.now();
  // const elapsedTime = Math.floor((currentTime - startTime) / 1000);
  console.log(time);
  // console.log(elapsedTime);

  const updateTimer = () => {
    const currentTime = Date.now();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);

    const countdownDuration = convertToDuration({
      // getTotalInSeconds: getTotalInSeconds as number,
      days: days as number, // Cast to non-nullable types
      hours: hours as number,
      minutes: minutes as number,
      seconds: seconds as number,
    });

    const remainingTimeInSeconds =
      countdownDuration - getTotalInSeconds(elapsedTime);

    if (remainingTimeInSeconds > 0) {
      const remainingDuration = convertToDuration({
        seconds: remainingTimeInSeconds,
      });

      setDays(remainingDuration.getDays);
      setHours(remainingDuration.getHours);
      setMinutes(remainingDuration.getMinutes);
      setSeconds(remainingDuration.getSeconds);

      setIntervalId(requestAnimationFrame(updateTimer));
    } else {
      handleCancel(); // Countdown finished, reset the timer
    }
  };

  // BKMRK: actaully i think it would be smart to use requestAnimationFrame so ill focus on that

  return (
    <FlexColumn styles="p-3 items-center">
      {timerState === TimerState.Select && (
        <FlexRow styles="">
          <Input
            childText="Days"
            value={days}
            onChange={(event) => setDays(Number(event.target.value))}
            placeholder="00"
          />
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
      {timerState !== TimerState.Select && (
        <FlexRow styles="">
          {duration.getDays > 0 && (
            <Fragment>
              <TimerComponentBox
                description={`${duration.getDays > 1 ? 'DAYS' : 'DAY'}`}
              >
                {duration.getDays}
              </TimerComponentBox>
              <TimerDot />
            </Fragment>
          )}
          <TimerComponentBox
            description={`${duration.getHours > 1 ? 'HOURS' : 'HOUR'}`}
          >
            {duration.getHours}
          </TimerComponentBox>
          <TimerDot />
          <TimerComponentBox
            description={`${duration.getMinutes > 1 ? 'MINUTES' : 'MINUTE'}`}
          >
            {duration.getMinutes}
          </TimerComponentBox>
          <TimerDot />
          <TimerComponentBox
            description={`${duration.getSeconds > 1 ? 'SECONDS' : 'SECOND'}`}
          >
            {duration.getSeconds}
          </TimerComponentBox>
        </FlexRow>
      )}
      <FlexRow styles="w-1/2 justify-between">
        <Button
          onClick={() => console.log('Cancel')}
          children="Cancel"
          disabled={DisabledState}
        />

        <Button
          onClick={() => console.log('Start')}
          children="Start"
          disabled={DisabledState}
        />
      </FlexRow>
    </FlexColumn>
  );
};

export default Timer;
