import { OverviewItem } from '@/components/index';
import MainCard from '@/components/ui-component/cards/MainCard';
import { Divider, Grid, useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';

import { useGlobalContext } from '@/context/useGlobalContext';
import { BigNumber, formatAmount, formatDollarAmount, NA } from '@/utils';
import { useEffect, useState } from 'react';
import {
  Compass,
  DollarSign,
  FileText,
  Repeat,
  TrendingUp,
} from 'react-feather';

export default function GlobalData() {
  const theme = useTheme() as Theme;
  const { globalData } = useGlobalContext();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  const borderLeft = `var(--space-1) solid ${
    theme.palette.mode === 'dark' ? 'rgba(255,255,255, 0.2)' : '#eeeeee'
  }`;
  return (
    <MainCard width="100%" className="overview-wrapper">
      <Grid
        display="flex"
        className="overview-row"
        sx={{
          alignItems: {
            xs: 'center',
            sm: 'flex-start',
          },
          padding: {
            sm: 'var(--space-20)',
            xs: 0,
          },
          flexDirection: {
            sm: 'row',
            xs: 'column',
          },
        }}
      >
        <Grid
          className="overview-col"
          xs={12}
          lg={4}
          width="100%"
          sx={{
            padding: 'var(--space-20)',
            '&:not(:first-of-type)': {
              borderLeft: {
                xs: 'none',
                sm: borderLeft,
              },
            },
          }}
        >
          <Grid display="flex" gap="0 var(--space-10)" alignItems="flex-start">
            <Compass />
            <OverviewItem
              title="ICP Price"
              value={globalData ? formatDollarAmount(globalData.icpPrice) : NA}
            />
          </Grid>
          <Divider
            sx={{
              margin: {
                xs: 'var(--space-16) 0',
                md: 'var(--space-24) 0',
              },
            }}
            variant="middle"
          />
          <Grid display="flex" gap="0 var(--space-10)" alignItems="flex-start">
            <DollarSign />
            <OverviewItem
              title="IC Tokens Tracked"
              value={
                globalData
                  ? new BigNumber(globalData.tokenCount).toFormat()
                  : NA
              }
            />
          </Grid>
        </Grid>
        <Divider
          sx={{
            display: { xs: 'block', sm: 'none' },
            width: 'calc(100% - var(--space-40))',
          }}
        />
        <Grid
          className="overview-col"
          xs={12}
          lg={4}
          width="100%"
          sx={{
            padding: 'var(--space-20)',
            '&:not(:first-of-type)': {
              borderLeft: {
                xs: 'none',
                sm: borderLeft,
              },
            },
          }}
        >
          <Grid display="flex" gap="0 var(--space-10)" alignItems="flex-start">
            <TrendingUp />
            <OverviewItem
              title="Total ICP Value Locked"
              value={globalData ? formatDollarAmount(globalData.icpTVL) : NA}
            />
          </Grid>
          <Divider
            sx={{
              margin: {
                xs: 'var(--space-16) 0',
                md: 'var(--space-24) 0',
              },
            }}
            variant="middle"
          />
          <Grid display="flex" gap="0 var(--space-10)" alignItems="flex-start">
            <Repeat />
            <OverviewItem
              title="Transactions"
              value={
                globalData ? formatAmount(globalData.transactionCount) : NA
              }
            />
          </Grid>
        </Grid>
        <Divider
          sx={{
            display: { xs: 'block', sm: 'none' },
            width: 'calc(100% - var(--space-40))',
          }}
        />
        <Grid
          className="overview-col"
          xs={12}
          lg={4}
          width="100%"
          sx={{
            padding: 'var(--space-20)',
            '&:not(:first-of-type)': {
              borderLeft: {
                xs: 'none',
                sm: borderLeft,
              },
            },
          }}
        >
          <Grid display="flex" gap="0 var(--space-10)" alignItems="flex-start">
            <FileText />
            <OverviewItem
              title="Total Address"
              value={globalData ? formatAmount(globalData.addressCount) : NA}
            />
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
}
