const components = {
  // BUTTONS
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        textTransform: "none",
        padding: "10px 20px",
        fontWeight: 600,
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
        }
      },

      sizeSmall: {
        padding: "6px 14px",
        fontSize: "13px"
      },

      sizeLarge: {
        padding: "12px 28px",
        fontSize: "15px"
      },

      containedPrimary: {
        backgroundColor: "#6ea6e8", // accent-400
        color: "#ffffff",
        "&:hover": {
          backgroundColor: "#467bbd" // accent-600
        },
        "&:active": {
          backgroundColor: "#3a679d" // accent-700
        }
      },

      outlinedPrimary: {
        borderWidth: 2,
        "&:hover": {
          borderWidth: 2,
        }
      }
    }
  },

  // APP BAR
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: "#ffffff",
        color: "#262626",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      }
    }
  },

  // PAPER
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        boxShadow: "0px 3px 6px rgba(0,0,0,0.07)"
      }
    }
  },

  // CARD
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        padding: 20,
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
      }
    }
  },

  // INPUTS
  MuiTextField: {
    defaultProps: {
      variant: "outlined",
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        backgroundColor: "#515151",
        color: "#fff",              
        "& input": {
          color: "#fff",            
          "& fieldset": {
            borderColor: "#757575",   
          },
          "&:hover fieldset": {
            borderColor: "#999999",  
          },
          "&.Mui-focused fieldset": {
            borderColor: "#1e90ff", 
          },
        },
      },
    },
  },

  // MENU
  MuiMenu: {
    styleOverrides: {
      paper: {
        borderRadius: 12,
        padding: 4,
        boxShadow: "0 6px 20px rgba(0,0,0,0.1)"
      }
    }
  },

  // AVATAR
  MuiAvatar: {
    styleOverrides: {
      root: {
        borderRadius: 12
      }
    }
  },


  // CHIP
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        fontWeight: 500
      }
    }
  },


  // TOOLTIP
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        borderRadius: 8,
        padding: "8px 12px",
        fontSize: "12px"
      },
      arrow: {
        color: "#333"
      }
    }
  }
};

export default components;
