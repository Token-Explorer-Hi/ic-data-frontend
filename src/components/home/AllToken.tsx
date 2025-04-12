import { Link, TokenSource } from '@/components/index';
import NoData from '@/components/NoData';
import Typography from '@/components/Typography';
import MainCard from '@/components/ui-component/cards/MainCard';
import { useTokens } from '@/hooks';
import { generateLogoUrl } from '@/hooks/token/useTokenLogo';
import { useRouter } from '@/hooks/useCustomRouter';
import {
  formatDollarAmount,
  NA,
  toSignificantWithGroupSeparator,
} from '@/utils';
import { Divider, Grid, Skeleton, useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Fragment, useMemo } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';

export function AllTokens() {
  const theme = useTheme() as Theme;
  const router = useRouter();
  // const size = getPageSize(13);
  const size = 25;
  const { result: tokens, loading } = useTokens(
    useMemo(() => {
      return { page: 1, size };
    }, []),
  );

  return (
    <MainCard
      title="Tokens"
      className="home-card"
      style={{ minHeight: 500, height: '100%' }}
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
      ) : tokens?.list.length ? (
        <>
          {tokens?.list?.map((token: any, index: number) => (
            <Fragment key={`${token.ledgerId}_${index}`}>
              <Grid
                display="flex"
                alignItems="center"
                justifyContent="center"
                className="home-row"
                onClick={() => router.push(`/token/details/${token.ledgerId}`)}
                sx={{
                  padding: {
                    sm: 'var(--space-12) var(--space-24)',
                    xs: 'var(--space-12) var(--space-12)',
                  },
                  cursor: 'pointer',
                }}
              >
                <Grid item xs={4}>
                  <Grid
                    display="flex"
                    alignItems="center"
                    gap="0 var(--space-5)"
                  >
                    <img
                      style={{
                        width: 'var(--space-24)',
                        height: 'var(--space-24)',
                        borderRadius: '50%',
                      }}
                      src={generateLogoUrl(token.ledgerId)}
                      alt=""
                    />
                    <Typography>{token.symbol}</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={6} display="flex" flexDirection="column">
                  <Typography style={{ fontWeight: 500 }}>
                    {formatDollarAmount(token.price)}
                  </Typography>
                  <Typography style={{ fontWeight: 500 }}>
                    {token.priceICP
                      ? `${toSignificantWithGroupSeparator(token.priceICP)} ICP`
                      : NA}
                  </Typography>
                </Grid>
                <Grid
                  display="flex"
                  item
                  xs={2}
                  justifyContent="center"
                  alignItems="flex-end"
                >
                  <TokenSource source={token.source} />
                </Grid>
              </Grid>
              {index !== tokens?.list?.length - 1 && <Divider />}
            </Fragment>
          ))}
          <Grid
            display="flex"
            className="home-card-footer"
            justifyContent="center"
            alignItems="center"
            gap="var(--space-4)"
            sx={{
              padding: { xs: 'var(--space-12) 0', sm: 'var(--space-24) 0' },
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
            <Link to="/token">
              <Typography>VIEW ALL TOKENS</Typography>
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
