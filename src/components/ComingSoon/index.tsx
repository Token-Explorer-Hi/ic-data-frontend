import ComingSoonLightIcon from "@/assets/images/icons/coming-soon-light.svg";
import ComingSoonIcon from "@/assets/images/icons/coming-soon.svg";
import Typography from "@/components/Typography";
import { isDarkTheme } from "@/utils";
import { Grid, useTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => {
  return {
    container: {
      height: "var(--space-320)",
    },
  };
});

export default function ComingSoon() {
  const classes = useStyles();
  const theme = useTheme() as Theme;

  const Icon = isDarkTheme(theme) ? ComingSoonIcon : ComingSoonLightIcon;

  return (
    <Grid container justifyContent="center" alignItems="center" className={classes.container}>
      <Grid item container justifyContent="center" flexDirection="column" alignItems="center">
        <img src={Icon} alt="" />
        <Typography sx={{ p: 2 }} variant="h2">
          Coming Soon...
        </Typography>
      </Grid>
    </Grid>
  );
}
