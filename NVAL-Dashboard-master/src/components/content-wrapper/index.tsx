import AddIcon from "@mui/icons-material/AddCircleOutline";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Box,
  Button,
  Divider,
  Paper,
  PaperProps,
  Typography,
} from "@mui/material";
import * as React from "react";

type HeaderType = "Default" | "Plain";
type HeaderTitleType = string | React.ReactNode;
type HeaderPaperProps = {
  children?: React.ReactNode;
  childrenBgColor?: string | undefined;
  headerIcon?: React.ReactNode;
  headerTitle: HeaderTitleType;
  headerColor?: string;
  headerTextColor?: string;
  elevation?: number;
  shadows?: number;
  type?: HeaderType;
  plainColor?: string;
  hoverEffect?: boolean;
  plain?: boolean;
  childrenPadding?: boolean;
  addIconHeader?: boolean;
  handleAddAction?: () => void;
  addButtonText?: string;
  small?: boolean;
  noBorder?: boolean;
} & PaperProps;

const ContentWrapper = ({
  children,
  headerTitle,
  headerColor = "primary.light",
  headerIcon = <ArrowDropDownIcon />,
  headerTextColor,
  elevation = 2,
  shadows = 0,
  type = "Default",
  plainColor = "#FDFDFD",
  hoverEffect = false,
  childrenBgColor = undefined,
  plain = false,
  childrenPadding = true,
  addIconHeader = false,
  addButtonText = "Add New",
  handleAddAction,
  small = false,
  noBorder = false,
  ...other
}: HeaderPaperProps) => {
  if (plain) type = "Plain";
  const textColor =
    type === "Plain" ? "#0E1310" : headerTextColor ?? "primary.contrastText";
  const styles = {
    root: {
      width: "100%",
      overflow: "hidden",
    },
    childrenContainer: {
      padding: childrenPadding ? 2 : 0,
      background: `${childrenBgColor === undefined ? "None" : childrenBgColor}`,
    },
    hover: {
      [`&:hover`]: {
        boxShadow: 6,
      },
    },
    headerBox: {
      backgroundColor: `${
        type === "Plain" ? plainColor : headerColor ?? "secondary.light"
      }`,
      display: "flex",
      flexDirection: "row",
    },
    dividerMargin: {
      height: "1px",
      backgroundColor: "#EEEEEE",
      boxShadow: "0px 0px 0px 1px rgba(238,238,238,0.45)",
    },
    header: {
      marginLeft: 1,
      padding: small ? 0.6 : 1.2,
      display: "flex",
      lineHeight: 1.3,
      fontWeight: 700,
      flexDirection: "row",
      alignItems: "center",
      // for each item
      [`& > *`]: {
        marginRight: 0.5,
      },
      color: `${textColor}`,
    },
    addButtonStyle: {
      elevation: 6,
      textTransform: "capitalize",
      // color: "#FFFFFF",
      // border: "2px solid #CCCCCC",
      py: small ? 0.1 : 0.2,
      px: 2,
      mr: 1,
    },
    noBorder: {
      border: "none",
    },
  };

  const addButton = addIconHeader ? (
    <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "row-reverse" }}>
      <Box
        sx={{ justifyContent: "center", display: "flex", flexFlow: "column" }}
      >
        <Button
          variant="contained"
          sx={styles.addButtonStyle}
          onClick={() => handleAddAction && handleAddAction()}
          startIcon={<AddIcon />}
        >
          {addButtonText}
        </Button>
      </Box>
    </Box>
  ) : (
    <></>
  );
  return (
    <Paper
      elevation={elevation}
      {...other}
      sx={[
        styles.root,
        noBorder && styles.noBorder,
        hoverEffect && styles.hover,
      ]}
    >
      {typeof headerTitle === "string" ? (
        <>
          <Box boxShadow={shadows} sx={styles.headerBox}>
            <Typography variant="body1" sx={styles.header}>
              {headerIcon}
              {headerTitle}
            </Typography>
            {addButton}
          </Box>
          {/* draw a line without box shadow effect */}
          {type === "Plain" ? (
            <Divider sx={styles.dividerMargin} />
          ) : (
            shadows > 0 && <Divider />
          )}
        </>
      ) : (
        <>{headerTitle}</>
      )}
      <Box sx={styles.childrenContainer}>{children}</Box>
    </Paper>
  );
};

export default ContentWrapper;
