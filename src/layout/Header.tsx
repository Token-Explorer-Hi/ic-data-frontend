import { GlobalSearch } from '@/components/GlobalSearch';
import { Proportion } from '@/components/Proportion';
import Typography from '@/components/Typography';
import { useToken } from '@/hooks';
import { useRouter } from '@/hooks/useCustomRouter';
import { formatDollarAmount, NA } from '@/utils';
import { Grid, useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { useMemo } from 'react';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

import { Link } from '@/components/Link';
import { useColorModeContext } from '@/context/ColorModeContext';
import styles from './Header.module.scss';

const themeIconStyles = {
  width: 'var(--space-20)',
  height: 'var(--space-20)',
};
export function Header() {
  const theme = useTheme() as Theme;
  const router = useRouter();
  const { result: icp } = useToken('ryjl3-tyaaa-aaaaa-aaaba-cai');
  const { toggleColorMode } = useColorModeContext();

  const homePage = useMemo(() => {
    return router.pathname === '/';
  }, [router]);
  return (
    <Grid
      display="flex"
      width="100%"
      justifyContent="center"
      bgcolor="transparent"
    >
      <Grid
        display="flex"
        className={`${styles['header-wrapper']} wrap`}
        width="100%"
        justifyContent="space-between"
        sx={{
          alignItems: 'center',
          flexWrap: {
            sm: 'nowrap',
            xs: 'wrap',
          },
          flexDirection: 'row',
          height: {
            sm: 'var(--space-56)',
            xs: 'auto',
          },
          padding: {
            sm: '0 var(--space-12)',
            xs: 'var(--space-12)',
          },
          gap: 'var(--space-12)',
          order: {
            xs: 0,
            sm: 1,
          },
        }}
      >
        <Grid display="flex" gap="0 var(--space-6)">
          <Typography style={{ fontWeight: 500 }}>
            ICP Price: {icp ? formatDollarAmount(icp.price) : NA}
          </Typography>
          {icp && icp.priceChange24 ? (
            <Proportion
              value={Number(icp.priceChange24)}
              fontWeight={500}
              bracket
            />
          ) : null}
        </Grid>
        {!homePage ? (
          <Grid
            display="flex"
            sx={{
              marginLeft: 'auto',
              width: '100%',
              maxWidth: { xs: '100%', sm: '480px' },
              order: 3,
            }}
          >
            <GlobalSearch />
          </Grid>
        ) : null}
        <Grid sx={{ display: { xs: 'flex', md: 'none', marginLeft: 'auto' } }}>
          <Link
            to="/about-ice"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '100px',
              height: 'var(--space-30)',
              padding: 'var(--space-12)',
              background: 'linear-gradient(90deg, #155DFF 0%, #02DDF9 100%)',
              fontSize: 'var(--space-12)',
              color: '#fff',
            }}
          >
            Learn about ICE
          </Link>
        </Grid>
        <Grid
          onClick={toggleColorMode}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            width: {
              sm: 'var(--space-24)',
              xs: 'var(--space-16)',
            },
            height: {
              sm: 'var(--space-24)',
              xs: 'var(--space-16)',
            },
            order: {
              xs: 1,
              sm: 3,
            },
          }}
        >
          {theme.palette.mode === 'light' ? (
            <MdOutlineLightMode style={themeIconStyles} />
          ) : (
            <MdOutlineDarkMode style={themeIconStyles} />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
