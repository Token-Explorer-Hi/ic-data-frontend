import React from "react";

// material-ui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

// ==============================|| CUSTOM SUB CARD ||============================== //
interface PropTypes {
  children: React.ReactNode;
  content: boolean;
  contentClass: string;
  darkTitle: boolean;
  secondary: string;
  sx: object;
  contentSX: object;
  title: React.ReactNode;
}
const SubCard = React.forwardRef(function SubCard(
  {
    children,
    content,
    contentClass,
    darkTitle,
    secondary,
    sx = {},
    contentSX = {},
    title,
    ...others
  }: PropTypes,
  ref: React.Ref<HTMLDivElement>
) {
  const defaultShadow = "0 var(--space-2) var(--space-14) 0 rgb(32 40 45 / 8%)";

  return (
    <Card
      ref={ref}
      sx={{
        border: "var(--space-1) solid",
        borderColor: "divider",
        ":hover": { boxShadow: defaultShadow },
        ...sx,
      }}
      {...others}
    >
      {/* card header and action */}
      {!darkTitle && title && (
        <CardHeader
          sx={{ p: 2.5 }}
          title={<Typography variant="h5">{title}</Typography>}
          action={secondary}
        />
      )}
      {darkTitle && title && (
        <CardHeader
          sx={{ p: 2.5 }}
          title={<Typography variant="h4">{title}</Typography>}
          action={secondary}
        />
      )}

      {/* content & header divider */}
      {title && <Divider />}

      {/* card content */}
      {content && (
        <CardContent sx={{ p: 2.5, ...contentSX }} className={contentClass || ""}>
          {children}
        </CardContent>
      )}
      {!content && children}
    </Card>
  );
});

export default SubCard;
