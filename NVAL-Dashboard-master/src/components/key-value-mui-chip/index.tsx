import Chip from "@mui/material/Chip";
import { blueGrey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { valuesIn } from "lodash";
import React from "react";

export type KeyValueMuiChipProps = {
  label: string;
  value: string | number;
  borderColor?: string;
  valueTextBgColor?: string;
  valueTextColor?: string;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  fixedLabelWidth?: number;
};

export const KeyValueMuiChip = ({
  label,
  value,
  borderColor = "primary.dark",
  valueTextBgColor = "primary.main",
  valueTextColor = "primary.contrastText",
  size = "medium",
  fullWidth = false,
  fixedLabelWidth = 0,
}: KeyValueMuiChipProps) => {
  const iconFontSize = {
    small: 11,
    medium: 12,
    large: 15,
  };
  const labelFontSize = {
    small: 12,
    medium: 13,
    large: 16,
  };

  const fullWidthStyle = {
    display: "flex",
    flexGrow: 1,
    justifyContent: "start",
    "& > .MuiChip-label": {
      width: "100%",
    },
  };

  const defaultStyle = {
    pl: 0.4,
    py: 2.2,
    borderColor: borderColor,
    borderWidth: 2,
  };

  return (
    <Chip
      sx={[defaultStyle, fullWidth && fullWidthStyle]}
      variant="outlined"
      icon={
        <Typography
          sx={[
            {
              "&.MuiChip-icon": {
                color: "#101D3E",
                fontWeight: 400,
                fontSize: iconFontSize[size],
              },
            },
            fixedLabelWidth > 0 && { minWidth: fixedLabelWidth },
          ]}
        >
          {label}
        </Typography>
      }
      label={
        <Typography
          sx={[
            {
              fontSize: labelFontSize[size],
              borderRadius: 1,
              fontWeight: 400,
              pl: 3,
              pr: 3,
              py: 0.5,
              bgcolor: valueTextBgColor,
              color: valueTextColor,
              textShadow: `1px 1px 0px #5050501f`,
              textAlign: "center",
            },
          ]}
        >
          {value}
        </Typography>
      }
    />
  );
};

export default KeyValueMuiChip;
