import { Fragment, useState, useEffect, useMemo } from 'react';
import Input from '../../CommonStyles/Input';
import FlexRow from '../../CommonStyles/FlexRow';
import FlexColumn from '../../CommonStyles/FlexColumn';
import Button from '../../CommonStyles/Button';
import {
  HorizontalLineSize,
  LinkType,
  MusicStatus,
  ThemeMode,
  TimerState,
} from '../../Helpers/Enums';
import { TimerProps } from '../../Helpers/Types';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

import {
  convertToDuration,
  dayString,
  hourString,
  minuteString,
  secondString,
} from '../../Helpers/TimeHelpers';
import TimerComponentBox from '../../CommonStyles/TimerComponentBox';
import ProgressBar from '../../CommonStyles/ProgressBar';
import Serenity from '../../../assets/Music/Serenity.mp3';
import {
  cancelButtonColorMode,
  startButtonColorMode,
  textColorMode,
} from '../../CommonStyles/ColorTheme';
import { BookmarkIcon, UserIcon } from '@heroicons/react/24/outline';
import HorizontalLine from '../../CommonStyles/HorizontalLine';
import Spacer from '../../CommonStyles/Spacer';

type Props = { currentMode: ThemeMode };

const Timer = ({ currentMode }: Props) => {
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
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const DisabledStateStartButton =
    days === 0 && hours === 0 && minutes === 0 && seconds === 0;
  const DisabledStateCancelButton =
    days === 0 &&
    hours === 0 &&
    minutes === 0 &&
    seconds === 0 &&
    audioStatus === MusicStatus.Paused;
  const checkIfCancelDisabled = DisabledStateCancelButton
    ? 'opacity-50 cursor-not-allowed'
    : 'opacity-100';
  const checkIfStartDisabled = DisabledStateStartButton
    ? 'opacity-50 cursor-not-allowed'
    : 'opacity-100';
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
    setDays(duration.getDays);
    setHours(duration.getHours);
    setMinutes(duration.getMinutes);
    setSeconds(duration.getSeconds);

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

  useEffect(() => {
    switch (timerState) {
      case TimerState.Running:
        document.title = `${days} : ${hours} : ${minutes} : ${seconds}`;
        break;
      default:
        document.title = `Focus`;
    }
  }, [timerState, days, hours, minutes, seconds]);

  return (
    <FlexColumn styles="p-3 items-center">
      <FlexRow styles="items-center justify-between w-screen p-3">
        <FlexColumn styles="">
          <Button link={LinkType.LinkedIn}>
            <FaLinkedin
              className={`h-6 w-6 m-2 ${textColorMode(
                currentMode
              )} opacity-70 font-light`}
            />
          </Button>
          <Button link={LinkType.GitHub}>
            <FaGithub
              className={`h-6 w-6 m-2 ${textColorMode(
                currentMode
              )} opacity-70 font-light`}
            />
          </Button>
          <Button link={LinkType.Portfolio}>
            <UserIcon
              className={`h-6 w-6 m-2 ${textColorMode(
                currentMode
              )} opacity-70 font-light`}
            />
          </Button>
        </FlexColumn>
        <FlexColumn>
          {timerState === TimerState.Select && (
            <FlexRow styles="flex-wrap justify-center ">
              <Input
                currentMode={currentMode}
                childText={dayString(days)}
                value={days}
                onChange={(newValue) => setDays(newValue)}
              />
              <Input
                currentMode={currentMode}
                childText={hourString(hours)}
                value={hours}
                onChange={(newValue) => setHours(newValue)}
              />
              <Input
                currentMode={currentMode}
                childText={minuteString(minutes)}
                value={minutes}
                onChange={(newValue) => setMinutes(newValue)}
                placeholder="30"
              />
              <Input
                currentMode={currentMode}
                childText={secondString(seconds)}
                value={seconds}
                onChange={(newValue) => setSeconds(newValue)}
              />
            </FlexRow>
          )}
          {timerState !== TimerState.Select && (
            <FlexColumn>
              <FlexRow styles="flex-wrap justify-center">
                {duration.getDays > 0 && (
                  <Fragment>
                    <TimerComponentBox
                      currentMode={currentMode}
                      description={dayString(days)}
                    >
                      {days}
                    </TimerComponentBox>
                  </Fragment>
                )}
                <TimerComponentBox
                  currentMode={currentMode}
                  description={hourString(hours)}
                >
                  {hours}
                </TimerComponentBox>
                <TimerComponentBox
                  currentMode={currentMode}
                  description={minuteString(minutes)}
                >
                  {minutes}
                </TimerComponentBox>
                <TimerComponentBox
                  currentMode={currentMode}
                  description={secondString(seconds)}
                >
                  {seconds}
                </TimerComponentBox>
              </FlexRow>
              <FlexColumn>
                <ProgressBar progress={timerProgress} />
                <div
                  className={`opacity-80 font-mono font-light ${textColorMode(
                    currentMode
                  )} text-xs  italic`}
                >
                  Start Time: {startTime.toLocaleTimeString()}
                </div>
              </FlexColumn>
            </FlexColumn>
          )}
          <FlexRow styles="justify-between p-3">
            <Button
              style={`${cancelButtonColorMode(timerState)} ${textColorMode(
                currentMode
              )} font-bold py-2 px-4 rounded-full h-20 w-20 shadow-md
              ${checkIfCancelDisabled}
              `}
              onClick={() => handleClearOrCancel(timerState)}
              children={stopClearButtonText(timerState)}
              disabled={DisabledStateCancelButton}
            />
            <Button
              style={`${startButtonColorMode(timerState)}
              ${textColorMode(currentMode)} 
              ${checkIfStartDisabled}
              font-bold py-2 px-4 rounded-full h-20 w-20 shadow-md`}
              onClick={() => handleStartOrPause(timerState)}
              children={startPauseButtonText(timerState)}
              disabled={DisabledStateStartButton}
            />
          </FlexRow>
        </FlexColumn>
        <FlexColumn styles="justify-center items-center h-full">
          <div
            className={`${textColorMode(
              currentMode
            )} opacity-70 font-light m-2`}
          >
            {weekDays[startTime.getDay()]}
          </div>
          <HorizontalLine
            currentMode={currentMode}
            height={HorizontalLineSize.Large}
          />
          <Spacer size={10} />
          <HorizontalLine
            currentMode={currentMode}
            height={HorizontalLineSize.Small}
          />
          <Button onClick={() => console.log('BMRK Button')}>
            <BookmarkIcon
              className={`h-6 w-6 m-2 ${textColorMode(
                currentMode
              )} opacity-70 font-light`}
            />
          </Button>
        </FlexColumn>
      </FlexRow>
    </FlexColumn>
  );
};

export default Timer;
