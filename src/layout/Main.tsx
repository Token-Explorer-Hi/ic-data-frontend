import { ReactNode } from "react";
import { Grid } from "@mui/material";

export interface MainProps {
  children: ReactNode;
}

export function Main({ children }: MainProps) {
  return (
    <Grid display="flex" style={{ width: "100%", padding: "var(--space-16)" }} justifyContent="center">
      <Grid display="flex" style={{ width: "100%", maxWidth: "1440px" }}>
        {children}
      </Grid>
    </Grid>
  );
}
