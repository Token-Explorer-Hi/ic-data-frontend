import type { NumberType } from "@/types";
import BigNumber from "bignumber.js";

export function formatTokenAmount(
  amount: NumberType | null | undefined,
  decimals: number | bigint = 8
): BigNumber {
  let _amount = amount;
  let _decimals = decimals;

  if (_amount !== 0 && !_amount) return new BigNumber(0);
  if (typeof _amount === "bigint") _amount = Number(_amount);
  if (typeof decimals === "bigint") _decimals = Number(_decimals);
  if (Number.isNaN(Number(amount))) return new BigNumber(_amount);
  return new BigNumber(_amount).multipliedBy(10 ** Number(_decimals));
}

export function parseTokenAmount(
  amount: NumberType | null | undefined,
  decimals: number | bigint = 8
): BigNumber {
  let __amount = amount;
  let __decimals = decimals;

  if (__amount !== 0 && !__amount) return new BigNumber(0);
  if (typeof __amount === "bigint") __amount = Number(__amount);
  if (typeof __decimals === "bigint") __decimals = Number(__decimals);
  if (Number.isNaN(Number(__amount))) return new BigNumber(String(__amount));
  return new BigNumber(String(__amount)).dividedBy(10 ** Number(__decimals));
}
