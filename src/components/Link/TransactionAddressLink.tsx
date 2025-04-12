import { TransactionTooltip } from '@/components/Tooltip';
import Typography from '@/components/Typography';
import { NONE_SUB_HEX } from '@/constants/index';
import { NA, principalToAccount, shorten, subaccountHexToBytes } from '@/utils';
import { encodeIcrcAccount } from '@dfinity/ledger-icrc';
import { Principal } from '@dfinity/principal';
import { useMemo } from 'react';
import { Link } from './Link';

export interface TransactionsAddressLinkProps {
  owner: string | undefined | null;
  copyable?: boolean;
  shorten?: boolean;
  length?: number;
  toAccount?: boolean;
  sub?: string | null;
  alias?: string | undefined | null;
  fontWeight?: number;
}

export const TransactionsAddressLink = ({
  owner,
  shorten: isShorten = true,
  length = 8,
  copyable,
  toAccount,
  sub,
  alias,
  fontWeight = 400,
}: TransactionsAddressLinkProps) => {
  const address = useMemo(() => {
    if (!owner) return null;
    if (toAccount) return principalToAccount(owner);
    if (sub && sub !== NONE_SUB_HEX) {
      const account = encodeIcrcAccount({
        owner: Principal.fromText(owner),
        subaccount: subaccountHexToBytes(sub),
      });
      return account;
    }
    return owner;
  }, [owner, toAccount, sub]);

  if (!address) return <Typography>{NA}</Typography>;

  return address ? (
    <Typography
      copyable={copyable}
      style={{ display: 'flex', alignItems: 'center', fontWeight }}
      whiteSpace="nowrap"
      copyText={
        alias ?? (isShorten ? `${shorten(address, length)}` : `${address}`)
      }
    >
      <TransactionTooltip owner={owner} sub={sub}>
        <Link to={`/address/details/${address}`}>
          {alias ?? (isShorten ? `${shorten(address, length)}` : `${address}`)}
        </Link>
      </TransactionTooltip>
    </Typography>
  ) : (
    <Typography style={{ display: 'flex', alignItems: 'center' }}>
      {NA}
    </Typography>
  );
};
