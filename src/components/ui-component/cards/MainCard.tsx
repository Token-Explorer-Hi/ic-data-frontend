import { useTheme } from "@mui/material";
import React, { forwardRef } from "react";

// material-ui
import Box from "@mui/material/Box";
import Card, { CardProps } from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material/styles";

// project-import

// constant
const headerSX = {
  "& .MuiCardHeader-action": { mr: 0 },
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

interface PropTypes extends Omit<CardProps, 'content'> {
  border?: boolean;
  boxShadow?: string | undefined | boolean;
  children?: React.ReactNode;
  content?: boolean;
  contentClass?: string;
  width?: string;
  contentSX?: object;
  darkTitle?: boolean;
  secondary?: React.ReactNode | string | object;
  sx?: object;
  level?: number;
  padding?: string | number;
}

const MainCard = forwardRef(function MainCard(props: PropTypes, ref?: React.Ref<HTMLDivElement>) {
  const theme = useTheme() as Theme;

  const {
    border = true,
    boxShadow,
    children,
    content = true,
    contentClass = "",
    contentSX = {},
    darkTitle,
    secondary,
    width,
    sx = {},
    title,
    level = 1,
    ...others
  } = props;
  return (
    <Card
      ref={ref}
      {...others}
      sx={{
        border:
          theme.palette.mode === "light"
            ? border
              ? "var(--space-1) solid var(--border-color)"
              : "none"
            : "var(--space-1) solid var(--gray-700)",
        width: width || "100%",
        boxShadow:
          theme.palette.mode === "light" ? (boxShadow as string) ?? "var(--box-shadow)" : "none",
        position: "relative",
        background:
          theme.palette.mode === "light" ? theme.colors?.paper : theme.colors?.darkCardBackground,
        ...sx,
      }}
    >
      {/* card header and action */}
      {!darkTitle && title && <CardHeader sx={headerSX} title={title} />}
      {darkTitle && title && (
        <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} />
      )}

      {/* content & header divider */}
      {title && <Divider />}

      {/* card content */}
      {content && (
        <Box sx={contentSX} className={contentClass}>
          {children}
        </Box>
      )}
      {!content && children}
    </Card>
  );
});

export default MainCard;
