import Donations from '@/components/Donations';
import { Box, Divider, useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { ReactNode } from 'react';
import Footer from './Footer';
import { Header } from './Header';
import { Navbar } from './Navbar';

export interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const theme = useTheme() as Theme;
  return (
    <>
      <Header />
      <Divider
        style={{
          margin: '0',
        }}
      />
      <Navbar />
      <Divider style={{ margin: '0' }} />
      <Box
        component="main"
        sx={{
          backgroundImage:
            theme.palette.mode === 'light'
              ? theme.colors.mainBackground
              : theme.colors.darkMainBackground,
        }}
      >
        {children}
      </Box>
      <Footer />
      <Donations />
    </>
  );
}
