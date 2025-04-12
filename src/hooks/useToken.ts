import {
  DEFAULT_RESPONSE,
  Holder,
  PageResult,
  SorterArgs,
  TokenDetail,
  Transaction,
} from '@/types';
import { fetch_post } from '@/utils';
import { useCallback } from 'react';

import { useCallsData } from '@/hooks/useCallsData';

export function useToken(ledger_id: string | undefined) {
  return useCallsData<TokenDetail>(
    useCallback(async () => {
      if (!ledger_id) return undefined;
      return await getToken(ledger_id);
    }, [ledger_id]),
  );
}
export async function getToken(ledger_id: string | undefined) {
  if (!ledger_id) return undefined;
  return (
    await fetch_post<TokenDetail>(`/api/token/detail`, {
      ledgerId: ledger_id,
    })
  ).data;
}
export interface UseTokensProps {
  page: number;
  size: number;
  sorters?: SorterArgs[];
}

export function useTokens({ page, size, sorters }: UseTokensProps) {
  return useCallsData<PageResult<TokenDetail>>(
    useCallback(async () => {
      if (size === 0)
        return new Promise<PageResult<TokenDetail>>((resolve) =>
          resolve(DEFAULT_RESPONSE),
        );
      return (
        await fetch_post<PageResult<TokenDetail>>(`/api/token/list`, {
          page,
          size,
          sortArray: sorters,
        })
      ).data;
    }, [page, size, sorters]),
  );
}

export interface getTokenHoldersProps {
  tokenId: string;
  pageNum: number;
  pageSize: number;
  isDesc?: boolean;
}

export async function getTokenHolders({
  tokenId,
  isDesc = true,
  pageNum,
  pageSize,
}: getTokenHoldersProps) {
  return (
    await fetch_post<PageResult<Holder>>(`/api/holder/token`, {
      ledgerId: tokenId,
      page: pageNum,
      size: pageSize,
      isDesc,
    })
  ).data;
}

export interface UseTokenHoldersProps {
  tokenId: string;
  pageNum: number;
  pageSize: number;
  isDesc?: boolean;
}

export function useTokenHolders({
  tokenId,
  pageNum,
  pageSize,
  isDesc,
}: UseTokenHoldersProps) {
  return useCallsData<PageResult<Holder>>(
    useCallback(async () => {
      if (pageSize === 0)
        return new Promise<PageResult<Holder>>((resolve) =>
          resolve(DEFAULT_RESPONSE),
        );
      if (!tokenId) return undefined;
      return await getTokenHolders({ tokenId, pageNum, pageSize, isDesc });
    }, [tokenId, pageNum, pageSize, isDesc]),
  );
}

export interface getTokenTransactionProps {
  tokenId: string;
  pageNum: number;
  pageSize: number;
  txTypes: string[];
  startTime?: string | number | undefined | null;
  endTime?: string | number | undefined | null;
}

export async function getTokenTransaction({
  tokenId,
  txTypes,
  pageNum,
  pageSize,
  startTime,
  endTime,
}: getTokenTransactionProps) {
  return (
    await fetch_post<PageResult<Transaction>>(`/api/tx/list`, {
      token0LedgerId: tokenId,
      category: 'TOKEN',
      page: pageNum,
      size: pageSize,
      txTypes,
      beginTime: startTime ? String(startTime) : '',
      endTime: endTime ? String(endTime) : '',
    })
  ).data;
}

export interface UseTokenTransactionsProps {
  tokenId: string;
  pageNum: number;
  pageSize: number;
  txTypes?: string[];
  startTime?: string | number | undefined | null;
  endTime?: string | number | undefined | null;
}

export function useTokenTransactions({
  tokenId,
  pageNum,
  pageSize,
  txTypes = [],
  startTime,
  endTime,
}: UseTokenTransactionsProps) {
  return useCallsData<PageResult<Transaction>>(
    useCallback(async () => {
      if (pageSize === 0)
        return new Promise<PageResult<Transaction>>((resolve) =>
          resolve(DEFAULT_RESPONSE),
        );
      if (!tokenId) return undefined;
      if (startTime && !endTime) return undefined;
      if (endTime && !startTime) return undefined;

      return await getTokenTransaction({
        tokenId,
        pageNum,
        pageSize,
        txTypes,
        startTime,
        endTime,
      });
    }, [tokenId, pageNum, pageSize, txTypes, startTime, endTime]),
  );
}
