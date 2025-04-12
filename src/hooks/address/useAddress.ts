import {
  AddressDetails,
  AddressList,
  DEFAULT_RESPONSE,
  PageResult,
} from '@/types';
import { fetch_post, isValidPrincipal } from '@/utils';
import { useCallback } from 'react';

import { useCallsData } from '@/hooks/useCallsData';

export function useAddress(id: string | undefined) {
  return useCallsData(
    useCallback(async () => {
      if (!id) return undefined;
      return (
        await fetch_post<AddressDetails>(
          `/api/address/detail`,
          isValidPrincipal(id)
            ? { principal: id }
            : id.includes('-') && id.includes('.')
            ? { accountTextual: id }
            : { accountId: id },
        )
      ).data;
    }, [id]),
  );
}

export function useAddresses(page: number, size: number) {
  return useCallsData<PageResult<AddressList>>(
    useCallback(async () => {
      if (size === 0)
        return new Promise<PageResult<AddressList>>((resolve) =>
          resolve(DEFAULT_RESPONSE),
        );
      const result = await fetch_post<PageResult<AddressList>>(
        `/api/address/list`,
        { page, size },
      );
      return result.data;
    }, [page, size]),
  );
}
