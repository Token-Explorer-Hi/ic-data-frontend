import { Link, SiteIcon } from '@/components/index';
import Typography from '@/components/Typography';
import MainCard from '@/components/ui-component/cards/MainCard';
import { useToken } from '@/hooks';
import { NA, parseTokenAmount } from '@/utils';
import { Grid } from '@mui/material';
import { ReactNode, useMemo } from 'react';
import { isElement } from 'react-is';

interface ItemProps {
  label: ReactNode;
  value: ReactNode;
}

function Item({ label, value }: ItemProps) {
  return (
    <Grid display="flex">
      <Grid
        display="flex"
        alignItems="center"
        sx={{ width: { xs: 'var(--space-140)', sm: 'var(--space-180)' } }}
      >
        <Typography whiteSpace="nowrap">{label}</Typography>
      </Grid>

      <div style={{ flex: 1 }}>
        {isElement(value) ? value : <Typography>{value}</Typography>}
      </div>
    </Grid>
  );
}

export interface TokenInfoProps {
  id: string;
}

export function TokenInfo({ id }: TokenInfoProps) {
  const { result: tokenDetails } = useToken(id);
  const socialMediaLinks = useMemo(() => {
    if (!tokenDetails || tokenDetails.tokenDetail === null) return [];

    const __links = tokenDetails.tokenDetail ?? {};

    if (__links.url && __links.Website) {
      Reflect.deleteProperty(__links, 'Website');
    }

    return Object.keys(__links).map((key) => [
      key === 'url' ? 'Website' : key,
      tokenDetails.tokenDetail[key],
    ]) as Array<[string, string]>;
  }, [tokenDetails]);

  return (
    <MainCard
      border={false}
      contentSX={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-24)',
        padding: 'var(--space-16)',
      }}
    >
      <Typography variant="h4">OVERVIEW</Typography>
      {tokenDetails?.description && (
        <Typography>{tokenDetails.description}</Typography>
      )}
      <Grid display="flex" gap="var(--space-20) 0" flexDirection="column">
        {tokenDetails?.name && (
          <Item label="Name: " value={tokenDetails.name || NA} />
        )}
        {tokenDetails?.symbol && (
          <Item label="Symbol: " value={tokenDetails.symbol || NA} />
        )}
        {tokenDetails?.tokenDecimal && (
          <Item label="Decimals: " value={tokenDetails.tokenDecimal || NA} />
        )}
        {tokenDetails?.totalSupply && (
          <Item
            label="Total Supply: "
            value={
              Number(
                tokenDetails.totalSupply / 10 ** tokenDetails.tokenDecimal,
              ).toLocaleString() || NA
            }
          />
        )}
        {tokenDetails?.fee && tokenDetails?.tokenDecimal && (
          <Item
            label="Transfer Fee: "
            value={`${parseTokenAmount(
              tokenDetails.fee,
              tokenDetails.tokenDecimal,
            ).toFormat()} ${tokenDetails.symbol}`}
          />
        )}
        {tokenDetails?.cycleBalance && (
          <Item
            label="Cycles Balance: "
            value={
              <Typography>
                {Number(tokenDetails.cycleBalance / 1e12).toLocaleString() ??
                  NA}{' '}
                T
              </Typography>
            }
          />
        )}
        <Item
          label="Controller: "
          value={
            tokenDetails && tokenDetails.controllerArray ? (
              tokenDetails.controllerArray.map((controller: string) => (
                <Typography key={controller} copyable copyText={controller}>
                  {controller}
                </Typography>
              ))
            ) : (
              <Typography>NA</Typography>
            )
          }
        />
        {socialMediaLinks.length > 0 ? (
          <Item
            label="Social Media Links: "
            value={
              <Grid display="flex" alignItems="center" gap="0 var(--space-16)">
                {socialMediaLinks.map(([key, url]) => (
                  <Link key={key} to={url}>
                    <SiteIcon site={key} />
                  </Link>
                ))}
              </Grid>
            }
          />
        ) : null}
        {tokenDetails?.supplyCap && (
          <Item
            label="Supply Cap: "
            value={
              <Typography>
                {Number(
                  Number(tokenDetails.supplyCap) /
                    10 ** tokenDetails.tokenDecimal,
                ).toLocaleString() ?? NA}
              </Typography>
            }
          />
        )}
        {tokenDetails?.marketCap && (
          <Item
            label="Market Cap: "
            value={
              <Typography>
                ${Number(tokenDetails.marketCap).toLocaleString() ?? NA}
              </Typography>
            }
          />
        )}
        {tokenDetails?.fullyDilutedMarketCap && (
          <Item
            label="Fully Diluted Market Cap: "
            value={
              <Typography>
                $
                {Number(tokenDetails.fullyDilutedMarketCap).toLocaleString() ??
                  NA}
              </Typography>
            }
          />
        )}
        {tokenDetails?.tvl && (
          <Item
            label="Tvl: "
            value={
              <Typography>
                ${Number(tokenDetails.tvl).toLocaleString() ?? NA}
              </Typography>
            }
          />
        )}
        {tokenDetails?.txVolume24 && (
          <Item
            label="Volume(24H): "
            value={
              <Typography>
                ${Number(tokenDetails.txVolume24).toLocaleString() ?? NA}
              </Typography>
            }
          />
        )}

        {/* <Item
          label="Introduction: "
          value={<Typography>{tokenDetails ? tokenDetails.description :NA}</Typography>}
        /> */}
      </Grid>
    </MainCard>
  );
}
