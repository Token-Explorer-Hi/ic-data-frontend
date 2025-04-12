import { TransactionTooltip } from "@/components/Tooltip";
import Typography from "@/components/Typography";
import { NONE_SUB_HEX } from "@/constants/index";
import { shorten, subaccountHexToBytes, toHexString } from "@/utils";
import { decodeIcrcAccount, encodeIcrcAccount } from "@dfinity/ledger-icrc";
import { Principal } from "@dfinity/principal";
import { useMemo } from "react";
import { Link } from "./Link";

export interface TextualAddressLinkProps {
  copyable?: boolean;
  shorten?: boolean;
  length?: number;
  textualAddress?: string | undefined | null;
  owner?: string | null;
  account?: string | null;
  subaccount?: string | null;
  maxWidth?: string;
  alias?: string;
}

export const TextualAddressLink = ({
  shorten: isShorten = true,
  length = 8,
  copyable,
  textualAddress,
  owner: __owner,
  account: __account,
  subaccount: __subaccount,
  maxWidth,
  alias,
}: TextualAddressLinkProps) => {
  const __textualAddress = useMemo(() => {
    if (textualAddress) return textualAddress;
    if (__owner) {
      return encodeIcrcAccount({
        owner: Principal.fromText(__owner),
        subaccount:
          __subaccount && __subaccount !== NONE_SUB_HEX
            ? subaccountHexToBytes(__subaccount)
            : undefined,
      });
    }
    if (!__owner && __account) {
      return __account;
    }

    return undefined;
  }, [textualAddress, __owner, __subaccount]);

  const { owner, sub } = useMemo(() => {
    if (!__textualAddress) return {};

    try {
      const { owner, subaccount } = decodeIcrcAccount(__textualAddress);
      return { owner: owner.toString(), sub: subaccount ? toHexString(subaccount) : undefined };
    } catch (error) {
      console.error(error);
      console.warn("Invalid textualAddress: ", __textualAddress);
    }

    return {};
  }, [__textualAddress]);

  return __textualAddress ? (
    <TransactionTooltip owner={owner} sub={sub}>
      <Link to={`/address/details/${__textualAddress}`}>
        <Typography
          copyable={copyable}
          style={{ color: "var(--color-primary)", display: "flex", alignItems: "center", maxWidth }}
          copyText={
            alias ?? (isShorten ? `${shorten(__textualAddress, length)}` : `${__textualAddress}`)
          }
        >
          {alias ?? (isShorten ? `${shorten(__textualAddress, length)}` : `${__textualAddress}`)}
        </Typography>
      </Link>
    </TransactionTooltip>
  ) : (
    <Typography style={{ color: "var(--color-primary)", display: "flex", alignItems: "center" }}>
      --
    </Typography>
  );
};
