import { AddressLink } from '@/components/Link';
import Typography from '@/components/Typography';
import MainCard from '@/components/ui-component/cards/MainCard';
import { useTransaction } from '@/hooks';
import { useRouter } from '@/hooks/useCustomRouter';
import {
  formatDollarAmount,
  NA,
  timestampFormat,
  toSignificantWithGroupSeparator,
} from '@/utils';
import { Box, Divider, Grid, Skeleton, useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';
import upperFirst from 'lodash/upperFirst';

import { FaHourglassStart, FaRegClock } from 'react-icons/fa';

export default function TransactionDetails() {
  const theme = useTheme() as Theme;
  const router = useRouter();
  const id = router.query.id as string;

  const { result: transaction, loading } = useTransaction(id);

  return (
    <Box className="wrap" sx={{ margin: '0 auto' }}>
      <Box sx={{ margin: 'var(--space-24) 0' }}>
        <Typography variant="h4">Transaction Detail</Typography>
      </Box>
      <MainCard
        className="transactions-card"
        sx={{ padding: 'var(--space-20)' }}
      >
        {loading ? (
          <Skeleton />
        ) : (
          <>
            <Grid display="flex" gap="var(--space-20) 0" flexDirection="column">
              {/* <Grid display="flex" className="transactions-item">
                  <Typography className="transactions-label" sx={{width: {xs: 'var(--space-100)', sm: 'var(--space-180)'}}}>Transaction TxId:</Typography>
                  <Typography>{transaction?.id}</Typography>
                </Grid> */}

              <Grid display="flex" className="transactions-item">
                <Typography
                  className="transactions-label"
                  sx={{
                    width: {
                      xs: 'var(--space-100)',
                      sm: 'var(--space-180)',
                      flexShrink: 0,
                    },
                  }}
                >
                  Index:
                </Typography>
                <Typography>
                  <FaHourglassStart
                    fill={
                      theme.palette.mode === 'dark'
                        ? theme.colors.paper
                        : theme.colors.grey600
                    }
                  />
                  {transaction?.token0TxIndex}
                </Typography>
              </Grid>

              <Grid display="flex" className="transactions-item">
                <Typography
                  className="transactions-label"
                  sx={{
                    width: {
                      xs: 'var(--space-100)',
                      sm: 'var(--space-180)',
                      flexShrink: 0,
                    },
                  }}
                >
                  Timestamp:
                </Typography>
                <Typography>
                  <FaRegClock
                    fill={
                      theme.palette.mode === 'dark'
                        ? theme.colors.paper
                        : theme.colors.grey600
                    }
                  />
                  {timestampFormat(transaction?.token0TxTime ?? '')}
                </Typography>
              </Grid>

              <Grid display="flex" className="transactions-item">
                <Typography
                  className="transactions-label"
                  sx={{
                    width: {
                      xs: 'var(--space-100)',
                      sm: 'var(--space-180)',
                      flexShrink: 0,
                    },
                  }}
                >
                  Type:
                </Typography>
                <Typography>{upperFirst(transaction?.op)}</Typography>
              </Grid>
            </Grid>
            <Divider sx={{ margin: 'var(--space-24) 0' }} />
            <Grid display="flex" gap="var(--space-20) 0" flexDirection="column">
              <Grid display="flex" className="transactions-item">
                <Typography
                  className="transactions-label"
                  sx={{
                    width: {
                      xs: 'var(--space-100)',
                      sm: 'var(--space-180)',
                      flexShrink: 0,
                    },
                  }}
                >
                  From:
                </Typography>
                <AddressLink
                  owner={
                    transaction?.fromAlias ??
                    transaction?.fromOwner ??
                    transaction?.fromAccountId
                  }
                  copyable
                  shorten={false}
                />
              </Grid>

              <Grid display="flex" className="transactions-item">
                <Typography
                  className="transactions-label"
                  sx={{
                    width: {
                      xs: 'var(--space-100)',
                      sm: 'var(--space-180)',
                      flexShrink: 0,
                    },
                  }}
                >
                  To:
                </Typography>
                <AddressLink
                  owner={
                    transaction?.toAlias ??
                    transaction?.toOwner ??
                    transaction?.toAccountId
                  }
                  copyable
                  shorten={false}
                />
              </Grid>
            </Grid>
            <Divider sx={{ margin: 'var(--space-24) 0' }} />
            <Grid display="flex" gap="var(--space-20) 0" flexDirection="column">
              <Grid display="flex" className="transactions-item">
                <Typography
                  className="transactions-label"
                  sx={{
                    width: {
                      xs: 'var(--space-100)',
                      sm: 'var(--space-180)',
                      flexShrink: 0,
                    },
                  }}
                >
                  Token0 Amount:
                </Typography>
                <Typography>
                  {toSignificantWithGroupSeparator(
                    transaction?.token0Amount ?? 0,
                  )}{' '}
                  {transaction?.token0Symbol} (
                  {formatDollarAmount(transaction?.token0Value)})
                </Typography>
              </Grid>

              <Grid display="flex" className="transactions-item">
                <Typography
                  className="transactions-label"
                  sx={{
                    width: {
                      xs: 'var(--space-100)',
                      sm: 'var(--space-180)',
                      flexShrink: 0,
                    },
                  }}
                >
                  Token1 Amount:
                </Typography>
                <Typography>
                  {transaction?.token1Amount
                    ? `${toSignificantWithGroupSeparator(
                        transaction?.token1Amount,
                      )} ${transaction?.token0Symbol}`
                    : NA}
                </Typography>
              </Grid>

              <Grid display="flex" className="transactions-item">
                <Typography
                  className="transactions-label"
                  sx={{
                    width: {
                      xs: 'var(--space-100)',
                      sm: 'var(--space-180)',
                      flexShrink: 0,
                    },
                  }}
                >
                  Transaction Fee:
                </Typography>
                <Typography>
                  {transaction?.token0Fee
                    ? `${toSignificantWithGroupSeparator(
                        transaction?.token0Fee,
                      )} ${transaction?.token0Symbol}`
                    : NA}
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ margin: 'var(--space-24) 0' }} />
            <Grid display="flex" gap="var(--space-20) 0" flexDirection="column">
              <Grid display="flex" className="transactions-item">
                <Typography
                  className="transactions-label"
                  sx={{
                    width: {
                      xs: 'var(--space-100)',
                      sm: 'var(--space-180)',
                      flexShrink: 0,
                    },
                  }}
                >
                  Memo:
                </Typography>
                <Typography>
                  {transaction?.token0TxMemo ? transaction?.token0TxMemo : NA}
                </Typography>
              </Grid>

              <Grid display="flex" className="transactions-item">
                <Typography
                  className="transactions-label"
                  sx={{
                    width: {
                      xs: 'var(--space-100)',
                      sm: 'var(--space-180)',
                      flexShrink: 0,
                    },
                  }}
                >
                  Source:
                </Typography>
                <Typography>{transaction?.source}</Typography>
              </Grid>

              <Grid display="flex" className="transactions-item">
                <Typography
                  className="transactions-label"
                  sx={{
                    width: {
                      xs: 'var(--space-100)',
                      sm: 'var(--space-180)',
                      flexShrink: 0,
                    },
                  }}
                >
                  Source Canister:
                </Typography>
                <Typography>{transaction?.sourceCanister}</Typography>
              </Grid>
            </Grid>
          </>
        )}
      </MainCard>
    </Box>
  );
}
