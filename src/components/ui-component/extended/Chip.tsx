// material-ui
import { alpha } from "@mui/system";
import { useTheme } from "@mui/material";
import MuiChip from "@mui/material/Chip";

// ==============================|| CHIP ||============================== //

interface PropTypes {
  sx: object;
  chipcolor: string;
  variant: string;
  disabled: boolean;
}

const Chip = ({ chipcolor, disabled, sx = {}, variant, ...others }: PropTypes) => {
  const theme = useTheme();

  let defaultSX = {
    color: "primary.main",
    bgcolor: "primary.light",
    ":hover": {
      color: "primary.light",
      bgcolor: "primary.dark",
    },
  };

  let outlineSX = {
    color: "primary.main",
    bgcolor: "transparent",
    border: "var(--space-1) solid",
    borderColor: "primary.main",
    ":hover": {
      color: "primary.light",
      bgcolor: "primary.dark",
    },
  };

  switch (chipcolor) {
    case "secondary":
      if (variant === "outlined") {
        outlineSX = {
          color: "secondary.main",
          bgcolor: "transparent",
          border: "var(--space-1) solid",
          borderColor: "secondary.main",
          ":hover": {
            color: "secondary.main",
            bgcolor: "secondary.light",
          },
        };
      } else {
        defaultSX = {
          color: "secondary.main",
          bgcolor: "secondary.light",
          ":hover": {
            color: "secondary.light",
            bgcolor: "secondary.main",
          },
        };
      }
      break;
    case "success":
      if (variant === "outlined") {
        outlineSX = {
          color: "success.dark",
          bgcolor: "transparent",
          border: "var(--space-1) solid",
          borderColor: "success.dark",
          ":hover": {
            color: "success.dark",
            bgcolor: alpha(theme.palette.success.light, 0.6),
          },
        };
      } else {
        defaultSX = {
          color: "success.dark",
          bgcolor: alpha(theme.palette.success.light, 0.6),
          ":hover": {
            color: "success.light",
            bgcolor: "success.dark",
          },
        };
      }
      break;
    case "error":
      if (variant === "outlined") {
        outlineSX = {
          color: "error.main",
          bgcolor: "transparent",
          border: "var(--space-1) solid",
          borderColor: "error.main",
          ":hover": {
            color: "error.dark",
            bgcolor: "error.light",
          },
        };
      } else {
        defaultSX = {
          color: "error.dark",
          bgcolor: alpha(theme.palette.error.light, 0.6),
          ":hover": {
            color: "error.light",
            bgcolor: "error.dark",
          },
        };
      }
      break;
    case "orange":
      if (variant === "outlined") {
        outlineSX = {
          color: "orange.dark",
          bgcolor: "transparent",
          border: "var(--space-1) solid",
          borderColor: "orange.main",
          ":hover": {
            color: "orange.dark",
            bgcolor: "orange.light",
          },
        };
      } else {
        defaultSX = {
          color: "orange.dark",
          bgcolor: "orange.light",
          ":hover": {
            color: "orange.light",
            bgcolor: "orange.dark",
          },
        };
      }
      break;
    case "warning":
      if (variant === "outlined") {
        outlineSX = {
          color: "warning.dark",
          bgcolor: "transparent",
          border: "var(--space-1) solid",
          borderColor: "warning.dark",
          ":hover": {
            color: "warning.dark",
            bgcolor: "warning.light",
          },
        };
      } else {
        defaultSX = {
          color: "warning.dark",
          bgcolor: "warning.light",
          ":hover": {
            color: "warning.light",
            bgcolor: "warning.dark",
          },
        };
      }
      break;
    default:
  }

  if (disabled) {
    if (variant === "outlined") {
      outlineSX = {
        color: "grey.500",
        bgcolor: "transparent",
        border: "var(--space-1) solid",
        borderColor: "grey.500",
        ":hover": {
          color: "grey.500",
          bgcolor: "transparent",
        },
      };
    } else {
      defaultSX = {
        color: "grey.500",
        bgcolor: "grey.50",
        ":hover": {
          color: "grey.500",
          bgcolor: "grey.50",
        },
      };
    }
  }

  let SX = defaultSX;
  if (variant === "outlined") {
    SX = outlineSX;
  }
  SX = { ...SX, ...sx };
  return <MuiChip {...others} sx={SX} />;
};

export default Chip;
