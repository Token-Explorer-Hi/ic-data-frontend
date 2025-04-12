import { useMemo } from "react";

interface Token {
  fee: number;
  decimals: number;
  canisterId: string;
  name: string;
  standard: string;
  symbol: string;
}

const tokens: Token[] = [];

export function useLocalTokens() {
  return useMemo(() => tokens, [tokens]);
}
