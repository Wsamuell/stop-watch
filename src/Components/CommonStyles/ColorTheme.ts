import { ThemeMode } from '../Helpers/Enums';

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

export const buttonColorMode = (currentMode: ThemeMode) => {};
