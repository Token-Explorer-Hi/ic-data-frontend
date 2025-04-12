import type {
  Ed25519KeyIdentity,
  Secp256k1KeyIdentity,
} from '@dfinity/identity';

export enum ResultStatus {
  ERROR = 'err',
  OK = 'ok',
}

export type PaginationResult<T> = {
  totalElements: number;
  offset: number;
  limit: number;
  content: T[];
};

export type DynamicObject = {
  [key: string]: any;
};

export type ICPIdentity = Ed25519KeyIdentity | Secp256k1KeyIdentity;

export type Identity = ActorIdentity;

export type ApiResult<T> = undefined | T;

export type Null = null | undefined;

export type Override<P, S> = Omit<P, keyof S> & S;

export type ActorIdentity = true;

export type StatusResult<T> = {
  readonly status: ResultStatus;
  readonly data?: T;
  readonly message?: string;
};

export type CallResult<T> = {
  readonly result: ApiResult<T>;
  readonly loading: boolean;
};

export type PageResult<T> = {
  list: T[];
  endRow: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  nextPage: number;
  pageNum: number;
  pageSize: number;
  pages: number;
  prePage: number;
  size: number;
  startRow: number;
  total: number;
  loading?: boolean;
};

export type GlobalData = {
  icpPrice: string;
  addressCount: string;
  icp2CyclePrice: string;
  tokenCount: number;
  transactionCount: string;
  icpTVL: string;
};

export interface GlobalSearchResult {
  addressList: {
    accountId: string;
    principalId: string;
    subaccountId: string;
    type: string;
  }[];
  tokenList: {
    ledgerId: string;
    priceUSD: string;
    symbol: string;
    type: string;
  }[];
}

export type SorterArgs = {
  sortOrder: 'desc' | 'asc';
  sortBy: string;
};

export type Sorter = 'asc' | 'desc' | 'default';
