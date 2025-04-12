import { GlobalSearchResult } from "@/types";
import { fetch_post } from "@/utils";
import { useCallback } from "react";

import { useCallsData } from "@/hooks/useCallsData";

export function useGlobalSearch(keyword: string | undefined): any {
  return useCallsData(
    useCallback(async () => {
      if (!keyword) return undefined;

      return (await fetch_post<GlobalSearchResult>(`/api/dashboard/search`, { keyword })).data;
    }, [keyword])
  );
}
