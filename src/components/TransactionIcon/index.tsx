import React from "react";
import { IoSwapHorizontal } from "react-icons/io5";
import { PiSwap } from "react-icons/pi";

export default function TransactionIcon({ type }: { type: string }) {
  if (type === "swap") {
    return <PiSwap />;
  }
  if (type === "transfer") {
    return <IoSwapHorizontal />;
  }
  if (type === "approve") {
    return <IoSwapHorizontal />;
  }
}
