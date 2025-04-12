import type { ApiResult } from "@/types";

import { CallResult } from "@/types";
import { useEffect, useMemo, useRef, useState } from "react";

export type Call<T> = () => Promise<ApiResult<T>>;

export function useCallsData<T>(fn: Call<T>, reload?: number | string | boolean): CallResult<T> {
  const [result, setResult] = useState<ApiResult<T>>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (fn) {
      setResult(undefined);
      setLoading(true);
      fn().then((result) => {
        setResult(result);
        setLoading((result as any)?.loading ?? false);
      });
    }
  }, [fn, reload]);

  return useMemo(
    () => ({
      result,
      loading,
    }),
    [result, loading]
  );
}

export function useLatestDataCall<T>(fn: Call<T>, reload?: number | string | boolean) {
  const [loading, setLoading] = useState(false);

  const indexRef = useRef<number>(0);
  const resultsRef = useRef<{ [key: string]: T | undefined }>({});

  useEffect(() => {
    if (fn) {
      setLoading(true);

      indexRef.current += 1;
      const index = indexRef.current;

      fn().then((result) => {
        resultsRef.current = {
          ...resultsRef.current,
          [String(index)]: result as T,
        };

        setLoading(false);
      });
    }
  }, [fn, reload]);

  return useMemo(() => {
    return {
      result: resultsRef.current[indexRef.current] as T | undefined,
      loading,
    };
  }, [resultsRef.current, indexRef.current, loading]);
}
