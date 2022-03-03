import { Components } from '@mui/material/styles/components';
import CustomThemeOptions from './custom_theme_options';

const themeComponents = (
  customThemeOptions: CustomThemeOptions,
): Components => {
  const bgColor = customThemeOptions.colors?.grey50;

  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: '4px',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: '12px',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          color: customThemeOptions.colors?.textDark,
          padding: '24px',
        },
        title: {
          fontSize: '1.125rem',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: customThemeOptions.darkTextPrimary,
          paddingTop: '10px',
          paddingBottom: '10px',
          '&.Mui-selected': {
            color: customThemeOptions.menuSelected,
            backgroundColor: customThemeOptions.menuSelectedBack,
            '&:hover': {
              backgroundColor: customThemeOptions.menuSelectedBack,
            },
            '& .MuiListItemIcon-root': {
              color: customThemeOptions.menuSelected,
            },
          },
          '&:hover': {
            backgroundColor: customThemeOptions.menuSelectedBack,
            color: customThemeOptions.menuSelected,
            '& .MuiListItemIcon-root': {
              color: customThemeOptions.menuSelected,
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: customThemeOptions.darkTextPrimary,
          minWidth: '36px',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: customThemeOptions.textDark,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: customThemeOptions.textDark,
          '&::placeholder': {
            color: customThemeOptions.darkTextSecondary,
            fontSize: '0.875rem',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: bgColor,
          borderRadius: '12px',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: customThemeOptions.colors?.grey400,
          },
          '&:hover $notchedOutline': {
            borderColor: customThemeOptions.colors?.primaryLight,
          },
          '&.MuiInputBase-multiline': {
            padding: 1,
          },
        },
        input: {
          fontWeight: 500,
          background: bgColor,
          padding: '15.5px 14px',
          borderRadius: '12px',
          '&.MuiInputBase-inputSizeSmall': {
            padding: '10px 14px',
            '&.MuiInputBase-inputAdornedStart': {
              paddingLeft: 0,
            },
          },
        },
        inputAdornedStart: {
          paddingLeft: 4,
        },
        notchedOutline: {
          borderRadius: `12px`,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: customThemeOptions.colors?.grey300,
          },
        },
        mark: {
          backgroundColor: customThemeOptions.paper,
          width: '4px',
        },
        valueLabel: {
          color: customThemeOptions?.colors?.primaryLight,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: customThemeOptions.divider,
          opacity: 1,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: customThemeOptions.colors?.primaryDark,
          background: customThemeOptions.colors?.primary200,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-deletable .MuiChip-deleteIcon': {
            color: 'inherit',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: customThemeOptions.paper,
          background: customThemeOptions.colors?.grey700,
        },
      },
    },
  };
};

export default themeComponents;
