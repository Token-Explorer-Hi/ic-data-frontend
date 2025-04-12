import Loading from "@/assets/images/loading.png";
import { Box, Grid, useTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => {
  return {
    loadingContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      minHeight: "140px",
      paddingTop: "var(--space-56)",
      overflow: "hidden",
    },
    mask: {
      position: "absolute",
      top: "var(--space-56)",
      left: 0,
      width: "100%",
      height: "100%",
      opacity: 0.2,
    },
  };
});

export interface ListLoadingProps {
  loading: boolean;
  mask?: boolean;
  maskBackground?: string;
}

export default function ListLoading({ loading, mask = true, maskBackground }: ListLoadingProps) {
  const classes = useStyles();
  const theme = useTheme() as Theme;

  return loading ? (
    <Grid
      className={classes.loadingContainer}
      container
      justifyContent="center"
      alignContent="center"
    >
      <Box
        className={mask ? classes.mask : ""}
        sx={{ background: maskBackground || theme.palette.loading.background }}
      />
      <img
        style={{ zIndex: 2 }}
        width="var(--space-80)"
        height="var(--space-80)"
        src={Loading}
        alt=""
      />
    </Grid>
  ) : null;
}
