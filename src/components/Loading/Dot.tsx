import { isDarkTheme } from "@/utils";
import { Box } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => {
  const isDark = isDarkTheme(theme);
  const translateLength = 5;

  return {
    dot: {
      display: "inline-block",
      width: "var(--space-5)",
      height: "var(--space-5)",
      backgroundColor: isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(17, 25, 54, 0.4)",
      borderRadius: "50%",
      animationDuration: "800ms",
      animationIterationCount: "infinite",
    },
    "@keyframes dot1Keyframes": {
      "0%": {
        transform: `translate(0, -${translateLength}px)`,
      },
      "33%": {
        transform: "translate(0, 0)",
      },
    },
    "@keyframes dot2Keyframes": {
      "0%": {
        transform: "translate(0, 0)",
      },
      "33%": {
        transform: `translate(0, -${translateLength}px)`,
      },
      "66%": {
        transform: "translate(0, 0)",
      },
    },
    "@keyframes dot3Keyframes": {
      "0%": {
        transform: "translate(0, 0)",
      },
      "66%": {
        transform: `translate(0, -${translateLength}px)`,
      },
    },
    dot1: {
      animationName: `$dot1Keyframes`,
      marginRight: "var(--space-4)",
    },
    dot2: {
      animationName: `$dot2Keyframes`,
      marginRight: "var(--space-4)",
    },
    dot3: {
      animationName: `$dot3Keyframes`,
    },
  };
});

export default function Dot({ loading }: { loading: boolean }) {
  const classes = useStyles();

  return loading ? (
    <Box
      sx={{
        display: "inline-block",
        height: "var(--space-8)",
        lineHeight: "var(--space-8)",
      }}
    >
      <span className={`${classes.dot} ${classes.dot1}`} />
      <span className={`${classes.dot} ${classes.dot2}`} />
      <span className={`${classes.dot} ${classes.dot3}`} />
    </Box>
  ) : null;
}
