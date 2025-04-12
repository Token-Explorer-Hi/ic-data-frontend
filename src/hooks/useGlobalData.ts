import { GlobalData } from "@/types";
import { fetch_post } from "@/utils";
import { useCallback } from "react";

import { useCallsData } from "@/hooks/useCallsData";

export function useGlobalData() {
  return useCallsData(
    useCallback(async () => {
      return (await fetch_post<GlobalData>(`/api/dashboard/global/data`)).data;
    }, [])
  );
}
