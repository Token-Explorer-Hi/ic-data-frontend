import { Link, TokenSource } from '@/components/index';
import MainCard from '@/components/ui-component/cards/MainCard';
import { useRouter } from '@/hooks/useCustomRouter';
import { BigNumber, NA } from '@/utils';
import { formatDuration } from '@/utils/formatDuration';
import { Grid, Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { format, formatDistanceToNow, fromUnixTime } from 'date-fns';
import { useEffect, useState } from 'react';

export default function NeuronDetails() {
  const router = useRouter();
  const id = router.query.id;
  const neuronsId = router.query.neuronsId;
  const [neurons, setNeurons] = useState<any>(null);
  useEffect(() => {
    if (!id || !neuronsId) return;
    async function fetchNeuronInfo() {
      const result = await fetch(
        `https://sns-api.internetcomputer.org/api/v1/snses/${id}/neurons/${neuronsId}`,
      );
      const neurons = await result.json();
      setNeurons(neurons);
    }
    fetchNeuronInfo();
  }, [id, neuronsId]);
  const symbol = '';
  return (
    <Grid
      className="wrap"
      display="flex"
      flexDirection="column"
      style={{
        padding: 'var(--space-14)',
        flex: 1,
      }}
      sx={{
        gap: {
          xs: 'var(--space-12)',
          sm: 'var(--space-24)',
        },
      }}
    >
      <Grid
        container
        display="flex"
        flexDirection={'column'}
        gap={'var(--space-24)'}
      >
        <Grid>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              Home
            </Link>
            <Link color="inherit" href="/sns">
              SNSs
            </Link>
            <Link color="inherit" href={`/sns/${id}`}>
              {id}
            </Link>
            <Typography sx={{ color: 'text.primary' }}>{neuronsId}</Typography>
          </Breadcrumbs>
        </Grid>
        <MainCard>
          <Grid container>
            <Grid
              item
              xs={6}
              md={3}
              display="flex"
              flexDirection={'column'}
              padding={{ xs: 'var(--space-8)', md: 'var(--space-24)' }}
              gap={{ xs: 'var(--space-4)', md: 'var(--space-8)' }}
            >
              <Typography component="span" whiteSpace={'nowrap'}>
                State
              </Typography>
              <TokenSource
                borderRadius="100px"
                padding="var(--space-8)"
                className={neurons?.state}
                source={neurons?.state}
              />
            </Grid>
            <Grid
              item
              xs={6}
              md={3}
              display="flex"
              flexDirection={'column'}
              padding={{ xs: 'var(--space-8)', md: 'var(--space-24)' }}
              gap={{ xs: 'var(--space-4)', md: 'var(--space-8)' }}
            >
              <Typography component="span" whiteSpace={'nowrap'}>
                Staked {symbol}
              </Typography>
              <Typography
                component="p"
                fontSize="var(--space-16)"
                lineHeight="1.25"
              >
                {new BigNumber(neurons?.stake_e8s).dividedBy(1e8).toString()}
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              md={3}
              display="flex"
              flexDirection={'column'}
              padding={{ xs: 'var(--space-8)', md: 'var(--space-24)' }}
              gap={{ xs: 'var(--space-4)', md: 'var(--space-8)' }}
            >
              <Typography component="span" whiteSpace={'nowrap'}>
                Total Maturity{' '}
              </Typography>
              <Typography
                component="p"
                fontSize="var(--space-16)"
                lineHeight="1.25"
              >
                {neurons?.nervous_system_parameters
                  ?.initial_voting_period_seconds
                  ? formatDuration(
                      neurons?.nervous_system_parameters
                        ?.initial_voting_period_seconds,
                    )
                  : NA}
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              md={3}
              display="flex"
              flexDirection={'column'}
              padding={{ xs: 'var(--space-8)', md: 'var(--space-24)' }}
              gap={{ xs: 'var(--space-4)', md: 'var(--space-8)' }}
            >
              <Typography component="span" whiteSpace={'nowrap'}>
                Staked Maturity
              </Typography>
              <Typography
                component="p"
                fontSize="var(--space-16)"
                lineHeight="1.25"
              >
                2 days
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              md={3}
              display="flex"
              flexDirection={'column'}
              padding={{ xs: 'var(--space-8)', md: 'var(--space-24)' }}
              gap={{ xs: 'var(--space-4)', md: 'var(--space-8)' }}
            >
              <Typography component="span" whiteSpace={'nowrap'}>
                Dissolve Delay
              </Typography>
              <Typography
                component="p"
                fontSize="var(--space-16)"
                lineHeight="1.25"
              >
                {neurons?.nervous_system_parameters
                  ?.neuron_minimum_dissolve_delay_to_vote_seconds
                  ? formatDuration(
                      neurons?.nervous_system_parameters
                        ?.neuron_minimum_dissolve_delay_to_vote_seconds,
                    )
                  : NA}
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              md={3}
              display="flex"
              flexDirection={'column'}
              padding={{ xs: 'var(--space-8)', md: 'var(--space-24)' }}
              gap={{ xs: 'var(--space-4)', md: 'var(--space-8)' }}
            >
              <Typography component="span" whiteSpace={'nowrap'}>
                Dissolve Date
              </Typography>
              <Typography
                component="p"
                fontSize="var(--space-16)"
                lineHeight="1.25"
              >
                {neurons?.nervous_system_parameters?.max_dissolve_delay_seconds
                  ? formatDuration(
                      neurons?.nervous_system_parameters
                        ?.max_dissolve_delay_seconds,
                    )
                  : NA}
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              md={3}
              display="flex"
              flexDirection={'column'}
              padding={{ xs: 'var(--space-8)', md: 'var(--space-24)' }}
              gap={{ xs: 'var(--space-4)', md: 'var(--space-8)' }}
            >
              <Typography component="span" whiteSpace={'nowrap'}>
                Age
              </Typography>
              <Typography
                component="p"
                fontSize="var(--space-16)"
                lineHeight="1.25"
              >
                {formatDistanceToNow(
                  fromUnixTime(
                    new BigNumber(neurons?.current_age_seconds ?? 0)
                      .dividedBy(1e9)
                      .toNumber(),
                  ),
                  { addSuffix: true },
                )}
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              md={3}
              display="flex"
              flexDirection={'column'}
              padding={{ xs: 'var(--space-8)', md: 'var(--space-24)' }}
              gap={{ xs: 'var(--space-4)', md: 'var(--space-8)' }}
            >
              <Typography component="span" whiteSpace={'nowrap'}>
                Date Created
              </Typography>
              <Typography
                component="p"
                fontSize="var(--space-16)"
                lineHeight="1.25"
              >
                {format(
                  fromUnixTime(Number(neurons?.created_timestamp_seconds ?? 0)),
                  'yyyy-MM-dd, HH:mm:ss',
                )}
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              md={3}
              display="flex"
              flexDirection={'column'}
              padding={{ xs: 'var(--space-8)', md: 'var(--space-24)' }}
              gap={{ xs: 'var(--space-4)', md: 'var(--space-8)' }}
            >
              <Typography component="span" whiteSpace={'nowrap'}>
                Dissolve Delay Bonus
              </Typography>
              <Typography
                component="p"
                fontSize="var(--space-16)"
                lineHeight="1.25"
              >
                {neurons?.nervous_system_parameters?.max_age_bonus_percentage} %
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              md={3}
              display="flex"
              flexDirection={'column'}
              padding={{ xs: 'var(--space-8)', md: 'var(--space-24)' }}
              gap={{ xs: 'var(--space-4)', md: 'var(--space-8)' }}
            >
              <Typography component="span" whiteSpace={'nowrap'}>
                Age Bonus
              </Typography>
              <Typography
                component="p"
                fontSize="var(--space-16)"
                lineHeight="1.25"
              >
                {formatDuration(
                  neurons?.nervous_system_parameters?.voting_rewards_parameters
                    ?.reward_rate_transition_duration_seconds,
                )}
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              md={3}
              display="flex"
              flexDirection={'column'}
              padding={{ xs: 'var(--space-8)', md: 'var(--space-24)' }}
              gap={{ xs: 'var(--space-4)', md: 'var(--space-8)' }}
            >
              <Typography component="span" whiteSpace={'nowrap'}>
                Total Bonus
              </Typography>
              <Typography
                component="p"
                fontSize="var(--space-16)"
                lineHeight="1.25"
              >
                {formatDuration(
                  neurons?.nervous_system_parameters?.voting_rewards_parameters,
                )}
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              md={3}
              display="flex"
              flexDirection={'column'}
              padding={{ xs: 'var(--space-8)', md: 'var(--space-24)' }}
              gap={{ xs: 'var(--space-4)', md: 'var(--space-8)' }}
            >
              <Typography component="span" whiteSpace={'nowrap'}>
                Voting Power
              </Typography>
              <Typography
                component="p"
                fontSize="var(--space-16)"
                lineHeight="1.25"
              >
                {new BigNumber(neurons?.voting_power).div(10 ** 9).toFormat(0)}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={6}
            md={3}
            display="flex"
            flexDirection={'column'}
            padding={{ xs: 'var(--space-8)', md: 'var(--space-24)' }}
            gap={{ xs: 'var(--space-4)', md: 'var(--space-8)' }}
          >
            <Typography component="span" whiteSpace={'nowrap'}>
              Auto-Stake Maturity
            </Typography>
            <Typography
              component="p"
              fontSize="var(--space-16)"
              lineHeight="1.25"
            >
              {neurons?.auto_stake_maturity || NA}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            md={3}
            display="flex"
            flexDirection={'column'}
            padding={{ xs: 'var(--space-8)', md: 'var(--space-24)' }}
            gap={{ xs: 'var(--space-4)', md: 'var(--space-8)' }}
          >
            <Typography component="span" whiteSpace={'nowrap'}>
              Vesting Period
            </Typography>
            <Typography
              component="p"
              fontSize="var(--space-16)"
              lineHeight="1.25"
            >
              {formatDuration(neurons?.vesting_period_seconds)}
            </Typography>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
}
