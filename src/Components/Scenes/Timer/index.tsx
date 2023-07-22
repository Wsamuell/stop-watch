import { Fragment, useState, useEffect, useMemo } from 'react';
import Input from '../../CommonStyles/Input';
import FlexRow from '../../CommonStyles/FlexRow';
import FlexColumn from '../../CommonStyles/FlexColumn';
import Button from '../../CommonStyles/Button';
import { MusicStatus, TimerState } from '../../Helpers/Enums';
import { TimerProps } from '../../Helpers/Interfaces';
import {
  convertToDuration,
  dayString,
  hourString,
  minuteString,
  secondString,
} from '../../Helpers/TimeHelpers';
import TimerComponentBox from '../../CommonStyles/TimerComponentBox';
import TimerDot from '../../CommonStyles/TimerDot';
import ProgressBar from '../../CommonStyles/ProgressBar';
import Serenity from '../../../assets/Music/Serenity.mp3';

type Props = {};

const Timer = ({}: Props) => {
  const [days, setDays] = useState<TimerProps['days']>(0);
  const [hours, setHours] = useState<TimerProps['hours']>(0);
  const [minutes, setMinutes] = useState<TimerProps['minutes']>(0);
  const [seconds, setSeconds] = useState<TimerProps['seconds']>(0);
  const [timerState, setTimerState] = useState(TimerState.Select);
  const [timerCompleted, setTimerCompleted] = useState(false);
  const [audioStatus, setAudioStatus] = useState<MusicStatus>(
    MusicStatus.Paused
  );
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [remainingTime, setRemainingTime] = useState<TimerProps['seconds']>(0);
  const [originalTimePriorToClear, setOriginalTimePriorToClear] =
    useState<TimerProps['seconds']>(0);

  const [intervalId, setIntervalId] = useState<number | null>(null);
  const audio = useMemo(() => new Audio(Serenity), []);

  const DisabledStateStartButton =
    days === 0 && hours === 0 && minutes === 0 && seconds === 0;
  const DisabledStateCancelButton =
    days === 0 &&
    hours === 0 &&
    minutes === 0 &&
    seconds === 0 &&
    audioStatus !== MusicStatus.Paused;

  const duration = convertToDuration({
    days: days as number,
    hours: hours as number,
    minutes: minutes as number,
    seconds: seconds as number,
  });
  const timerProgress =
    ((originalTimePriorToClear - remainingTime) / originalTimePriorToClear) *
    100;
  const showOriginalTimePriorToClear = () => {
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
  };

  const handleStartOrPause = (timerState: TimerState) => {
    if (timerState === TimerState.Select) {
      setTimerState(TimerState.Running);
      setStartTime(new Date());
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
    if (audioStatus === MusicStatus.Playing) {
      console.log(audioStatus);
      audio.pause();
      audio.currentTime = 0;
      setAudioStatus(MusicStatus.Paused);
      return;
    }
    console.log(audioStatus, 'second');
    if (timerState === TimerState.Select) {
      setTimerState(TimerState.Select);
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    } else if (timerState === TimerState.Running) {
      setTimerState(TimerState.Stopped);
      showOriginalTimePriorToClear();
    }
    if (intervalId !== null) {
      setIntervalId(null);
    }
  };

  useEffect(() => {
    if (timerState !== TimerState.Running && remainingTime === 0) {
      showOriginalTimePriorToClear();
      setTimerCompleted(true);
      if (timerCompleted) {
        audio.play();
        setAudioStatus(MusicStatus.Playing);
      } else {
        audio.pause();
        setAudioStatus(MusicStatus.Paused);
      }
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
            childText={dayString(days)}
            value={days}
            onChange={(event) => setDays(Number(event.target.value))}
            placeholder="00"
          />
          <Input
            childText={hourString(hours)}
            value={hours}
            onChange={(event) => setHours(Number(event.target.value))}
            placeholder="00"
          />
          <Input
            childText={minuteString(minutes)}
            value={minutes}
            onChange={(event) => setMinutes(Number(event.target.value))}
            placeholder="30"
          />
          <Input
            childText={secondString(seconds)}
            value={seconds}
            onChange={(event) => setSeconds(Number(event.target.value))}
            placeholder="00"
          />
        </FlexRow>
      )}
      {timerState !== TimerState.Select && (
        <FlexColumn>
          <FlexRow styles="">
            {duration.getDays > 0 && (
              <Fragment>
                <TimerComponentBox description={dayString(days)}>
                  {days}
                </TimerComponentBox>
                <TimerDot />
              </Fragment>
            )}
            <TimerComponentBox description={hourString(hours)}>
              {hours}
            </TimerComponentBox>
            <TimerDot />
            <TimerComponentBox description={minuteString(minutes)}>
              {minutes}
            </TimerComponentBox>
            <TimerDot />
            <TimerComponentBox description={secondString(seconds)}>
              {seconds}
            </TimerComponentBox>
          </FlexRow>
          <ProgressBar progress={timerProgress} />

          <div className="opacity-70 font-light text-xs italic">
            Start Time: {startTime.toLocaleTimeString()}
          </div>
        </FlexColumn>
      )}
      <FlexRow styles="w-1/2 justify-between">
        <Button
          onClick={() => handleClearOrCancel(timerState)}
          children={timerState === TimerState.Select ? 'Clear' : 'Cancel'}
          disabled={DisabledStateCancelButton}
        />

        <Button
          onClick={() => handleStartOrPause(timerState)}
          children={timerState === TimerState.Select ? 'Start' : 'Pause'}
          disabled={DisabledStateStartButton}
        />
      </FlexRow>
    </FlexColumn>
  );
};

export default Timer;
