import type { Palette, PaletteOptions, ButtonPropsVariantOverrides } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    todoColor: {
      base: string;
      primary: string;
      secondary: string;
      done: string;
      notDone: string;
    };
  }
  interface PaletteOptions {
    todoColor: {
      base: string;
      primary: string;
      secondary: string;
      done: string;
      notDone: string;
    };
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    secondary: true;
    error: true;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsVariantOverrides {
    done: true;
    notDone: true;
  }
}
