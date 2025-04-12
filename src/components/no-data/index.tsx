import NoDataIcon from "@/assets/images/icons/no-data";
import { Grid, GridProps } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => {
  return {
    noDataContainer: {
      height: "var(--space-140)",
    },
  };
});

export default function NoData({ fontSize, sx }: { fontSize?: string } & GridProps) {
  const classes = useStyles();
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.noDataContainer}
      sx={sx}
    >
      <Grid item>
        <NoDataIcon style={{ fontSize: fontSize ?? "6rem" }} />
      </Grid>
    </Grid>
  );
}
