import { Fragment, useState, useEffect } from 'react';
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
{
  /* <div className="flex flex-col items-center p-3">
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
              <div
                className="bg-blue-600 text-xs font-medium text-blue-100 text-center leading-none rounded-full"
                style={{ width: `${progress}%` }}
              >
                {Math.floor(progress)}%
              </div>
            </div>
          </div>{' '} // BKMRK fix progress bar later
         */
}
const Timer = ({}: Props) => {
  const [days, setDays] = useState<TimerProps['days']>(0);
  const [hours, setHours] = useState<TimerProps['hours']>(0);
  const [minutes, setMinutes] = useState<TimerProps['minutes']>(0);
  const [seconds, setSeconds] = useState<TimerProps['seconds']>(0);
  const [timerState, setTimerState] = useState(TimerState.Select);
  const [startTime, setStartTime] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<TimerProps['seconds']>(0);
  const [originalTimePriorToClear, setOriginalTimePriorToClear] =
    useState<TimerProps['seconds']>(0);

  const [intervalId, setIntervalId] = useState<number | null>(null);

  const DisabledState =
    days === 0 && hours === 0 && minutes === 0 && seconds === 0;

  const duration = convertToDuration({
    days: days as number,
    hours: hours as number,
    minutes: minutes as number,
    seconds: seconds as number,
  });
  // const progress =
  //   ((duration.getTotalInSeconds - remainingTime)
  //     duration.getTotalInSeconds) *
  //   100;

  const handleStartOrPause = (timerState: TimerState) => {
    if (timerState === TimerState.Select) {
      setTimerState(TimerState.Running);
      setStartTime(Date.now());
      setRemainingTime(duration.getTotalInSeconds);
    } else if (timerState === TimerState.Running) {
      setTimerState(TimerState.Select);
      setDays(duration.getDays);
      setHours(duration.getHours);
      setMinutes(duration.getMinutes);
      setSeconds(duration.getSeconds);
    }
    setOriginalTimePriorToClear(duration.getTotalInSeconds);
  };

  const handleClearOrCancel = (timerState: TimerState) => {
    if (timerState === TimerState.Select) {
      setTimerState(TimerState.Select);
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    } else if (timerState === TimerState.Running) {
      setTimerState(TimerState.Stopped);
      const resetTimer = convertToDuration({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: originalTimePriorToClear,
      });
      setDays(resetTimer.getDays);
      setHours(resetTimer.getHours);
      setMinutes(resetTimer.getMinutes);
      setSeconds(resetTimer.getSeconds);
    }
    if (intervalId !== null) {
      setIntervalId(null);
    }
  };

  useEffect(() => {
    if (timerState !== TimerState.Running || remainingTime === 0) {
      return setTimerState(TimerState.Select);
    }

    const intervalId = window.setInterval(() => {
      setRemainingTime((prevRemainingSeconds) => {
        if (prevRemainingSeconds <= 0) {
          clearInterval(intervalId);
          handleClearOrCancel(timerState);
          return 0;
        }

        const countDown = convertToDuration({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: prevRemainingSeconds - 1,
        });

        setDays(countDown.getDays);
        setHours(countDown.getHours);
        setMinutes(countDown.getMinutes);
        setSeconds(countDown.getSeconds);
        return prevRemainingSeconds - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timerState, remainingTime]);

  return (
    <FlexColumn styles="p-3 items-center">
      {timerState === TimerState.Select && (
        <FlexRow styles="">
          <Input
            childText={`${days > 1 ? 'DAYS' : 'DAY'}`}
            value={days}
            onChange={(event) => setDays(Number(event.target.value))}
            placeholder="00"
          />
          <Input
            childText={`${hours > 1 ? 'HOURS' : 'HOUR'}`}
            value={hours}
            onChange={(event) => setHours(Number(event.target.value))}
            placeholder="00"
          />
          <Input
            childText={`${minutes > 1 ? 'MINUTES' : 'MINUTE'}`}
            value={minutes}
            onChange={(event) => setMinutes(Number(event.target.value))}
            placeholder="30"
          />
          <Input
            childText={`${seconds > 1 ? 'SECONDS' : 'SECOND'}`}
            value={seconds}
            onChange={(event) => setSeconds(Number(event.target.value))}
            placeholder="00"
          />
        </FlexRow>
      )}
      {timerState !== TimerState.Select && (
        <FlexRow>
          <FlexRow styles="">
            {duration.getDays > 0 && (
              <Fragment>
                <TimerComponentBox description={`${days > 1 ? 'DAYS' : 'DAY'}`}>
                  {days}
                </TimerComponentBox>
                <TimerDot />
              </Fragment>
            )}
            <TimerComponentBox description={`${hours > 1 ? 'HOURS' : 'HOUR'}`}>
              {hours}
            </TimerComponentBox>
            <TimerDot />
            <TimerComponentBox
              description={`${minutes > 1 ? 'MINUTES' : 'MINUTE'}`}
            >
              {minutes}
            </TimerComponentBox>
            <TimerDot />
            <TimerComponentBox
              description={`${seconds > 1 ? 'SECONDS' : 'SECOND'}`}
            >
              {seconds}
            </TimerComponentBox>
          </FlexRow>
        </FlexRow>
      )}
      <FlexRow styles="w-1/2 justify-between">
        <Button
          onClick={() => handleClearOrCancel(timerState)}
          children={timerState === TimerState.Select ? 'Clear' : 'Cancel'}
          disabled={DisabledState}
        />

        <Button
          onClick={() => handleStartOrPause(timerState)}
          children={timerState === TimerState.Select ? 'Start' : 'Pause'}
          disabled={DisabledState}
        />
      </FlexRow>
    </FlexColumn>
  );
};

export default Timer;
