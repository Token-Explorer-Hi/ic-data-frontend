import { useMemo } from "react";

export function generateLogoUrl(tokenId: string) {
  return `https://api.icexplorer.io/images/${tokenId}`;
}

export function useTokenLogo(tokenId: string | undefined) {
  return useMemo(() => {
    if (!tokenId) return undefined;

    return generateLogoUrl(tokenId);
  }, [tokenId]);
}
