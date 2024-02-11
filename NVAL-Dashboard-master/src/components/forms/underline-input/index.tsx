import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Controller, useFormContext } from "react-hook-form";
import * as React from "react";

const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "primary.light",
  },
  "& .MuiInput-underline:hover:before": {
    borderBottomColor: "primary.main",
  },
  input: { color: "#FFFFFF" },
});

type FormUnderlineInputProps = {
  name: string;
} & TextFieldProps;

const FormUnderlineInput = ({
  name,
  ...otherProps
}: FormUnderlineInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <StyledTextField
          {...field}
          {...otherProps}
          variant="standard"
          error={!!errors[name]}
          helperText={
            errors[name] ? (errors[name]?.message as unknown as string) : ""
          }
        />
      )}
    />
  );
};

export default FormUnderlineInput;
