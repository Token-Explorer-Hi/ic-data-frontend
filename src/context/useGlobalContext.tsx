import { useGlobalData, useTokenTransactionTypes, useTransactionTypes } from "@/hooks";
import { tokenTransactionTypeFormatter, transactionTypeFormatter } from "@/utils/index";
import { createContext, ReactNode, useContext, useState } from "react";

import { GlobalData, TokenMetadata } from "@/types";

export interface SwapToken {
  canisterId: string;
  symbol: string;
  name: string;
  decimals: number;
}

type FormattedType = {
  key: string;
  value: string;
};

type ContextType = {
  allTransactionTypes: FormattedType[];
  allTokenTransactionTypes: FormattedType[];
  tokenList: TokenMetadata[];
  globalData: GlobalData | undefined;
};

export const GlobalContext = createContext<ContextType>({
  allTransactionTypes: [],
  allTokenTransactionTypes: [],
  tokenList: [],
  globalData: {
    icpPrice: "",
    addressCount: "",
    icp2CyclePrice: "",
    tokenCount: 0,
    transactionCount: "",
    icpTVL: "",
  },
});
export default function GlobalContextProvider({ children }: { children: ReactNode }) {
  const { result: allTransactionTypes = [] } = useTransactionTypes();
  const { result: allTokenTransactionTypes = [] } = useTokenTransactionTypes();
  const { result: globalData } = useGlobalData();

  const [tokenList, setTokenList] = useState([]);
  return (
    <GlobalContext.Provider
      value={{
        allTransactionTypes: transactionTypeFormatter(allTransactionTypes),
        allTokenTransactionTypes: tokenTransactionTypeFormatter(allTokenTransactionTypes),
        tokenList,
        globalData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalContextProvider");
  }
  return context;
}
