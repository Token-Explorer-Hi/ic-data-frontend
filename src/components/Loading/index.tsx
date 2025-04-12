import { Box, CircularProgress, Grid } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => {
  return {
    loadingContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden",
    },
    mask: {
      position: "absolute",
      left: 0,
      width: "100%",
      height: "100%",
      background: theme.palette.loading.background,
      opacity: 0.7,
    },
  };
});

export default function Loading({
  loading,
  circularSize = 40,
  maskBorderRadius,
}: {
  loading: boolean;
  circularSize?: number;
  maskBorderRadius?: string;
}) {
  const classes = useStyles();

  return loading ? (
    <Grid
      className={classes.loadingContainer}
      container
      justifyContent="center"
      alignContent="center"
    >
      <Box
        className={classes.mask}
        sx={{
          ...(maskBorderRadius ? { borderRadius: maskBorderRadius } : {}),
        }}
      />
      <CircularProgress color="inherit" size={circularSize} />
    </Grid>
  ) : null;
}
