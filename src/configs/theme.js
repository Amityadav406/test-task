import { createTheme } from '@mui/material/styles';

import colors from "./colors";

const theme = {
  // - main colors
  primary: colors.primary,
  secondary: colors.secondary,
  gradient: colors.gradient,
  // - Text
  textPrimary: colors.blackText,
  textSecondary: colors.greyText,
  // - Link
  linkSize: "14px",
  // - Border
  borderColor: colors.borderColor,
};

const materialTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: colors.primary,
    },
  },
  container: {},
});

export { theme, materialTheme };
