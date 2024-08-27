import type { FC, PropsWithChildren } from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/theme/theme";

type TMuiThemeProvider = PropsWithChildren;

const MuiThemeProvider: FC<TMuiThemeProvider> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiThemeProvider;
