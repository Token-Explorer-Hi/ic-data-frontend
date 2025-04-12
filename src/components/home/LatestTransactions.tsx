import { Link, TransactionsAddressLink } from '@/components/index';
import NoData from '@/components/NoData';
import Typography from '@/components/Typography';
import MainCard from '@/components/ui-component/cards/MainCard';
import { useTransactions } from '@/hooks';
import { Transaction } from '@/types';
import { secondsToDuration, toSignificantWithGroupSeparator } from '@/utils';
import { Divider, Grid, Skeleton, useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Fragment, useMemo } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';

interface LatestTransactionProps {
  transaction: Transaction;
}

function LatestTransaction({ transaction }: LatestTransactionProps) {
  const seconds = useMemo(() => {
    const txTime = new Date(transaction.token0TxTime).getTime();
    const now = new Date().getTime();
    return parseInt(String((now - txTime) / 1000));
  }, [transaction]);

  return (
    <Grid
      container
      display="flex"
      alignItems="center"
      className="home-row"
      sx={{
        padding: {
          sm: 'var(--space-12) var(--space-24)',
          xs: 'var(--space-12) var(--space-12)',
        },
      }}
    >
      <Grid item xs={4}>
        <Typography style={{ fontWeight: 500 }} className="op">
          {transaction.op}
        </Typography>
        <Typography style={{ fontSize: 'var(--space-12)' }}>
          {secondsToDuration({ seconds: BigInt(seconds) })}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Grid display="flex" item>
          <Typography whiteSpace="nowrap">From&nbsp;</Typography>
          <TransactionsAddressLink
            fontWeight={500}
            owner={transaction.fromOwner ?? transaction.fromAccountId}
            sub={transaction.fromSubaccount}
            alias={transaction.fromAlias}
          />
        </Grid>
        <Grid display="flex" item>
          <Typography whiteSpace="nowrap">To&nbsp;</Typography>
          <TransactionsAddressLink
            owner={transaction.toOwner ?? transaction.toAccountId}
            sub={transaction.toSubaccount}
            alias={transaction.toAlias}
            fontWeight={500}
          />
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid display="flex" justifyContent="flex-end">
          <Typography style={{ fontWeight: 500 }}>
            {toSignificantWithGroupSeparator(transaction.token0Amount)}&nbsp;
            {transaction.token0Symbol}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export function LatestTransactions() {
  const theme = useTheme() as Theme;
  const size = 25;
  const { result: transactions, loading } = useTransactions({ page: 1, size });

  return (
    <MainCard
      title="Latest Transactions"
      className="home-card"
      style={{ minHeight: 500 }}
    >
      {loading ? (
        <Grid
          display="flex"
          flexDirection="column"
          gap="var(--space-8)"
          style={{ padding: 'var(--space-14)' }}
        >
          {Array.from({ length: size }).map((_, index: number) => (
            <Skeleton key={index} height="var(--space-56)" />
          ))}
        </Grid>
      ) : transactions?.list.length ? (
        <>
          {transactions?.list?.map((transaction: any, index: number) => {
            return (
              <Fragment key={`${transaction?.id}_${index}`}>
                <LatestTransaction transaction={transaction} />
                {index !== transactions?.list?.length - 1 && <Divider />}
              </Fragment>
            );
          })}
          <Grid
            display="flex"
            className="home-card-footer"
            justifyContent="center"
            alignItems="center"
            gap="var(--space-4)"
            sx={{
              padding: {
                xs: 'var(--space-12) 0',
                sm: 'var(--space-24) 0',
              },
              background:
                theme.palette.mode === 'dark'
                  ? 'none'
                  : 'var(--background-secondary)',
              borderTop:
                theme.palette.mode === 'dark'
                  ? '1px solid rgba(255, 255,255,0.2)'
                  : 'none',
            }}
          >
            <Link to="/transactions">
              <Typography>VIEW ALL TRANSACTIONS</Typography>
            </Link>
            <FaArrowRightLong color="var(--typography-color)" />
          </Grid>
        </>
      ) : (
        <>
          <NoData />
        </>
      )}
    </MainCard>
  );
}
