import { Box, keyframes } from "@mui/material";

const loaderProcessLinear = keyframes`
  0% {
    left: 0;
  }
  100% {
    left: 120%;
  }
`;

export default function LinearLoader() {
  return (
    <Box sx={{ position: "fixed", top: 0, left: 0, zIndex: 1301, width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          background: "#fafafa",
          height: "var(--space-3)",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "20%",
            position: "absolute",
            height: "var(--space-3)",
            background: "var(--color-primary)",
            animation: `${loaderProcessLinear} 1000ms linear infinite 0s`,
          }}
        />
      </Box>
    </Box>
  );
}
