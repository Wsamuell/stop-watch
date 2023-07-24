import { ThemeMode, TimerState } from '../Helpers/Enums';

// these would be better as enums but this project is too small
export const bgColorMode = (currentMode: ThemeMode) => {
  switch (currentMode) {
    case ThemeMode.Light:
      return 'bg-slate-800';
    case ThemeMode.Dark:
      return 'bg-slate-50';
  }
};
export const borderColorMode = (currentMode: ThemeMode) => {
  switch (currentMode) {
    case ThemeMode.Light:
      return 'border-slate-800';
    case ThemeMode.Dark:
      return 'border-slate-50';
  }
};
export const lightModeColorSwitch = (currentMode: ThemeMode) => {
  switch (currentMode) {
    case ThemeMode.Light:
      return '#a5a5a5';
    case ThemeMode.Dark:
      return '#ffffff';
  }
};

export const textColorMode = (currentMode: ThemeMode) => {
  switch (currentMode) {
    case ThemeMode.Light:
      return 'text-slate-800';
    case ThemeMode.Dark:
      return 'text-slate-50';
  }
};

export const boxTextColorMode = (currentMode: ThemeMode) => {
  switch (currentMode) {
    case ThemeMode.Light:
      return 'text-slate-50';
    case ThemeMode.Dark:
      return 'text-slate-800';
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
