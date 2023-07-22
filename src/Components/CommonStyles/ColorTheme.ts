import { ThemeMode } from '../Helpers/Enums';

export const textColorMode = (currentMode: ThemeMode) => {
  switch (currentMode) {
    case ThemeMode.Light:
      return 'lightModeBlack';
    case ThemeMode.Dark:
      return 'white';
  }
};
