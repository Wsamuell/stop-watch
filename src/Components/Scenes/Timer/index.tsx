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
  const [days, setDays] = React.useState<TimerProps['days']>(0);
  const [hours, setHours] = React.useState<TimerProps['hours']>(0);
  const [minutes, setMinutes] = React.useState<TimerProps['minutes']>(0);
  const [seconds, setSeconds] = React.useState<TimerProps['seconds']>(0);
  const [timerState, setTimerState] = React.useState(TimerState.Stopped);
  const [startTime, setStartTime] = React.useState<number | null>(0);
  const DisabledState = hours === 0 && minutes === 0 && seconds === 0;

  const duration = convertToDuration({ days, hours, minutes, seconds });

  const startTimer = () => {
    console.log(duration);
    setDays(duration.getDays);
    setHours(duration.getHours);
    setMinutes(duration.getMinutes);
    setSeconds(duration.getSeconds);
    setTimerState(TimerState.Running);
    setStartTime(Date.now());
  };

  // useEffect(() => {
  //   if (TimerState.Running) {
  //     const timeElapsed = Date.now() - (startTime || 0);
  //     const timeRemaining = setInterval(() => {
  //       duration.getSeconds - timeElapsed / 1000;
  //     }, 1000);
  //   }
  // }, []);

  return (
    <FlexColumn styles="p-3 items-center">
      {timerState === TimerState.Stopped && (
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
      {timerState === TimerState.Running && (
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
          onClick={() => setTimerState(TimerState.Stopped)}
          children="Cancel"
          disabled={DisabledState}
        />

        <Button
          onClick={startTimer}
          children="Start"
          disabled={DisabledState}
        />
      </FlexRow>
    </FlexColumn>
  );
};

export default Timer;
