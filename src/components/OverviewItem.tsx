import Typography from "@/components/Typography";
import { Grid, useTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { ReactNode } from "react";

export interface OverviewItemProps {
  title: ReactNode;
  value: ReactNode;
  fontWeight?: number;
}

export function OverviewItem({ title, value }: OverviewItemProps) {
  const theme = useTheme() as Theme;
  return (
    <Grid
      display="flex"
      flexDirection="column"
      className="overview-detail-item"
      gap="var(--space-10)"
    >
      <Typography
        sx={{
          fontWeight: 500,
          color: theme.palette.mode === "dark" ? theme.colors.grey400 : "#757575",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h2"
        style={{ fontWeight: 500, color: theme.palette.mode === "dark" ? "white" : "black" }}
      >
        {value}
      </Typography>
    </Grid>
  );
}
