import { AddressTip } from "@/components/AddressTip";
import Typography from "@/components/Typography";
import { principalToAccount, shorten } from "@/utils";
import { Link } from "./Link";

export interface AddressLinkProps {
  owner: string | undefined | null;
  copyable?: boolean;
  shorten?: boolean;
  length?: number;
  toAccount?: boolean;
  alias?: string;
}

export const AddressLink = ({
  owner,
  shorten: isShorten = true,
  length = 6,
  copyable,
  toAccount,
  alias,
}: AddressLinkProps) => {
  if (!owner) return null;

  const address = !owner
    ? undefined
    : toAccount && owner.includes("-")
    ? principalToAccount(owner)
    : owner;

  return address ? (
    <AddressTip owner={owner}>
      <Link to={`/address/details/${owner}`}>
        <Typography
          copyable={copyable}
          style={{ color: "var(--color-primary)", display: "flex", alignItems: "center" }}
          copyText={alias ?? (isShorten ? shorten(address, length) : address)}
        >
          {alias ?? (isShorten ? shorten(address, length) : address)}
        </Typography>
      </Link>
    </AddressTip>
  ) : (
    <Typography style={{ color: "var(--color-primary)", display: "flex", alignItems: "center" }}>
      --
    </Typography>
  );
};
