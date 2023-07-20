import { TimerProps } from './Interfaces';

export const convertToDuration = ({
  days,
  hours,
  minutes,
  seconds,
}: TimerProps) => {
  const getTotalInSeconds =
    days * 86400 + hours * 3600 + minutes * 60 + seconds;
  const getDays = Math.floor(getTotalInSeconds / 86400);
  const remainingSecondsAfterDays = getTotalInSeconds % 86400;

  const getHours = Math.floor(remainingSecondsAfterDays / 3600);
  const remainingSecondsAfterHours = remainingSecondsAfterDays % 3600;

  const getMinutes = Math.floor(remainingSecondsAfterHours / 60);
  const remainingSecondsAfterMinutes = remainingSecondsAfterDays % 60;

  const getSeconds = Math.floor(remainingSecondsAfterMinutes % 60);
  return { getDays, getHours, getMinutes, getSeconds };
};
