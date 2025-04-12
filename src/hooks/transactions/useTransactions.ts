import { DEFAULT_RESPONSE, PageResult, Transaction } from '@/types';
import { fetch_post, isNullArgs } from '@/utils';
import { useCallback } from 'react';

import { useCallsData } from '@/hooks/useCallsData';

export async function getTransaction(id: any, txType?: string) {
  return (await fetch_post<Transaction>(`/api/tx/detail`, { txId: id, txType }))
    .data;
}

export function useTransaction(id: string | undefined, txType?: string) {
  return useCallsData<Transaction>(
    useCallback(async () => {
      if (!id) return undefined;
      return await getTransaction(id, txType);
    }, [id, txType]),
  );
}

export interface TransactionsProps {
  page: number;
  size: number;
  txTypes?: string[];
  startTime?: string | number | undefined | null;
  endTime?: string | number | undefined | null;
}

export async function getTransactions({
  page,
  size,
  txTypes,
  endTime,
  startTime,
}: TransactionsProps) {
  return (
    await fetch_post<PageResult<Transaction>>(`/api/tx/list`, {
      page,
      size,
      txTypes,
      beginTime: startTime ? String(startTime) : '',
      endTime: endTime ? String(endTime) : '',
    })
  ).data;
}

export function useTransactions({
  page,
  size,
  txTypes,
  startTime,
  endTime,
}: TransactionsProps): any {
  return useCallsData<PageResult<Transaction>>(
    useCallback(async () => {
      if (size === 0)
        return new Promise<PageResult<Transaction>>((resolve) =>
          resolve(DEFAULT_RESPONSE),
        );
      if (startTime && isNullArgs(endTime)) return undefined;
      if (endTime && isNullArgs(startTime)) return undefined;

      return await getTransactions({ page, size, txTypes, startTime, endTime });
    }, [page, size, txTypes, startTime, endTime]),
  );
}
