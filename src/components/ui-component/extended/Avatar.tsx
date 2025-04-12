// material-ui
import React from "react";
import MuiAvatar, { AvatarProps } from "@mui/material/Avatar";

// ==============================|| AVATAR ||============================== //
interface PropTypes extends AvatarProps {
  children?: React.ReactNode;
  color?: string;
  outline?: boolean;
  size?: string;
  sx?: any;
  href?: string;
  target?: string;
}

const Avatar = ({ color, outline, size, sx = {}, children, ...others }: PropTypes) => {
  const colorSX = color && !outline && { color: "background.paper", bgcolor: `${color}.main` };
  const outlineSX = outline && {
    color: color ? `${color}.main` : `primary.main`,
    bgcolor: "background.paper",
    border: "var(--space-2) solid",
    borderColor: color ? `${color}.main` : `primary.main`,
  };
  let sizeSX = {};
  switch (size) {
    case "badge":
      sizeSX = { width: 28, height: 28 };
      break;
    case "xs":
      sizeSX = { width: 34, height: 34 };
      break;
    case "sm":
      sizeSX = { width: 40, height: 40 };
      break;
    case "lg":
      sizeSX = { width: 72, height: 72 };
      break;
    case "xl":
      sizeSX = { width: 82, height: 82 };
      break;
    case "md":
      sizeSX = { width: 60, height: 60 };
      break;
    default:
      sizeSX = {};
  }

  return (
    <MuiAvatar sx={{ ...colorSX, ...outlineSX, ...sizeSX, ...(sx ?? {}) }} {...others}>
      {children}
    </MuiAvatar>
  );
};

export default Avatar;
