import { Link } from "./Link";
import Typography from "@/components/Typography";
import { shorten } from "@/utils";

export interface TokenLinkProps {
  id: string;
  copyable?: boolean;
  shorten?: boolean;
  length?: number;
}

export const TokenLink = ({ id, copyable, shorten: isShorten = true, length = 6 }: TokenLinkProps) => {
  if (!id) return null;

  const displayText = isShorten ? shorten(id, length) : id;

  return (
    <Link to={`/token/details/${id}`}>
      <Typography copyable={copyable} copyText={id}>
        {displayText}
      </Typography>
    </Link>
  );
};
