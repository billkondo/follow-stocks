import '@mui/material/styles/createPalette';
import {
  Typography as ITypography,
  TypographyOptions as ITypographyOptions,
} from '@mui/material/styles/createTypography';

declare module '@mui/material/styles/createTypography' {
  interface TypographyOptions extends ITypographyOptions {
    mainContent: TypographyStyleOptions;
    menuCaption: TypographyStyleOptions;
    subMenuCaption: TypographyStyleOptions;
    commonAvatar: TypographyStyleOptions;
    smallAvatar: TypographyStyleOptions;
    mediumAvatar: TypographyStyleOptions;
    largeAvatar: TypographyStyleOptions;
  }

  interface Typography extends ITypography {
    mainContent: TypographyStyleOptions;
    menuCaption: TypographyStyleOptions;
    subMenuCaption: TypographyStyleOptions;
    commonAvatar: TypographyStyleOptions;
    smallAvatar: TypographyStyleOptions;
    mediumAvatar: TypographyStyleOptions;
    largeAvatar: TypographyStyleOptions;
  }
}

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    dark: PaletteColor;
    orange: PaletteColor;
  }

  interface PaletteOptions {
    dark?: PaletteColorOptions;
    orange?: PaletteColorOptions;
  }

  interface TypeText {
    dark: string;
    hint: string;
  }
}
