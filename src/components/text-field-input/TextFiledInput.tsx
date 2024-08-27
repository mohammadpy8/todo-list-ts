"use client";

import { Box, InputAdornment, TextField, Typography } from "@mui/material";

import { Controller } from "react-hook-form";
import { TTextFieldInput } from "./TextFieldInput.type";

function TextFiledInput({ titleInput, addortmentItems, name = "", ...rest }: TTextFieldInput) {
  return (
    <Box width="100%">
      <Typography fontSize="13px" mb="5px">
        {titleInput}
      </Typography>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => {
          return (
            <>
              <TextField
                error={error?.message as any}
                {...field}
                {...rest}
                sx={{
                  "&.MuiFormControl-root": {
                    width: "100%"
                  }
                }}
                id="outlined-adornment-password"
                InputProps={{
                  sx: {
                    "& input": {
                      height: "1rem",
                      width: "100%",
                      color: "#797979",
                      border: "none",
                      backgroundColor: "white",
                      borderRadius: "0 !important",
                      paddingRight: "5px",
                      textAlign: "left",
                      fontWeight: "bold"
                    },
                    borderRadius: "0.99rem",
                    paddingRight: 1
                  },
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{
                        backgroundColor: "transparent",
                        height: "100%",
                        paddingRight: "0.2rem",
                        "& p": {
                          minWidth: "40px",
                          color: "white",
                          textAlign: "center"
                        }
                      }}
                    >
                      {addortmentItems}
                    </InputAdornment>
                  )
                }}
              />
              <Typography fontSize="13px" color="error" mt="5px">
                {error?.message}
              </Typography>
            </>
          );
        }}
      />
    </Box>
  );
}

export default TextFiledInput;
