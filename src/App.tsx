import Donations from '@/components/Donations';
import ColorModeContextProvider from '@/context/ColorModeContext';
import { ConfigProvider } from '@/context/ConfigContext';
import GlobalContextProvider from '@/context/useGlobalContext';
import Footer from '@/layout/Footer';
import { Header } from '@/layout/Header';
import { Navbar } from '@/layout/Navbar';
import '@/styles/global.scss';
import { CssBaseline, Divider } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

function App() {
  useEffect(() => {
    AOS.init({
      once: true,
      startEvent: 'DOMContentLoaded',
      delay: 100,
    });
  }, []);

  return (
    <BrowserRouter>
      <ConfigProvider>
        <GlobalContextProvider>
          <ColorModeContextProvider>
            <CssBaseline />
            <Header />
            <Divider style={{ margin: '0' }} />
            <Navbar />
            <Divider style={{ margin: '0' }} />
            <Routes />
            <Footer />
            <Donations />
          </ColorModeContextProvider>
        </GlobalContextProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
