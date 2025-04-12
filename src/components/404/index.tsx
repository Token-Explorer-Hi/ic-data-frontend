import { Box, Button, Grid, Typography } from "@mui/material";

import { useRouter } from "@/hooks/useCustomRouter";

export default function PageNotFound() {
  const router = useRouter();
  return (
    <Box sx={{ width: "100%", height: "calc(100vh - var(--space-250))" }}>
      <Grid
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%", height: "100%", gap: "var(--space-18)" }}
      >
        <Typography
          variant="h1"
          color="text.primary"
          align="center"
          fontSize="var(--space-80)"
          fontWeight={500}
        >
          404
        </Typography>
        <Typography color="text.primary" align="center" fontSize="var(--space-20)">
          Page not found
        </Typography>
        <Typography color="text" align="center" fontSize="var(--space-14)">
          Sorry, we can&#39;t find the page you&#39;re looking for.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/")}
          sx={{ borderRadius: "9999px" }}
        >
          GO BACK HOME
        </Button>
      </Grid>
    </Box>
  );
}
