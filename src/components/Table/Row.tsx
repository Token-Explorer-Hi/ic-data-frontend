import { Box, BoxProps } from "@mui/material";

export default function Row(props: BoxProps) {
  return (
    <Box
      {...props}
      sx={{
        padding: "var(--space-20) 0",
        borderBottom: "var(--space-1) solid rgba(189, 200, 240, 0.082)",
        display: "grid",
        alignItems: "center",
        ...props.sx,
      }}
    >
      {props.children}
    </Box>
  );
}
