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
    audioStatus === MusicStatus.Paused;
  const startPauseButtonText = (timerState: TimerState) => {
    switch (timerState) {
      case TimerState.Select:
        return 'Start';
      case TimerState.Running:
        return 'Pause';
      case TimerState.Paused:
        return 'Resume';
    }
  };
  const stopClearButtonText = (timerState: TimerState) => {
    switch (timerState) {
      case TimerState.Select:
        return 'Clear';
      case TimerState.Running:
        return 'Cancel';
      case TimerState.Paused:
        return 'Cancel';
    }
  };

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
    switch (timerState) {
      case TimerState.Select:
        setTimerState(TimerState.Running);
        setStartTime(new Date());
        setRemainingTime(duration.getTotalInSeconds);
        setOriginalTimePriorToClear(duration.getTotalInSeconds);

        break;
      case TimerState.Running:
        setTimerState(TimerState.Paused);

        break;
      case TimerState.Paused:
        setTimerState(TimerState.Running);
        break;
    }
    switch (audioStatus) {
      case MusicStatus.Playing:
        audio.pause();
        audio.currentTime = 0;
        setAudioStatus(MusicStatus.Paused);
        break;
    }

    if (intervalId !== null) {
      setIntervalId(null);
    }
  };

  const handleClearOrCancel = (timerState: TimerState) => {
    switch (audioStatus) {
      case MusicStatus.Playing:
        audio.pause();
        audio.currentTime = 0;
        setAudioStatus(MusicStatus.Paused);
        return;
    }
    switch (timerState) {
      case TimerState.Select:
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        break;
      case TimerState.Running:
        setTimerState(TimerState.Select);
        showOriginalTimePriorToClear();
        break;
      case TimerState.Paused:
        setTimerState(TimerState.Select);
        showOriginalTimePriorToClear();
        break;
    }
    if (intervalId !== null) {
      setIntervalId(null);
    }
  };

  useEffect(() => {
    if (timerState !== TimerState.Running && remainingTime === 0) {
      showOriginalTimePriorToClear();
      setTimerCompleted(true);
      switch (timerCompleted) {
        case true:
          audio.play();
          setAudioStatus(MusicStatus.Playing);
          break;
        case false:
          audio.pause();
          audio.currentTime = 0;
          setAudioStatus(MusicStatus.Paused);
      }
    }

    const intervalId = window.setInterval(() => {
      setRemainingTime((prevRemainingSeconds) => {
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
        return prevRemainingSeconds <= 0
          ? (clearInterval(intervalId), handleClearOrCancel(timerState), 0)
          : prevRemainingSeconds - 1;
      });
    }, 1000);
    timerState !== TimerState.Running ? clearInterval(intervalId) : null;
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
          children={stopClearButtonText(timerState)}
          disabled={DisabledStateCancelButton}
        />

        <Button
          onClick={() => handleStartOrPause(timerState)}
          children={startPauseButtonText(timerState)}
          disabled={DisabledStateStartButton}
        />
      </FlexRow>
    </FlexColumn>
  );
};

export default Timer;
