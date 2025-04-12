import type { AddressToken, PageResult } from '@/types';
import { fetch_post, isValidPrincipal } from '@/utils';
import { useCallback } from 'react';

import { useCallsData } from '@/hooks/useCallsData';

export interface getAddressTokensProps {
  address: string;
  pageNum: number;
  pageSize: number;
  isDesc?: boolean;
}

export async function getAddressTokens({
  address,
  isDesc = true,
  pageNum,
  pageSize,
}: getAddressTokensProps) {
  return (
    await fetch_post<PageResult<AddressToken>>(`/api/holder/user`, {
      ...(isValidPrincipal(address)
        ? { principal: address }
        : address.includes('-') && address.includes('.')
        ? {
            accountTextual: address,
          }
        : { accountId: address }),
      page: pageNum,
      size: pageSize,
      isDesc,
    })
  ).data;
}

export interface UseAddressTokensProps {
  address: string;
  pageNum: number;
  pageSize: number;
  isDesc?: boolean;
}

export const DEFAULT_ADDRESSTOKENS: PageResult<AddressToken> = {
  total: 0,
  list: [],
  pageNum: 0,
  pageSize: 0,
  size: 0,
  startRow: 0,
  endRow: 0,
  pages: 0,
  prePage: 0,
  nextPage: 0,
  isFirstPage: true,
  isLastPage: true,
  hasPreviousPage: false,
  hasNextPage: false,
  loading: true,
};

export function useAddressTokens({
  address,
  pageNum,
  pageSize,
  isDesc,
}: UseAddressTokensProps) {
  return useCallsData<PageResult<AddressToken>>(
    useCallback(async () => {
      if (!address || pageSize === 0)
        return new Promise<PageResult<AddressToken>>((resolve) =>
          resolve(DEFAULT_ADDRESSTOKENS),
        );
      return await getAddressTokens({ address, pageNum, pageSize, isDesc });
    }, [address, pageNum, pageSize, isDesc]),
  );
}
