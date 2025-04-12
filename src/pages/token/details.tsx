import ICExplorerDayPicker from '@/components/DayPicker';
import { TokenImage } from '@/components/index'; // Assuming Flex is custom or replaced by MUI Box/Grid
import { SiteIcon } from '@/components/SiteIcon'; // Assuming Flex is custom or replaced by MUI Box/Grid
import {
  TokenHolders,
  TokenInfo,
  TokenTransactions,
} from '@/components/token/index';
import Typography from '@/components/Typography';
import MainCard from '@/components/ui-component/cards/MainCard';
import { useToken } from '@/hooks';
import {
  BigNumber,
  formatDollarAmount,
  getFirstNonZeroDecimalPosition,
  NA,
  parseTokenAmount,
  toSignificantWithGroupSeparator,
} from '@/utils';
import { Button, Divider, Grid, Link, useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { useEffect, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';

import { Proportion } from '@/components/Proportion';
import { useRouter } from '@/hooks/useCustomRouter';

const DIFF_TIME = 90 * 24 * 3600;

interface OverviewItemProps {
  title: React.ReactNode;
  value: React.ReactNode;
}

function OverviewItem({ title, value }: OverviewItemProps) {
  const theme = useTheme() as Theme;
  return (
    <Grid display="flex" flexDirection="column" sx={{ flex: '50%' }}>
      <Typography
        className="item-title"
        sx={{
          color:
            theme.palette.mode === 'dark' ? theme.colors.grey400 : '#757575',
        }}
      >
        {title}
      </Typography>
      <Typography
        className="item-value"
        sx={{
          color: theme.palette.mode === 'dark' ? 'white' : 'black',
          margin: 'var(--space-10) 0 0 0',
        }}
      >
        {value}
      </Typography>
    </Grid>
  );
}

export default function TokenDetails() {
  const theme = useTheme() as Theme;
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    from: new Date(Date.now() - DIFF_TIME * 1000),
    to: new Date(Date.now()),
  });
  const router = useRouter();
  const id = router.query.id as string;
  const { result: tokenDetail } = useToken(id);
  const fullyMarketCap = useMemo(() => {
    if (!tokenDetail) return undefined;
    return parseTokenAmount(tokenDetail.totalSupply, tokenDetail.tokenDecimal)
      .multipliedBy(tokenDetail.price)
      .toString();
  }, [tokenDetail]);

  // Tab state management
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };
  useEffect(() => {
    if (tokenDetail?.priceICP) {
      document.title = `$${new BigNumber(tokenDetail?.price).toFormat(
        getFirstNonZeroDecimalPosition(tokenDetail?.price),
      )} | ${tokenDetail?.name} (${tokenDetail?.symbol}) IC Explorer`;
    }
    return () => {
      document.title = 'IC Explorer';
    };
  }, [tokenDetail]);

  const titleColor = theme.palette.mode === 'dark' ? 'white' : 'black';
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
          sm: 'var(--space-20)',
        },
      }}
    >
      <Grid display="flex" gap="0 var(--space-5)" alignItems="center">
        <Grid display="flex" sx={{ gap: 'var(--space-4)' }}>
          <TokenImage tokenId={id} />
          <Typography sx={{ fontWeight: 500, fontSize: 'var(--space-20)' }}>
            {tokenDetail?.name} ({tokenDetail?.symbol})
          </Typography>
        </Grid>
        {/* <ButtonGroup sx={{ marginLeft: "auto" }}>
            <Button variant="contained" size="small">
              Buy
            </Button>
          </ButtonGroup> */}
      </Grid>
      <Divider />
      <Grid display="flex" flexWrap="wrap" gap="var(--space-8)">
        {tokenDetail
          ? tokenDetail?.standardArray?.map((standrad: string) => (
              <Button
                key={standrad}
                variant="outlined"
                disabled
                size="small"
                sx={{
                  borderRadius: 'var(--space-100)',
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
              >
                {standrad}
              </Button>
            ))
          : null}
        {tokenDetail?.tokenDetail && (
          <Grid
            display="flex"
            alignItems="center"
            sx={{ marginLeft: 'auto', gap: 'var(--space-8)' }}
          >
            {Object.keys(tokenDetail.tokenDetail).map((key: string) => {
              return (
                <Link
                  href={tokenDetail.tokenDetail[key]}
                  key={key}
                  target="_blank"
                  rel="noreferrer"
                >
                  <SiteIcon site={key} />
                </Link>
              );
            })}
          </Grid>
        )}
      </Grid>
      <Grid
        display="flex"
        className="token-overview-wrapper"
        sx={{
          width: '100%',
          gap: {
            xs: 'var(--space-12)',
            sm: 'var(--space-20)',
          },
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        {/* Overview Card */}
        <MainCard
          contentSX={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            padding: 'var(--space-20)',
            gap: {
              xs: 'var(--space-12)',
              sm: 'var(--space-20)',
            },
          }}
          className="token-overview-card"
        >
          <Typography variant="h4" sx={{ margin: 0, color: titleColor }}>
            Overview
          </Typography>
          <Grid
            display="flex"
            flexDirection="column"
            gap={{
              xs: 'var(--space-12)',
              sm: 'var(--space-24)',
            }}
          >
            <OverviewItem
              title="MAX TOTAL SUPPLY"
              value={
                tokenDetail
                  ? parseTokenAmount(
                      tokenDetail.totalSupply,
                      tokenDetail.tokenDecimal,
                    ).toFormat()
                  : NA
              }
            />
            <OverviewItem
              title="HOLDERS"
              value={
                tokenDetail && tokenDetail.holderAmount
                  ? new BigNumber(tokenDetail.holderAmount).toFormat()
                  : NA
              }
            />
            <OverviewItem
              title="TOTAL TRANSACTIONS"
              value={
                tokenDetail && tokenDetail.transactionAmount
                  ? new BigNumber(tokenDetail.transactionAmount).toFormat()
                  : NA
              }
            />
            {/* <OverviewItem
                  title="Supported Standards"
                  value={tokenDetail ? tokenDetail.standardArray.join(",") : NA}
                /> */}
          </Grid>
        </MainCard>
        {/* Market Card */}
        <MainCard
          contentSX={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            padding: 'var(--space-20)',
            gap: 'var(--space-20)',
          }}
          className="token-overview-card"
        >
          <Typography variant="h4" sx={{ margin: 0, color: titleColor }}>
            Market
          </Typography>
          <Grid
            display="flex"
            flexDirection="column"
            gap={{
              xs: 'var(--space-12)',
              sm: 'var(--space-24)',
            }}
          >
            <OverviewItem
              title="PRICE"
              value={
                tokenDetail && tokenDetail.priceICP ? (
                  <Grid display="flex" gap="var(--space-4)">
                    <Typography sx={{ color: titleColor }}>
                      {formatDollarAmount(tokenDetail.price)}
                    </Typography>
                    <Typography fontSize="var(--space-12)">
                      {' '}
                      @ {toSignificantWithGroupSeparator(
                        tokenDetail.priceICP,
                      )}{' '}
                      ICP
                    </Typography>
                    {tokenDetail.priceChange24 && (
                      <Proportion
                        value={Number(tokenDetail.priceChange24)}
                        fontWeight={500}
                        bracket
                      />
                    )}
                  </Grid>
                ) : (
                  <Typography fontSize="var(--space-12)">NA</Typography>
                )
              }
            />
            <OverviewItem
              title="FULLY DILUTED MARKET CAP"
              value={
                fullyMarketCap
                  ? `$${Number(fullyMarketCap).toLocaleString()}`
                  : NA
              }
            />
            <OverviewItem
              title="MARKET CAP"
              value={
                tokenDetail?.marketCap
                  ? `$${Number(tokenDetail?.marketCap).toLocaleString()}`
                  : NA
              }
            />
          </Grid>
        </MainCard>
        {/* Other Card */}
        <MainCard
          contentSX={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            padding: 'var(--space-20)',
            gap: 'var(--space-20)',
          }}
          className="token-overview-card"
        >
          <Typography variant="h4" sx={{ margin: 0, color: titleColor }}>
            Other Info
          </Typography>
          <Grid
            display="flex"
            flexDirection="column"
            gap={{
              xs: 'var(--space-12)',
              sm: 'var(--space-24)',
            }}
          >
            <OverviewItem
              title="LEDGER ID"
              value={
                tokenDetail?.ledgerId ? (
                  <Typography
                    copyText={tokenDetail?.ledgerId}
                    copyable="true"
                    sx={{ color: titleColor }}
                  >
                    {tokenDetail?.ledgerId}{' '}
                  </Typography>
                ) : (
                  NA
                )
              }
            />
            <OverviewItem
              title="TOKEN DECIMAL"
              value={tokenDetail?.tokenDecimal}
            />
            <OverviewItem
              title="TOKEN FEE"
              value={
                tokenDetail
                  ? `${new BigNumber(tokenDetail?.fee ?? 0)
                      .dividedBy(10 ** (tokenDetail?.tokenDecimal ?? 0))
                      .toString()} ${tokenDetail?.symbol}`
                  : NA
              }
            />
          </Grid>
        </MainCard>
      </Grid>
      {/* Tabs Section */}
      <Grid
        display="flex"
        flexDirection="column"
        gap={{
          xs: 'var(--space-12)',
          sm: 'var(--space-20)',
        }}
        width="100%"
        flex={1}
      >
        <Grid
          item
          display="flex"
          gap="var(--space-12)"
          sx={{ flexWrap: 'wrap' }}
        >
          <Button
            size="small"
            variant="contained"
            color={tabIndex === 0 ? 'primary' : 'inherit'}
            onClick={(event: React.SyntheticEvent) => handleTabChange(event, 0)}
          >
            Transactions
          </Button>
          <Button
            size="small"
            variant="contained"
            color={tabIndex === 1 ? 'primary' : 'inherit'}
            onClick={(event: React.SyntheticEvent) => handleTabChange(event, 1)}
          >
            Holders
          </Button>
          <Button
            size="small"
            variant="contained"
            color={tabIndex === 2 ? 'primary' : 'inherit'}
            onClick={(event: React.SyntheticEvent) => handleTabChange(event, 2)}
          >
            Info
          </Button>
          {tabIndex === 0 && (
            <ICExplorerDayPicker
              sx={{ marginLeft: 'auto' }}
              callback={setSelectedRange}
            />
          )}
        </Grid>
        <MainCard
          sx={{
            padding: 0,
            flex: tabIndex <= 1 ? 1 : undefined,
            minHeight: 'var(--space-250)',
          }}
        >
          {tabIndex === 0 && (
            <TokenTransactions id={id} selectedRange={selectedRange} />
          )}
          {tabIndex === 1 && <TokenHolders tokenDetail={tokenDetail} id={id} />}
          {tabIndex === 2 && <TokenInfo id={id} />}
        </MainCard>
        {/* <Typography display="flex" sx={{ alignItems: "flex-start" }}>
          <MdOutlineTipsAndUpdates style={{ flexShrink: 0 }} /> A token is a representation of an on-chain or off-chain
          asset. The token page shows information such as price, total supply, holders, transfers and social links.
        </Typography> */}
      </Grid>
    </Grid>
  );
}
