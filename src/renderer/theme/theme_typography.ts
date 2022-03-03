import { TypographyOptions } from '@mui/material/styles/createTypography';
import CustomThemeOptions from './custom_theme_options';

const themeTypography = (
  customThemeOptions: CustomThemeOptions,
): TypographyOptions => {
  return {
    fontFamily: `'Varela Round', sans-serif`,
    h6: {
      fontWeight: 500,
      color: customThemeOptions.heading,
      fontSize: '0.75rem',
    },
    h5: {
      fontSize: '0.875rem',
      color: customThemeOptions.heading,
      fontWeight: 500,
    },
    h4: {
      fontSize: '1rem',
      color: customThemeOptions.heading,
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.25rem',
      color: customThemeOptions.heading,
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.5rem',
      color: customThemeOptions.heading,
      fontWeight: 700,
    },
    h1: {
      fontSize: '2.125rem',
      color: customThemeOptions.heading,
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: customThemeOptions.textDark,
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 400,
      color: customThemeOptions.darkTextSecondary,
    },
    caption: {
      fontSize: '0.75rem',
      color: customThemeOptions.darkTextSecondary,
      fontWeight: 400,
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.334em',
    },
    body2: {
      letterSpacing: '0em',
      fontWeight: 400,
      lineHeight: '1.5em',
      color: customThemeOptions.darkTextPrimary,
    },
    button: {
      textTransform: 'capitalize',
    },
    mainContent: {
      backgroundColor: customThemeOptions.background,
      width: '100%',
      minHeight: 'calc(100vh - 88px)',
      flexGrow: 1,
      padding: '20px',
      marginTop: '88px',
      marginRight: '20px',
      borderRadius: '12px',
    },
    menuCaption: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: customThemeOptions.heading,
      padding: '6px',
      textTransform: 'capitalize',
      marginTop: '10px',
    },
    subMenuCaption: {
      fontSize: '0.6875rem',
      fontWeight: 500,
      color: customThemeOptions.darkTextSecondary,
      textTransform: 'capitalize',
    },
    commonAvatar: {
      cursor: 'pointer',
      borderRadius: '8px',
    },
    smallAvatar: {
      width: '22px',
      height: '22px',
      fontSize: '1rem',
    },
    mediumAvatar: {
      width: '34px',
      height: '34px',
      fontSize: '1.2rem',
    },
    largeAvatar: {
      width: '44px',
      height: '44px',
      fontSize: '1.5rem',
    },
  };
};

export default themeTypography;
