import { AllTokens, LatestTransactions, Search } from '@/components/home';
import GlobalData from '@/components/home/GlobalData';
import { Grid } from '@mui/material';

export default function Home() {
  return (
    <Grid
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Search />
      <Grid
        display="flex"
        flexDirection="column"
        className="home-bottom wrap"
        gap="var(--space-14)"
        sx={{
          padding: '0 var(--space-14) var(--space-14)',
        }}
      >
        <Grid
          display="flex"
          alignItems="flex-start"
          width="100%"
          className="global-data"
          gap="var(--space-20)"
          sx={{
            marginTop: 'var(---space-40)',
          }}
        >
          <GlobalData />
        </Grid>
        <Grid
          display="flex"
          alignItems="flex-start"
          sx={{
            width: '100%',
            height: '100%',
            gap: 'var(--space-20)',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
          }}
        >
          <AllTokens key="all-tokens" />
          <LatestTransactions key="latest-transactions" />
        </Grid>
      </Grid>
    </Grid>
  );
}
