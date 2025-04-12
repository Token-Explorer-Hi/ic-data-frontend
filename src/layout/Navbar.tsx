import logo from '@/assets/images/logo.svg';
import { Link } from '@/components/index';
import Typography from '@/components/Typography';
import { useRouter } from '@/hooks/useCustomRouter';
import { Grid } from '@mui/material';
import { useMemo } from 'react';
import { navbar } from './navbar.config';
import styles from './Navbar.module.scss';

interface NavbarItemProps {
  path: string;
  label: React.ReactNode;
}

function NavbarItem({ path, label }: NavbarItemProps) {
  const router = useRouter();

  const active = useMemo(() => {
    const name = router.pathname.split('/')[1];
    if (path === '/' && name === '') return true;
    const path_name = path.split('/')[1];
    return path_name === name;
  }, [path, router]);

  return (
    <Link key={path} to={path}>
      <Typography
        variant="h4"
        sx={{
          fontSize: {
            xs: 'var(--space-11)!important',
            sm: 'var(--space-14)!important',
          },
          padding: {
            xs: 'var(--space-4)',
            sm: 'var(--space-4) var(--space-6)',
          },
        }}
        className={`${styles['nav-bar-typography']} ${
          active ? styles['active'] : ''
        }`}
      >
        {label}
      </Typography>
    </Link>
  );
}

export function Navbar() {
  return (
    <Grid display="flex" sx={{ width: '100%', justifyContent: 'center' }}>
      <Grid
        display="flex"
        className="wrap"
        sx={{
          width: '100%',
          height: {
            sm: 'var(--space-54)',
            xs: 'var(--space-42)',
          },
          padding: '0 var(--space-12)',
        }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid
          display="flex"
          alignItems="center"
          sx={{
            cursor: 'pointer',
          }}
        >
          <Link to="/" style={{ display: 'flex', gap: 'var(--space-10)' }}>
            <img
              src={logo}
              style={{
                maxWidth: 'var(--space-30)',
                maxHeight: 'var(--space-30)',
              }}
              alt=""
            />
            <Typography
              variant="h1"
              fontWeight="normal"
              whiteSpace={'nowrap'}
              fontSize={{ xs: 'var(--space-16)', sm: `var(--space-24)` }}
              display={{ xs: 'none', sm: 'block' }}
            >
              IC Explorer
            </Typography>
          </Link>
        </Grid>
        <Grid
          display="flex"
          sx={{
            gap: {
              sm: 'var(--space-24)',
              xs: 'var(--space-4)',
            },
            alignItems: 'center',
          }}
        >
          {navbar.map((e) => (
            <NavbarItem key={e.path} path={e.path} label={e.label} />
          ))}
          <Grid sx={{ display: { xs: 'none', md: 'flex' } }}>
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
        </Grid>
      </Grid>
    </Grid>
  );
}
