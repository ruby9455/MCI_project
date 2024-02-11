import { TextField, TextFieldProps } from "@mui/material";
import { styled, Theme } from "@mui/material/styles";
import { Controller, useFormContext } from "react-hook-form";
import * as React from "react";

const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "primary.main",
    fontWeight: 600,
    fontStyle: "italic",
  },
  "& .MuiInputBase-input": {
    borderColor: "#c8d0d4",
  },
  "& .MuiInput-underline:after": {
    border: "none",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-error": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#d32f2f",
      },
    },
    "& fieldset": {
      borderColor: "#316d8b",
      borderRadius: 0,
    },
    "&:hover fieldset": {
      border: "2px solid #5ca1c4",
    },
    "&.Mui-focused fieldset": {
      border: "2px solid #5ca1c4",
      // boxShadow: "0px 3px 4px  #185e81, 0px 2px 3px #65c7f8",
      // overflow: "hidden visible"
    },
  },
});

type FormInputProps = {
  name: string;
} & TextFieldProps;

const FormInput = ({ name, ...otherProps }: FormInputProps) => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <StyledTextField
          {...field}
          {...otherProps}
          variant="outlined"
          error={!!errors[name]}
          helperText={
            errors[name] ? (errors[name]?.message as unknown as string) : ""
          }
        />
      )}
    />
  );
};

export default FormInput;
