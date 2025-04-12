import Typography from "@/components/Typography";
import { Grid, useTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { GlobalSearch } from "../GlobalSearch";

export function Search() {
  const theme = useTheme() as Theme;
  return (
    <Grid
      display="flex"
      width="100%"
      className="search-wrapper"
      sx={{
        backgroundColor:
          theme.palette.mode === "dark" ? theme.colors.darkBackground : "var(--color-primary)",
        padding: {
          xs: "var(--space-14) 0 var(--space-50)",
          sm: "40px 0 80px",
        },
      }}
      justifyContent="center"
    >
      <Grid
        className="wrap"
        flexDirection="column"
        display="flex"
        gap="var(--space-12) 0"
        justifyContent="center"
      >
        <Typography variant="h3" fontWeight="bold" color="white">
          The IC Explorer
        </Typography>
        <GlobalSearch />
      </Grid>
    </Grid>
  );
}
