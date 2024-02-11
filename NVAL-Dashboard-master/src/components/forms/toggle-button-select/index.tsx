import {
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import * as React from "react";
type ToggleButtonSelectProps = {
  name: string;
  selectValues: string[];
} & ToggleButtonGroupProps;

const ToggleButtonSelect = ({
  name,
  selectValues,
  ...otherProps
}: ToggleButtonSelectProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <ToggleButtonGroup {...field} {...otherProps} color="warning" exclusive>
          {selectValues.map((val: string, index: number) => (
            <ToggleButton
              key={index}
              size="small"
              value={val}
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              {val}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    />
  );
};

export default ToggleButtonSelect;
