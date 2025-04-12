import { useRouter } from '@/hooks/useCustomRouter';
import { Button, Grid, Typography, useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { FaDonate } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';

export default function Donations() {
  const theme = useTheme() as Theme;
  const router = useRouter();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const isShow = sessionStorage.getItem('donations');
    if (!isShow) {
      setShow(true);
    }
  }, []);
  const handleHide = () => {
    setShow(false);
    sessionStorage.setItem('donations', 'false');
  };
  return show ? (
    <Grid
      sx={{
        position: 'fixed',
        zIndex: 100,
        left: 0,
        right: 0,
        margin: 'auto',
        bottom: 'var(--space-14)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid
        display="flex"
        alignItems="center"
        gap="var(--space-8)"
        sx={{
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.colors.darkMainBackground
              : theme.colors.paper,
          backgroundImage:
            theme.palette.mode === 'dark'
              ? theme.colors.darkMainBackground
              : theme.colors.paper,
          padding: 'var(--space-8)',
          boxShadow:
            theme.palette.mode === 'dark'
              ? 'none'
              : '0 var(--space-8) var(--space-16) rgb(189 197 209 / 80%)',
          borderRadius: 'var(--space-12)',
          maxWidth: 'calc(100% - var(--space-14) * 2)',
          border:
            theme.palette.mode === 'dark'
              ? 'var(--space-1) solid var(--gray-700)'
              : 'none',
        }}
      >
        <FaDonate style={{ flexShrink: 0, fontSize: 'var(--space-14)' }} />
        <Typography lineHeight="1.3">
          Support IC Explorer to keep ICP blockchain data open and accessible.
          Every donation helps!
        </Typography>
        <Button
          onClick={() => router.push('/sponsor')}
          variant="contained"
          size="small"
          sx={{ whiteSpace: 'nowrap' }}
        >
          Got it!
        </Button>
        <IoIosClose
          onClick={handleHide}
          style={{ fontSize: 'var(--space-24)' }}
        />
      </Grid>
    </Grid>
  ) : null;
}
