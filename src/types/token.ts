export type AccountIdentifier = string;

export enum TOKEN_STANDARD {
  EXT = 'EXT',
  DIP20 = 'DIP20',
  ICP = 'ICP',
  DIP20_WICP = 'DIP20-WICP',
  DIP20_XTC = 'DIP20-XTC',
  ICRC1 = 'ICRC1',
  ICRC2 = 'ICRC2',
}
export interface Holder {
  balance: bigint;
  account: AccountIdentifier;
}
export type TokenTransType =
  | { burn: null }
  | { mint: null }
  | { approve: null }
  | { transfer: null };

export type {
  Holder as TokenHolder,
  HoldersRequest as TokenHolderArgs,
  TransactionRequest as TokenTransactionArgs,
  TransferRequest as TokenTransferArgs,
  TransferResponse as TokenTransferResult,
} from '@/candid';

export type TokenInfo = {
  decimals: number;
  name: string;
  standardType: TOKEN_STANDARD;
  symbol: string;
  canisterId: string;
  logo: string;
  totalSupply: bigint;
  transFee: bigint;
};

export type StorageTokenInfo = {
  decimals: number;
  name: string;
  standardType: TOKEN_STANDARD;
  symbol: string;
  canisterId: string;
  logo: string;
  totalSupply: string;
  transFee: string;
};

export interface TokenDetail {
  controllerArray: string[];
  cycleBalance: number;
  description: string | null;
  details: string | null;
  fee: number;
  fullyDilutedMarketCap: string | null;
  holderAmount: string | null;
  ledgerId: string;
  logo: string | null;
  marketCap: string | null;
  memorySize: number;
  mintingAccount: string;
  moduleHash: string;
  name: string;
  price: number;
  priceChange24: string | null;
  priceICP: number | null;
  source: string;
  standardArray: string[];
  supplyCap: string | null;
  symbol: string;
  tokenDecimal: number;
  totalSupply: number;
  transactionAmount: string | null;
  tvl: string | null;
  txVolume24: string | null;
  tokenDetail: {
    [key: string]: string;
  };
}

export interface TokenTransaction {
  category: string;
  fromAccountId: string | null;
  fromAlias: null;
  fromOwner: string | null;
  fromSubaccount: null;
  fromAccountTextual: string | null;
  id: string;
  op: string;
  source: string;
  sourceCanister: string;
  spenderAccountId: null;
  spenderAlias: null;
  spenderOwner: null;
  spenderSubaccount: null;
  toAccountId: string | null;
  toAlias: null;
  toOwner: string | null;
  toAccountTextual: string | null;
  toSubaccount: null;
  token0Amount: number;
  token0Decimal: number;
  token0Fee: number;
  token0LedgerId: string;
  token0Symbol: string;
  token0TxHash: null;
  token0TxIndex: number;
  token0TxMemo: null;
  token0TxTime: string;
  token0Value: number;
  token1Amount: number | null;
  token1Decimal: number | null;
  token1Fee: number | null;
  token1LedgerId: null;
  token1Symbol: null;
  token1TxHash: null;
  token1TxIndex: null;
  token1TxMemo: null;
  token1TxTime: null;
  token1Value: null;
}

export interface Holder {
  accountId: string;
  amount: string;
  ledgerId: string;
  owner: string;
  snapshotTime: number;
  subaccount: string;
  symbol: string;
  tokenDecimal: number;
  totalSupply: string;
  valueUSD: string;
  alias?: string;
}

import { Principal } from '@dfinity/principal';

export type { Metadata as DIP20Metadata } from '@/candid/dip20/dip20';

export type BalanceRequest = {
  token: string;
  user: { [key: string]: string | Principal };
};

export interface TokenMetadata {
  decimals: number;
  metadata: [] | [Array<number>];
  name: string;
  standardType: TOKEN_STANDARD;
  symbol: string;
  canisterId: Principal;
}

export type Metadata = {
  decimals: number;
  name: string;
  symbol: string;
  logo: string;
  fee: bigint;
};

export type fungibleMetadata = {
  fungible: Metadata;
};

export const DEFAULT_RESPONSE = {
  total: 0,
  list: [],
  loading: true,
  pageNum: 0,
  pageSize: 0,
  size: 0,
  startRow: 0,
  endRow: 0,
  pages: 0,
  prePage: 0,
  nextPage: 0,
  isFirstPage: false,
  isLastPage: false,
  hasPreviousPage: false,
  hasNextPage: false,
  navigatePages: 0,
  navigateFirstPage: 0,
  navigateLastPage: 0,
};
