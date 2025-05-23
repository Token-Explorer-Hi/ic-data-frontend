import { counter, CountingTime } from "@/utils/index";
import BigNumber from "bignumber.js";
import { useEffect, useMemo, useState } from "react";

export function useCounter(time: string | number | undefined | bigint) {
  const [count, setCount] = useState<CountingTime | null>(null);

  useEffect(() => {
    if (!time || new BigNumber(String(time)).isLessThan(0)) return;

    let timer: number | undefined;

    timer = window.setInterval(() => {
      setCount(counter(Number(time)));
    }, 1000);

    return () => {
      clearInterval(timer);
      timer = undefined;
      return undefined;
    };
  }, [time]);

  return useMemo(() => count, [count]);
}
