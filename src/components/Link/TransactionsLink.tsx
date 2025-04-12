import { Link } from "./Link";
import Typography from "@/components/Typography";
import { shorten } from "@/utils";

export interface TransactionsLinkProps {
  txId: string;
  copyable?: boolean;
  shorten?: boolean;
  length?: number;
}

export const TransactionsLink = ({ txId, copyable, shorten: isShorten = true, length = 6 }: TransactionsLinkProps) => {
  if (!txId) return null;

  const displayText = isShorten ? shorten(txId, length) : txId;

  return (
    <Link to={`/transactions/details/${txId}`}>
      <Typography copyable={copyable} copyText={txId}>
        {displayText}
      </Typography>
    </Link>
  );
};
