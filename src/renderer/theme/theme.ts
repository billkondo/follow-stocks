import { createTheme, ThemeOptions } from '@mui/material';
import colors from 'renderer/assets/_themes-vars.module.scss';
import CustomThemeOptions from './custom_theme_options';
import themeComponents from './theme_components';
import themePallete from './theme_pallete';
import themeTypography from './theme_typography';

const theme = () => {
  const color: { [key: string]: string } = colors;

  const customThemeOptions: CustomThemeOptions = {
    colors: color,
    heading: color.grey900,
    paper: color.paper,
    backgroundDefault: color.paper,
    background: color.primaryLight,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: color.secondaryDark,
    menuSelectedBack: color.secondaryLight,
    divider: color.grey200,
  };

  const themeOption: ThemeOptions = {
    direction: 'ltr',
    palette: themePallete(customThemeOptions),
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px',
        },
      },
    },
    typography: themeTypography(customThemeOptions),
  };

  const theme = createTheme(themeOption);
  theme.components = themeComponents(customThemeOptions);

  return theme;
};

export default theme;
