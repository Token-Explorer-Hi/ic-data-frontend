import { AddressTokens, AddressTransactions } from '@/components/address/index';
import ICExplorerDayPicker from '@/components/DayPicker';
import { OverviewItem, TextualAddressLink } from '@/components/index';
import { AddressLink } from '@/components/Link';
import Typography from '@/components/Typography';
import MainCard from '@/components/ui-component/cards/MainCard';
import { useAddress } from '@/hooks';
import { useRouter } from '@/hooks/useCustomRouter';
import {
  BigNumber,
  formatDollarAmount,
  isValidPrincipal,
  NA,
  principalToAccount,
  toHexString,
} from '@/utils';
import { decodeIcrcAccount } from '@dfinity/ledger-icrc';
import { Button, Divider, Grid } from '@mui/material';
import { toSvg } from 'jdenticon';
import React, { useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import Inlinesvg from 'react-inlinesvg';

const DIFF_TIME = 90 * 24 * 3600 * 1000;

export default function AddressDetails() {
  const router = useRouter();
  const id = router.query.id as string;
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    from: new Date(Date.now() - DIFF_TIME),
    to: new Date(Date.now()),
  });

  const { principal, account, accountTextual, sub } = useMemo(() => {
    if (!id) return {};
    if (isValidPrincipal(id))
      return { principal: id, account: principalToAccount(id) };
    if (id.includes('-')) {
      try {
        const { owner, subaccount } = decodeIcrcAccount(id);
        return {
          principal: owner.toString(),
          account: principalToAccount(owner.toString()),
          sub: subaccount,
          accountTextual: id,
        };
      } catch (error) {
        console.warn(error);
      }
    }

    return { account: id, principal: null };
  }, [id]);

  const searchId = useMemo(() => {
    if (principal) return principal;
    if (accountTextual) return accountTextual;
    return account;
  }, [accountTextual, principal, account]);
  const { result: addressDetail } = useAddress(searchId);
  // Tab state management
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Grid
      container
      display="flex"
      flexDirection="column"
      className="wrap"
      sx={{
        margin: '0 auto',
        gap: {
          xs: 'var(--space-12)',
          sm: 'var(--space-24)',
        },
        padding: '0 var(--space-14) var(--space-14)',
        flex: 1,
      }}
    >
      <Grid
        display="flex"
        alignItems="center"
        sx={{
          width: '100%',
          gap: 'var(--space-8)',
          margin: {
            xs: 'var(--space-16) 0 0',
            sm: 'var(--space-24) 0 0',
          },
        }}
      >
        {addressDetail?.principal ? (
          <Inlinesvg src={toSvg(addressDetail?.principal, 24)} />
        ) : (
          ''
        )}
        <Typography variant="h4">
          {addressDetail?.alias ?? 'Address'}
        </Typography>
        {/* <ButtonGroup sx={{ marginLeft: "auto" }}>
          <Button size="small" variant="contained">
            Buy
          </Button>
        </ButtonGroup> */}
      </Grid>
      <Divider />
      <Grid display="flex" flexDirection="column" item gap="var(--space-10)">
        {accountTextual && (
          <Grid display="flex" gap="0 var(--space-10)">
            <Typography>ID:</Typography>
            <TextualAddressLink
              copyable
              shorten={false}
              textualAddress={accountTextual}
            />
          </Grid>
        )}
        <Grid display="flex" gap="0 var(--space-10)" alignItems="flex-start">
          <Typography>Principal ID:</Typography>
          <AddressLink
            owner={principal ?? addressDetail?.principal}
            copyable
            shorten={false}
          />
        </Grid>
        {sub && (
          <Grid display="flex" gap="0 var(--space-10)">
            <Typography whiteSpace="nowrap">Subaccount:</Typography>
            <Typography>{toHexString(sub)}</Typography>
          </Grid>
        )}
        {!accountTextual && (
          <Grid display="flex" gap="0 var(--space-10)">
            <Typography whiteSpace="nowrap">Account ID:</Typography>
            <AddressLink
              owner={account ?? addressDetail?.account}
              copyable
              shorten={false}
            />
          </Grid>
        )}
      </Grid>
      <MainCard
        sx={{
          padding: {
            xs: '1rem',
          },
        }}
      >
        <Typography variant="h4" sx={{ margin: 0 }}>
          Overview
        </Typography>
        <Grid
          display="flex"
          gap="0 var(--space-10)"
          sx={{
            margin: {
              xs: 'var(--space-12) 0 0 0',
              sm: 'var(--space-24) 0 0 0',
            },
          }}
        >
          <Grid
            display="flex"
            className="address-overview"
            sx={{
              width: '100%',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              gap: {
                xs: 'var(--space-12)',
                sm: 'var(--space-24)',
              },
            }}
          >
            <OverviewItem
              title="ICP Balance"
              value={
                addressDetail
                  ? new BigNumber(addressDetail.icpBalance).toFormat(8)
                  : NA
              }
            />
            <OverviewItem
              title="Token Value"
              value={`${
                addressDetail
                  ? `${formatDollarAmount(addressDetail.totalValueUSD)} (${
                      addressDetail.tokenCount
                    } tokens)`
                  : NA
              }`}
            />
          </Grid>
        </Grid>
      </MainCard>
      <Grid
        display="flex"
        flexDirection="column"
        gap={{
          xs: 'var(--space-12)',
          sm: 'var(--space-24)',
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
            color={tabIndex === 0 ? 'primary' : 'inherit'}
            variant="contained"
            onClick={(event: React.SyntheticEvent) => handleTabChange(event, 0)}
          >
            Transactions
          </Button>
          <Button
            size="small"
            color={tabIndex === 1 ? 'primary' : 'inherit'}
            variant="contained"
            onClick={(event: React.SyntheticEvent) => handleTabChange(event, 1)}
          >
            Tokens
          </Button>
          {tabIndex === 0 && (
            <ICExplorerDayPicker
              sx={{ marginLeft: 'auto' }}
              callback={setSelectedRange}
            />
          )}
        </Grid>
        <MainCard sx={{ padding: 0, flex: 1, minHeight: 'var(--space-250)' }}>
          {tabIndex === 0 && (
            <AddressTransactions address={id} selectedRange={selectedRange} />
          )}
          {tabIndex === 1 && <AddressTokens address={id} />}
        </MainCard>
      </Grid>
    </Grid>
  );
}
