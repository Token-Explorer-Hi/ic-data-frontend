import Typography from '@/components/Typography';
import { TokenHolders } from '@/components/token/index';
import MainCard from '@/components/ui-component/cards/MainCard';
import { useToken } from '@/hooks';
import { useRouter } from '@/hooks/useCustomRouter';
import { Breadcrumbs, Grid, Link } from '@mui/material';

function TokenHolderChart() {
  const router = useRouter();
  const id = router.query.id as string;
  const { result: tokenDetail } = useToken(id);

  return (
    <Grid
      className="wrap"
      display="flex"
      flexDirection="column"
      style={{
        gap: 'var(--space-20)',
        padding: 'var(--space-14)',
        flex: 1,
      }}
    >
      <Grid
        container
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: { xs: 'var(--space-12)', md: 0 },
        }}
      >
        <Grid item xs={12} md={'auto'}>
          <Typography variant="h2">
            {tokenDetail?.symbol || ''} Token Holders
          </Typography>
        </Grid>
        <Grid
          display={'flex'}
          item
          xs={12}
          md={'auto'}
          sx={{ marginLeft: { md: 'auto' } }}
        >
          <Breadcrumbs sx={{ marginLeft: { xs: '0', md: 'auto' } }}>
            <Link underline="hover" color="var(--color-primary)" href="/">
              Home
            </Link>
            <Link
              underline="hover"
              color="var(--color-primary)"
              href={`/token/details/${id}`}
            >
              {tokenDetail?.symbol || ''}
            </Link>
            <Typography sx={{ color: 'text.primary' }}>
              Token Holders Chart
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <MainCard
        className="wrap"
        style={{
          gap: 'var(--space-20)',
          flex: 1,
        }}
      >
        <TokenHolders
          showTokenHoldersChart={false}
          id={id}
          initPageSize={100}
          showChart={true}
          tokenDetail={tokenDetail}
        />
      </MainCard>
    </Grid>
  );
}
export default TokenHolderChart;
