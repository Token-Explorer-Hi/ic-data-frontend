import type { PageResult, Transaction } from '@/types';
import { fetch_post, isValidPrincipal } from '@/utils';
import { useCallback } from 'react';

import { useCallsData } from '@/hooks/useCallsData';

export interface AddressTransactionProps {
  address: string;
  pageNum: number;
  pageSize: number;
  txTypes: string[];
  startTime?: string | number | undefined | null;
  endTime?: string | number | undefined | null;
  token0LedgerId?: string;
  token1LedgerId?: string;
}

export async function getAddressTransaction({
  address,
  pageNum,
  pageSize,
  txTypes,
  startTime,
  endTime,
  token0LedgerId,
  token1LedgerId,
}: AddressTransactionProps) {
  return (
    await fetch_post<PageResult<Transaction>>(`/api/tx/list`, {
      ...(isValidPrincipal(address)
        ? { principal: address }
        : address.includes('-') && address.includes('.')
        ? { accountTextual: address }
        : { accountId: address }),
      page: pageNum,
      size: pageSize,
      txTypes,
      beginTime: startTime ?? '',
      endTime: endTime ?? '',
      token0LedgerId,
      token1LedgerId,
    })
  ).data;
}

export function useAddressTransactions({
  address,
  pageNum,
  pageSize,
  txTypes = [],
  startTime,
  endTime,
  token0LedgerId,
  token1LedgerId,
}: AddressTransactionProps) {
  return useCallsData(
    useCallback(async () => {
      if (!address) return undefined;
      return await getAddressTransaction({
        address,
        pageNum,
        pageSize,
        txTypes,
        startTime,
        endTime,
        token0LedgerId,
        token1LedgerId,
      });
    }, [
      address,
      pageNum,
      pageSize,
      txTypes,
      startTime,
      endTime,
      token0LedgerId,
      token1LedgerId,
    ]),
  );
}

export async function getTokenLists() {
  return (
    await fetch_post<PageResult<Transaction>>(`/api/token/select`, {
      page: 1,
      size: 1000,
    })
  ).data;
}
export function useSelectTokenLists(): any {
  return useCallsData<PageResult<Transaction>>(
    useCallback(async () => {
      return await getTokenLists();
    }, []),
  );
}
