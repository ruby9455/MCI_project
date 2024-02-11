import { defaultTheme } from "react-admin";

export const lightTheme = {
  ...defaultTheme,
  palette: {
    primary: {
      light: "#5e9fdf ",
      main: "#1976d2",
      dark: "#185aac",
      contrastText: "#FFF",
    },
    secondary: {
      light: "#5569aa",
      main: "#223f7a",
      dark: "#001a4d",
      contrastText: "#fff",
    },
    background: {
      default: "#eaeaef",
    },
    mode: "light" as const,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  shape: {
    borderRadius: 10,
  },
  sidebar: {
    width: 200,
    closedWidth: 56, // The default value is 55
  },
  typography: {
    fontFamily: [
      "Open Sans",
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      "Oxygen",
      "ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      "sans-serif",
    ].join(","),
  },
  components: {
    // content layout:
    ...defaultTheme.components,
    RaMenuItemLink: {
      styleOverrides: {
        root: {
          color: "#363643",
          marginRight: "4px",
          borderLeft: "3px solid #fff",
          "&.RaMenuItemLink-active": {
            borderLeft: "5px solid #5e9fdf",
            backgroundColor: "#1976d2",
            color: "#FFF",
            fontStyle: "italic",
            borderTopRightRadius: "12px",
            borderBottomRightRadius: "12px",
            boxShadow: `1px 1px 2px 0px rgba(94,159,223,0.2), 2px 2px 2px 0px rgba(0,0,0,0.1), 3px 3px 3px 0px rgba(0,0,0,0.08)`,
            "& > .RaMenuItemLink-icon": {
              color: "#DEDEDE!important" as any,
            },
          },
        },
      },
    },
    RaLayout: {
      styleOverrides: {
        root: {
          padding: 0,
          "& .RaLayout-content": {
            paddingTop: "1em",
            paddingLeft: "0.5em",
            paddingRight: "0.5em",
            paddingBottom: "0.5em",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: "none",
        },
        root: {
          border: "1px solid #e0e0e3",
          backgroundClip: "padding-box",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {},
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&:hover:active::after": {
            // recreate a static ripple color
            // use the currentColor to make it work both for outlined and contained buttons
            // but to dim the background without dimming the text,
            // put another element on top with a limited opacity
            content: '""',
            display: "block",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: "currentColor",
            opacity: 0.3,
            borderRadius: "inherit",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: `0px 1px 2px 0px rgba(0,0,0,0.1), 0px 2px 2px 0px rgba(0,0,0,0.08), 0px 6px 4px 0px rgba(0,0,0,0.05)`,
        },
        colorSecondary: {
          // color: "#808080",
          color: "#363643",
          backgroundColor: "#FEFEFE",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          paddingTop: "0.5em",
          // backgroundColor: "#FEFEFE",
          // marginRight: "4px",
          // paddingRight: "4px",
          // boxShadow: `1px 2px 2px 0px rgba(0,0,0,0.1), 2px 4px 2px 0px rgba(0,0,0,0.08), 4px 6px 4px 0px rgba(0,0,0,0.05)`
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#fEf5f5",
        },
        barColorPrimary: {
          backgroundColor: "#d7d7d7",
        },
      },
    },
    // Textfield input here...
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&$disabled": {
            // backgroundColor: "rgba(0, 0, 0, 0.1)",
            color: "rgba(0, 0, 0, 0.7)",
            "&.MuiInput-underline": {
              "&$disabled:before": {
                borderBottom: "2px solid rgba(0, 0, 0, 0.5)",
              },
            },
            "& .MuiOutlinedInput-input": {
              fontWeight: "bold",
            },
          },
        },
        // Disabled text
        input: {
          "&.MuiOutlinedInput-input.Mui-disabled": {
            WebkitTextFillColor: "#222",
            color: "#222",
            fontWeight: "bold",
          },
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          border: "none",
        },
      },
    },
    /* start: change outline fiels label text size */
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            fontWeight: "bold",
            textShadow: `1px 1px 0px #DDDDDDAF`,
            fontSize: "120%",
          },
        },
        outlined: {
          "&$shrink": {
            transform: "translate(14px, -6px) scale(0.9)",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          "& > legend": {
            fontSize: " 0.9em",
          },
        },
      },
    },
    /* end: change outline fields label text size */
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "#185aac",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#185aac",
          },
          "& .MuiFilledInput-root": {
            backgroundColor: "#e9eff6 ",
            "& fieldset": {
              borderColor: "red",
            },
            "&:hover fieldset": {
              borderColor: "yellow",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#185aac",
            },
            "&:hover": {
              backgroundColor: "#e9ebed",
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          "& .MuiChip-avatarColorPrimary": {
            // icon background over Chip view
            backgroundColor: "transparent",
          },
        },
      },
    },
  },
};

export const darkTheme = {
  palette: {
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#FBBA72",
    },
    mode: "dark" as const, // Switching the dark mode on is a single property value change.
  },
  sidebar: {
    width: 200,
    closedWidth: 56, // The default value is 55
  },
  components: {
    ...defaultTheme.components,
    RaMenuItemLink: {
      styleOverrides: {
        root: {
          borderLeft: "3px solid #000",
          "&.RaMenuItemLink-active": {
            borderLeft: "3px solid #90caf9",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorSecondary: {
          color: "#ffffffb3",
          backgroundColor: "#616161e6",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        disableRipple: true,
        root: {
          "&:hover:active::after": {
            // recreate a static ripple color
            // use the currentColor to make it work both for outlined and contained buttons
            // but to dim the background without dimming the text,
            // put another element on top with a limited opacity
            content: '""',
            display: "block",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: "currentColor",
            opacity: 0.3,
            borderRadius: "inherit",
          },
        },
      },
    },
  },
};
