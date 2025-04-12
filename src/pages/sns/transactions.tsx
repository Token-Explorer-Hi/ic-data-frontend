import { TokenTransactions } from '@/components/token/index';
import MainCard from '@/components/ui-component/cards/MainCard';
import { useRouter } from '@/hooks/useCustomRouter';
import { Grid, Typography, useTheme } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Theme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

const DIFF_TIME = 90 * 24 * 3600;

export default function SNSTransactions() {
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    from: new Date(Date.now() - DIFF_TIME * 1000),
    to: new Date(Date.now()),
  });
  const theme = useTheme() as Theme;
  const router = useRouter();
  const color =
    theme.palette.mode === 'dark' ? theme.colors.grey400 : theme.colors.grey600;
  const id = router.query.id;
  const [canisters, setCanisters] = useState<any>(null);
  const [ledgerId, setLedgerId] = useState<any>(null);
  useEffect(() => {
    if (!id) return;
    async function fetchCanisterInfo() {
      // SNS canisters
      const result = await fetch(
        `https://sns-api.internetcomputer.org/api/v1/snses/${id}`,
      );
      const canisters = await result.json();
      setCanisters(canisters);
      setLedgerId(
        canisters.canisters.find((item: any) => item.canister_type === 'ledger')
          .canister_id,
      );
    }

    fetchCanisterInfo();
  }, [id]);

  const symbol = canisters?.icrc1_metadata?.icrc1_symbol;
  return (
    <Grid
      className="wrap"
      display="flex"
      flexDirection="column"
      style={{
        padding: 'var(--space-14)',
        flex: 1,
      }}
      sx={{
        gap: {
          xs: 'var(--space-12)',
          sm: 'var(--space-24)',
        },
      }}
    >
      <Grid
        container
        display="flex"
        flexDirection={'column'}
        gap={'var(--space-24)'}
      >
        <Grid>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/sns">
              SNSs
            </Link>
            <Link underline="hover" color="inherit" href={`/sns/${id}`}>
              {symbol}
            </Link>
            <Typography sx={{ color: 'text.primary' }}>Transactions</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid
          item
          xs={6}
          display={'flex'}
          flexDirection={'column'}
          gap="var(--space-24)"
        >
          <Typography fontSize="var(--space-32)">
            {symbol} Transactions
          </Typography>
          <Typography fontSize="var(--space-14)">
            {symbol} is an ICRC-1-compliant token unique to the {symbol} Service
            Nervous System (SNS) DAO. {symbol} transactions are facilitated
            through a ledger canister, which in conjunction with archive
            canisters, tracks {symbol} account balances and transaction history
            between accounts. An index canister provides access to {symbol}{' '}
            transactions associated with individual accounts.
          </Typography>
        </Grid>
      </Grid>
      <MainCard>
        <TokenTransactions id={ledgerId} selectedRange={selectedRange} />
      </MainCard>
    </Grid>
  );
}
