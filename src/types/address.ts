export interface AddressList {
  accountId: string;
  alias: string | null;
  owner: string;
  subaccount: string;
}

interface Transaction {
  category: string;
  fromAccountId: string;
  fromAccountTextual: string;
  fromOwner: string;
  id: string;
  op: string;
  source: string;
  sourceCanister: string;
  toAccountId: string;
  toAccountTextual: string;
  toOwner: string;
  token0Amount: string;
  token0Decimal: number;
  token0Fee: string;
  token0LedgerId: string;
  token0TxIndex: string;
  token0TxMemo: string;
  token0TxTime: number;
  token0Value: string;
}

export interface AddressDetails {
  account: string;
  firstTransaction: Transaction;
  icpBalance: string;
  icpPriceUSD: string;
  icpValueUSD: string;
  lastTransaction: Transaction;
  principal: string;
  tokenCount: number;
  totalValueUSD: string;
  alias?: string;
}

export interface AddressToken {
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
}
