import { ThemeMode, TimerState } from '../Helpers/Enums';

export const bgColorMode = (currentMode: ThemeMode) => {
  switch (currentMode) {
    case ThemeMode.Light:
      return 'bg-slate-800';
    case ThemeMode.Dark:
      return 'bg-slate-50';
    default:
      return 'bg-lightModeBlack';
  }
};

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
    case TimerState.Running:
    case TimerState.Paused:
      return 'bg-gray-500';
  }
};

export const startButtonColorMode = (timerState: TimerState) => {
  switch (timerState) {
    case TimerState.Select:
    case TimerState.Running:
    case TimerState.Paused:
      return 'bg-blue-700';
  }
};
