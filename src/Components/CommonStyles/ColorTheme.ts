import { ThemeMode, TimerState } from '../Helpers/Enums';

export const textColorMode = (currentMode: ThemeMode) => {
  switch (currentMode) {
    case ThemeMode.Light:
      return 'black';
    case ThemeMode.Dark:
      return 'white';
    default:
      return 'lightModeBlack';
  }
};

export const boxTextColorMode = (currentMode: ThemeMode) => {
  switch (currentMode) {
    case ThemeMode.Light:
      return 'white';
    case ThemeMode.Dark:
      return 'black';
    default:
      return 'lightModeBlack';
  }
};

export const disabledOpacity = 'opacity-50';

export const cancelButtonColorMode = (timerState: TimerState) => {
  switch (timerState) {
    case TimerState.Select:
      return 'bg-gray-500';
    case TimerState.Running:
    case TimerState.Paused:
      return 'bg-red-600';
  }
};

export const startButtonColorMode = (timerState: TimerState) => {
  switch (timerState) {
    case TimerState.Select:
      return 'bg-blue-700';
    case TimerState.Running:
      return 'bg-yellow-300';
    case TimerState.Paused:
      return 'bg-green-700';
  }
};
