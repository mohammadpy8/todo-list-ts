import type { TextFieldProps } from "@mui/material";
import type { ReactNode } from "react";

type TTextFieldInput = {
  titleInput: string;
  addortmentItems: string | ReactNode;
  name?: string;
} & Omit<TextFieldProps, "name">;

export type { TTextFieldInput };
