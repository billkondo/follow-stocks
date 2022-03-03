import { PaletteOptions } from '@mui/material/styles/createPalette';
import CustomThemeOptions from './custom_theme_options';

const themePallete = (
  customThemeOptions: CustomThemeOptions,
): PaletteOptions => {
  return {
    common: {
      black: customThemeOptions.colors?.darkPaper,
    },
    primary: {
      light: customThemeOptions.colors?.primaryLight,
      main: customThemeOptions.colors?.primaryMain,
      dark: customThemeOptions.colors?.primaryDark,
      200: customThemeOptions.colors?.primary200,
      800: customThemeOptions.colors?.primary800,
    },
    secondary: {
      light: customThemeOptions.colors?.secondaryLight,
      main: customThemeOptions.colors?.secondaryMain,
      dark: customThemeOptions.colors?.secondaryDark,
      200: customThemeOptions.colors?.secondary200,
      800: customThemeOptions.colors?.secondary800,
    },
    error: {
      light: customThemeOptions.colors?.errorLight,
      main: customThemeOptions.colors?.errorMain,
      dark: customThemeOptions.colors?.errorDark,
    },
    orange: {
      light: customThemeOptions.colors?.orangeLight,
      main: customThemeOptions.colors?.orangeMain,
      dark: customThemeOptions.colors?.orangeDark,
    },
    warning: {
      light: customThemeOptions.colors?.warningLight,
      main: customThemeOptions.colors?.warningMain,
      dark: customThemeOptions.colors?.warningDark,
    },
    success: {
      light: customThemeOptions.colors?.successLight,
      200: customThemeOptions.colors?.success200,
      main: customThemeOptions.colors?.successMain,
      dark: customThemeOptions.colors?.successDark,
    },
    grey: {
      50: customThemeOptions.colors?.grey50,
      100: customThemeOptions.colors?.grey100,
      500: customThemeOptions.darkTextSecondary,
      600: customThemeOptions.heading,
      700: customThemeOptions.darkTextPrimary,
      900: customThemeOptions.textDark,
    },
    dark: {
      light: customThemeOptions.colors?.darkTextPrimary,
      main: customThemeOptions.colors?.darkLevel1,
      dark: customThemeOptions.colors?.darkLevel2,
      800: customThemeOptions.colors?.darkBackground,
      900: customThemeOptions.colors?.darkPaper,
    },
    text: {
      primary: customThemeOptions.darkTextPrimary,
      secondary: customThemeOptions.darkTextSecondary,
      dark: customThemeOptions.textDark,
      hint: customThemeOptions.colors?.grey100,
    },
    background: {
      paper: customThemeOptions.paper,
      default: customThemeOptions.backgroundDefault,
    },
  };
};

export default themePallete;
