import { useTokenLogo } from "@/hooks/token/useTokenLogo";
import { Avatar, Box, SxProps } from "@mui/material";

export interface TokenImageProps {
  size?: string;
  tokenId?: string;
  sx?: SxProps;
  logo?: string;
}

export function TokenImage({ tokenId, sx, size = "var(--space-28)" }: TokenImageProps) {
  const logo = useTokenLogo(tokenId);

  return (
    <Box
      sx={{
        width: size ?? "var(--space-24)",
        height: size ?? "var(--space-24)",
        position: "relative",
        ...(sx ?? {}),
      }}
    >
      <Avatar
        src={logo}
        sx={{
          width: size ?? "var(--space-24)",
          height: size ?? "var(--space-24)",
          background: "transparent",
        }}
      >
        &nbsp;
      </Avatar>
    </Box>
  );
}
