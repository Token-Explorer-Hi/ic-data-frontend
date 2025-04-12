import { fetch_post } from "@/utils";
import { useCallback } from "react";

import { useCallsData } from "./useCallsData";

export async function getTransactionTypes() {
  return (await fetch_post<string[]>(`/api/tx/types`)).data;
}

export function useTransactionTypes() {
  return useCallsData(
    useCallback(async () => {
      return await getTransactionTypes();
    }, [])
  );
}

export async function getTokenTransactionTypes() {
  return (await fetch_post<string[]>(`/api/tx/types/token`)).data;
}

export function useTokenTransactionTypes() {
  return useCallsData(
    useCallback(async () => {
      return await getTokenTransactionTypes();
    }, [])
  );
}
