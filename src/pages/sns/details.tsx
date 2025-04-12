import {
  Link,
  TableWrapper,
  TokenSource,
  TransactionsAddressLink,
} from '@/components/index';
import NoData from '@/components/NoData';
import MainCard from '@/components/ui-component/cards/MainCard';
import { useRouter } from '@/hooks/useCustomRouter';
import { BigNumber, NA } from '@/utils';
import { formatDuration } from '@/utils/formatDuration';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { format, formatDistanceToNow, fromUnixTime } from 'date-fns';
import { useEffect, useState } from 'react';

interface SNSCanisterInfoDetail {
  canister_id: string;
  status: string;
  controllers: string[];
  memory_size: string;
  freezing_threshold: string;
  module_hash: string;
  root_canister_id: string;
  canister_type: string;
  cycles: string;
  idle_cycles_burned_per_day: string;
}
export interface SNSCanisterTransactionDetail {
  index: number;
  ledger_canister_id: string;
  kind: string;
  amount: string;
  from_owner: string;
  from_subaccount: string;
  from_account: string;
  to_owner: string;
  to_subaccount: string;
  to_account: string;
  spender_owner: string;
  spender_subaccount: string;
  spender_account: string;
  memo: string;
  fee: string;
  expected_allowance: any;
  expires_at: any;
  created_at_time: any;
  timestamp: string;
  fee_collector_block: any;
  updated_at: string;
}
export interface SNSCanisterProposalsDetail {
  root_canister_id: string;
  id: string;
  action: string;
  decided_timestamp_seconds: number;
  executed_timestamp_seconds: number;
  failed_timestamp_seconds: number;
  reward_event_end_timestamp_seconds: null;
  initial_voting_period_seconds: number;
  is_eligible_for_rewards: boolean;
  latest_tally: {
    no: number;
    yes: number;
    total: number;
    timestamp_seconds: number;
  };
  proposal_action_payload: {
    reject_cost_e8s: any;
    default_followees: any;
    transaction_fee_e8s: any;
    max_number_of_neurons: any;
    max_age_bonus_percentage: any;
    neuron_minimum_stake_e8s: any;
    voting_rewards_parameters: any;
    max_dissolve_delay_seconds: any;
    max_followees_per_function: any;
    neuron_claimer_permissions: any;
    maturity_modulation_disabled: any;
    max_neuron_age_for_age_bonus: any;
    neuron_grantable_permissions: any;
    initial_voting_period_seconds: any;
    max_proposals_to_keep_per_action: any;
    max_dissolve_delay_bonus_percentage: any;
    max_number_of_principals_per_neuron: any;
    automatically_advance_target_version: boolean;
    max_number_of_proposals_with_ballots: any;
    wait_for_quiet_deadline_increase_seconds: any;
    neuron_minimum_dissolve_delay_to_vote_seconds: any;
  };
  proposal_action_type: string;
  proposal_title: string;
  proposal_url: string;
  proposal_creation_timestamp_seconds: number;
  proposer: string;
  reject_cost_e8s: number;
  failure_reason: any;
  payload_text_rendering: string;
  summary: string;
  reward_event_round: number;
  wait_for_quiet_deadline_increase_seconds: number;
  wait_for_quiet_state_current_deadline_timestamp_seconds: number;
  status: string;
  reward_status: string;
  nervous_system_function: {
    id: string;
    name: string;
    description: string;
    function_type: {
      NativeNervousSystemFunction: any;
    };
  };
  votes: string;
  minimum_yes_proportion_of_exercised: {
    basis_points: number;
  };
  minimum_yes_proportion_of_total: {
    basis_points: number;
  };
}
export interface SNSCanisterNeuronsDetail {
  root_canister_id: string;
  cached_neuron_stake_e8s: number;
  staked_maturity_e8s_equivalent: any;
  current_age_seconds: number;
  neuron_fees_e8s: number;
  auto_stake_maturity: any;
  current_dissolve_delay_seconds: number;
  created_timestamp_seconds: number;
  vesting_period_seconds: any;
  stake_e8s: number;
  aging_since_timestamp_seconds: number;
  dissolve_state: {
    DissolveDelaySeconds: number;
  };
  voting_power: number;
  followees: any;
  created_at: string;
  total_maturity_e8s_equivalent: number;
  maturity_e8s_equivalent: number;
  updated_at: string;
  permissions: [
    {
      principal: string;
      permission_type: number[];
    },
  ];
  id: string;
  voting_power_percentage_multiplier: number;
  state: string;
  source_nns_neuron_id: any;
}
const status: { [key: string]: string } = {
  LIFECYCLE_ADOPTED: 'SNS Swap Pending',
  LIFECYCLE_COMMITTED: 'SNS Launched',
};
function calculateMonthlyCyclesConsumption(idleCyclesBurnedPerDay: string) {
  // Create BigNumber instance
  const dailyCycles = new BigNumber(idleCyclesBurnedPerDay);

  // Calculate yearly cycles consumption
  const yearlyCycles = dailyCycles.multipliedBy(365);

  // Calculate monthly average
  const monthlyCycles = yearlyCycles.dividedBy(12);

  return monthlyCycles.dividedBy(1e12).multipliedBy(0.9863).toFormat(4);
}
const CanistersItem = ({ record }: { record: SNSCanisterInfoDetail }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow key={record.canister_id}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <a
            href={`https://dashboard.internetcomputer.org/canister/${record.canister_id}`}
            target="_blank"
          >
            <Typography sx={{ color: 'var(--color-primary)' }}>
              {record.canister_id}
            </Typography>
          </a>
        </TableCell>
        <TableCell>
          <Grid
            display="flex"
            flexDirection="column"
            sx={{ gap: 'var(--space-4)' }}
          >
            <TokenSource
              capitalize="capitalize"
              source={record.canister_type}
            />
          </Grid>
        </TableCell>
        <TableCell>
          <Typography>
            {new BigNumber(record.cycles).div(1e12).toFormat(4)} T
          </Typography>
        </TableCell>
        <TableCell>
          <Typography>
            {calculateMonthlyCyclesConsumption(
              record.idle_cycles_burned_per_day,
            )}
            T
          </Typography>
        </TableCell>
        <TableCell>
          <Typography>
            {new BigNumber(record.idle_cycles_burned_per_day).toFormat()}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography>
            {new BigNumber(record.memory_size)
              .dividedBy(1024 * 1024)
              .toFormat(2)}{' '}
            MiB
          </Typography>
        </TableCell>
        <TableCell>
          <Typography>
            <TokenSource capitalize="capitalize" source={record.status} />
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid sx={{ display: 'flex', gap: 'var(--space-20)', padding: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-8)',
                }}
              >
                <Typography variant="h6" gutterBottom component="div">
                  Freezing Threshold Time
                </Typography>
                <Typography>
                  {formatDuration(Number(record.freezing_threshold))}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-8)',
                }}
              >
                <Typography variant="h6" gutterBottom component="div">
                  Controllers
                </Typography>
                <Grid>
                  {record?.controllers?.map((controller: string) => (
                    <a
                      key={controller}
                      href={`https://dashboard.internetcomputer.org/canister/${controller}`}
                      target="_blank"
                    >
                      <Typography sx={{ color: 'var(--color-primary)' }}>
                        {controller}
                      </Typography>
                    </a>
                  ))}
                </Grid>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-8)',
                }}
              >
                <Typography variant="h6" gutterBottom component="div">
                  Module Hash
                </Typography>
                <Typography>{record.module_hash}</Typography>
              </Box>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
const ProposalsItem = ({
  record,
  decimals,
}: {
  record: SNSCanisterProposalsDetail;
  decimals: number;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow key={record.id}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Typography>{record.id}</Typography>
        </TableCell>
        <TableCell>
          <Grid>
            <Typography>{record.proposal_title}</Typography>
          </Grid>
        </TableCell>
        <TableCell>
          <Typography>{record.nervous_system_function.name}</Typography>
        </TableCell>
        <TableCell>
          <TokenSource capitalize="capitalize" source={record.status} />
        </TableCell>
        <TableCell>
          <Typography>
            {new BigNumber(record.votes).div(10 ** decimals).toFormat(0)}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid sx={{ display: 'flex', gap: 'var(--space-20)', padding: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-8)',
                }}
              >
                <Typography variant="h6" gutterBottom component="div">
                  Date Created
                </Typography>
                <Typography>
                  {format(
                    fromUnixTime(
                      Number(record.proposal_creation_timestamp_seconds ?? 0),
                    ),
                    'yyyy-MM-dd, HH:mm:ss',
                  )}
                  ,{' '}
                  {formatDistanceToNow(
                    fromUnixTime(
                      Number(record.proposal_creation_timestamp_seconds ?? 0),
                    ),
                    { addSuffix: true },
                  )}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-8)',
                }}
              >
                <Typography variant="h6" gutterBottom component="div">
                  Proposer
                </Typography>
                <Grid>
                  <Typography>{record.proposer}</Typography>
                </Grid>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-8)',
                }}
              >
                <Typography variant="h6" gutterBottom component="div">
                  Yes
                </Typography>
                <Typography>
                  {new BigNumber(record.latest_tally.yes)
                    .dividedBy(10 ** decimals)
                    .toFormat(0)}{' '}
                  Votes
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-8)',
                }}
              >
                <Typography variant="h6" gutterBottom component="div">
                  No
                </Typography>
                <Typography>
                  {new BigNumber(record.latest_tally.no)
                    .dividedBy(10 ** decimals)
                    .toFormat(0)}{' '}
                  Votes
                </Typography>
              </Box>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
const NeuronsItem = ({
  record,
  decimals,
  symbol,
}: {
  record: SNSCanisterNeuronsDetail;
  decimals: number;
  symbol: string;
}) => {
  const router = useRouter();
  const id = router.query.id;
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow key={record.id}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Link to={`/sns/${id}/neurons/${record.id}`}>
            <Typography sx={{ color: 'var(--color-primary)' }}>
              {record.id}
            </Typography>
          </Link>
        </TableCell>
        <TableCell>
          <TokenSource capitalize="capitalize" source={record.state} />
        </TableCell>
        <TableCell>
          <Typography>
            {new BigNumber(record.stake_e8s)
              .dividedBy(10 ** decimals)
              .toFormat(0)}{' '}
            {symbol}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography>{record.maturity_e8s_equivalent}</Typography>
        </TableCell>
        <TableCell>
          <Typography>
            {formatDuration(record.current_dissolve_delay_seconds)}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography>{formatDuration(record.current_age_seconds)}</Typography>
        </TableCell>
        <TableCell>
          <Typography>
            {new BigNumber(record.voting_power).div(10 ** decimals).toFormat(0)}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid sx={{ display: 'flex', gap: 'var(--space-20)', padding: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-8)',
                }}
              >
                <Typography variant="h6" gutterBottom component="div">
                  Date Created
                </Typography>
                <Typography>
                  {format(
                    fromUnixTime(Number(record.created_timestamp_seconds ?? 0)),
                    'yyyy-MM-dd, HH:mm:ss',
                  )}
                  ,{' '}
                  {formatDistanceToNow(
                    fromUnixTime(Number(record.created_timestamp_seconds ?? 0)),
                    { addSuffix: true },
                  )}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-8)',
                }}
              >
                <Typography variant="h6" gutterBottom component="div">
                  Auto-Stake Maturity
                </Typography>
                <Grid>
                  <Typography textTransform={'capitalize'}>
                    {String(Boolean(record.auto_stake_maturity))}
                  </Typography>
                </Grid>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-8)',
                }}
              >
                <Typography variant="h6" gutterBottom component="div">
                  Dissolve Delay Bonus
                </Typography>
                {/* <Typography>{record.dissolve_delay_bonus}</Typography> */}
              </Box>
              {/* <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-8)',
                }}
              >
                <Typography variant="h6" gutterBottom component="div">
                  Age Bonus
                </Typography>
                <Typography>Votes</Typography>
              </Box> */}
              {/* <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-8)',
                }}
              >
                <Typography variant="h6" gutterBottom component="div">
                  Total Bonus
                </Typography>
                <Typography>Votes</Typography>
              </Box> */}
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
export default function SNSDetails() {
  const [loadings, setLoadings] = useState<any>({
    info: true,
    canisters: true,
    proposals: true,
    transactions: true,
    neurons: true,
    totalSupply: true,
    icpTreasury: true,
    accountData: true,
  });
  const theme = useTheme() as Theme;
  const router = useRouter();
  const [canisters, setCanisters] = useState<any>(null);
  const [canisterInfo, setCanisterInfo] = useState<any>([]);
  const [proposals, setProposals] = useState<any>(null);
  const [transactions, setTransactions] = useState<any>(null);
  const [neurons, setNeurons] = useState<any>(null);
  const [totalSupplyDatas, setTotalSupplyDatas] = useState<any>([]);
  const [icpTreasuryData, setIcpTreasuryData] = useState<any>(null);
  const [accountData, setAccountData] = useState<any>(null);
  const id = router.query.id as string;
  const color =
    theme.palette.mode === 'dark' ? theme.colors.grey400 : theme.colors.grey600;
  const bgColor =
    theme.palette.mode === 'dark' ? theme.colors.grey800 : 'white';
  useEffect(() => {
    if (!id) return;

    async function fetchCanisterInfo() {
      // SNS canisters
      const result = await fetch(
        `https://sns-api.internetcomputer.org/api/v1/snses/${id}`,
      );
      const canisters = await result.json();
      console.log(canisters?.canisters, '-canisters?.canisters');
      setCanisters(canisters);
      setLoadings((prev: any) => ({ ...prev, info: false }));

      const neuronsResult = await fetch(
        `https://sns-api.internetcomputer.org/api/v1/snses/${id}/neurons?limit=6`,
      );
      const neurons = await neuronsResult.json();
      setNeurons(neurons);
      setLoadings((prev: any) => ({ ...prev, neurons: false }));

      const proposalsResult = await fetch(
        `https://sns-api.internetcomputer.org/api/v1/snses/${id}/proposals?limit=6`,
      );
      const proposals = await proposalsResult.json();
      setProposals(proposals);

      if (canisters.ledger_canister_id) {
        setLoadings((prev: any) => ({ ...prev, proposals: false }));
        const transactionsResult = await fetch(
          `https://icrc-api.internetcomputer.org/api/v1/ledgers/${canisters.ledger_canister_id}/transactions?limit=6`,
        );
        const transactions = await transactionsResult.json();
        setTransactions(transactions);
        setLoadings((prev: any) => ({ ...prev, transactions: false }));
      }
      try {
        setLoadings((prev: any) => ({ ...prev, totalSupply: true }));
        const totalSupplyResult = await fetch(
          `https://icrc-api.internetcomputer.org/api/v1/ledgers/${
            canisters.ledger_canister_id
          }/total-supply?start=${
            Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60
          }&step=600`,
        );
        const totalSupply = await totalSupplyResult.json();
        setTotalSupplyDatas(totalSupply);
        setLoadings((prev: any) => ({ ...prev, totalSupply: false }));
      } catch (error) {
        console.error('Error fetching total supply data:', error);
        setLoadings((prev: any) => ({ ...prev, totalSupply: false }));
      }
      try {
        setLoadings((prev: any) => ({ ...prev, icpTreasury: true }));
        const icpTreasuryResult = await fetch(
          `https://ledger-api.internetcomputer.org/accounts/${canisters.icp_treasury_account}`,
        );
        const icpTreasury = await icpTreasuryResult.json();
        setIcpTreasuryData(icpTreasury);
        setLoadings((prev: any) => ({ ...prev, icpTreasury: false }));
      } catch (error) {
        console.error('Error fetching ICP Treasury data:', error);
        setLoadings((prev: any) => ({ ...prev, icpTreasury: false }));
      }
      try {
        setLoadings((prev: any) => ({ ...prev, accountData: true }));
        const accountResult = await fetch(
          `https://icrc-api.internetcomputer.org/api/v1/ledgers/${canisters.ledger_canister_id}/accounts/${canisters.sns_treasury_account}`,
        );
        const account = await accountResult.json();
        setAccountData(account);
        setLoadings((prev: any) => ({ ...prev, accountData: false }));
      } catch (error) {
        console.error('Error fetching account data:', error);
        setLoadings((prev: any) => ({ ...prev, accountData: false }));
      }
    }

    fetchCanisterInfo();
  }, [id]);

  const symbol = canisters?.icrc1_metadata?.icrc1_symbol;
  const name = canisters?.name;
  const decimals = canisters?.icrc1_metadata?.icrc1_decimals;
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
      <Grid container>
        <Grid
          display={'flex'}
          flexDirection={'column'}
          gap={{ xs: 'var(--space-12)', md: 'var(--space-24)' }}
        >
          <Grid
            display={'flex'}
            flexDirection={'column'}
            gap={{ xs: 'var(--space-12)', md: 'var(--space-24)' }}
          >
            <img
              style={{ width: 'var(--space-48)', height: 'var(--space-48)' }}
              src={canisters?.logo}
              alt={canisters?.name}
            />
            <Typography variant="h2">{canisters?.name}</Typography>
            <a href={canisters?.url} target="_blank">
              {canisters?.url}
            </a>
            <Typography lineHeight={1.4} fontSize="var(--space-14)">
              {canisters?.description}
            </Typography>
          </Grid>
          <Grid display={'flex'} gap={'var(--space-16)'}>
            <Button
              sx={{ whiteSpace: 'nowrap' }}
              variant="contained"
              onClick={() => router.push(`/sns/${id}/transactions`)}
            >
              Transactions
            </Button>
            <Button
              sx={{ whiteSpace: 'nowrap' }}
              variant="contained"
              onClick={() => router.push(`/sns/${id}/proposals`)}
            >
              Proposals
            </Button>
            <Button
              sx={{ whiteSpace: 'nowrap' }}
              variant="contained"
              onClick={() => router.push(`/sns/${id}/neurons`)}
            >
              Neurons
            </Button>
          </Grid>
        </Grid>
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
              Status
            </Typography>
            <TokenSource
              borderRadius="100px"
              padding="var(--space-8)"
              className={canisters?.swap_lifecycle?.lifecycle}
              source={status[canisters?.swap_lifecycle?.lifecycle]}
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
              Token Name
            </Typography>
            <Typography
              component="p"
              fontSize="var(--space-16)"
              lineHeight="1.25"
            >
              {canisters?.name}
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
              Token Symbol
            </Typography>
            <Typography
              component="p"
              fontSize="var(--space-16)"
              lineHeight="1.25"
            >
              {symbol}
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
              Transaction Fee
            </Typography>
            <Typography
              component="p"
              fontSize="var(--space-16)"
              lineHeight="1.25"
            >
              {new BigNumber(canisters?.icrc1_metadata?.icrc1_fee)
                .div(new BigNumber(10).pow(new BigNumber(decimals)))
                .toFormat()}{' '}
              {symbol}
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
              Initial Voting Period
            </Typography>
            <Typography
              component="p"
              fontSize="var(--space-16)"
              lineHeight="1.25"
            >
              {canisters?.nervous_system_parameters
                ?.initial_voting_period_seconds
                ? formatDuration(
                    canisters?.nervous_system_parameters
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
              Max Voting Period Extension
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
              Reject Cost
            </Typography>
            <Typography
              component="p"
              fontSize="var(--space-16)"
              lineHeight="1.25"
            >
              {new BigNumber(
                canisters?.nervous_system_parameters?.reject_cost_e8s,
              )
                .div(new BigNumber(10).pow(decimals))
                .toFormat()}{' '}
              {symbol}
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
              Min Neuron Stake
            </Typography>
            <Typography
              component="p"
              fontSize="var(--space-16)"
              lineHeight="1.25"
            >
              {new BigNumber(
                canisters?.nervous_system_parameters?.neuron_minimum_stake_e8s,
              )
                .div(new BigNumber(10).pow(decimals))
                .toFormat()}{' '}
              {symbol}
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
              Min Dissolve Delay to Vote
            </Typography>
            <Typography
              component="p"
              fontSize="var(--space-16)"
              lineHeight="1.25"
            >
              {canisters?.nervous_system_parameters
                ?.neuron_minimum_dissolve_delay_to_vote_seconds
                ? formatDuration(
                    canisters?.nervous_system_parameters
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
              Max Dissolve Delay
            </Typography>
            <Typography
              component="p"
              fontSize="var(--space-16)"
              lineHeight="1.25"
            >
              {canisters?.nervous_system_parameters?.max_dissolve_delay_seconds
                ? formatDuration(
                    canisters?.nervous_system_parameters
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
              Max Dissolve Delay Bonus
            </Typography>
            <Typography
              component="p"
              fontSize="var(--space-16)"
              lineHeight="1.25"
            >
              {
                canisters?.nervous_system_parameters
                  ?.max_dissolve_delay_bonus_percentage
              }{' '}
              %
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
              Max Age for Age Bonus
            </Typography>
            <Typography
              component="p"
              fontSize="var(--space-16)"
              lineHeight="1.25"
            >
              {canisters?.nervous_system_parameters
                ?.max_neuron_age_for_age_bonus
                ? formatDuration(
                    canisters?.nervous_system_parameters
                      ?.max_neuron_age_for_age_bonus,
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
              Max Age Bonus
            </Typography>
            <Typography
              component="p"
              fontSize="var(--space-16)"
              lineHeight="1.25"
            >
              {canisters?.nervous_system_parameters?.max_age_bonus_percentage} %
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
              Reward Rate
            </Typography>
            <Typography
              component="p"
              fontSize="var(--space-16)"
              lineHeight="1.25"
            >
              {new BigNumber(
                canisters?.nervous_system_parameters?.voting_rewards_parameters
                  ?.initial_reward_rate_basis_points,
              )
                .div(100)
                .toFormat(1)}
              % to{' '}
              {new BigNumber(
                canisters?.nervous_system_parameters?.voting_rewards_parameters
                  ?.final_reward_rate_basis_points,
              )
                .div(100)
                .toFormat(1)}
              % to{' '}
              {formatDuration(
                canisters?.nervous_system_parameters?.voting_rewards_parameters
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
              ICP Treasury
            </Typography>
            <Typography
              component="p"
              fontSize="var(--space-16)"
              lineHeight="1.25"
            >
              {new BigNumber(icpTreasuryData?.balance)
                .dividedBy(1e8)
                .toFormat(0)}{' '}
              ICP
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
              {symbol} Treasury
            </Typography>
            <Typography
              component="p"
              fontSize="var(--space-16)"
              lineHeight="1.25"
            >
              {accountData?.balance
                ? new BigNumber(accountData?.balance)
                    .dividedBy(10 ** Number(decimals))
                    .toFormat(0)
                : '0'}{' '}
              {symbol}
            </Typography>
          </Grid>
        </Grid>
      </MainCard>
      <MainCard title={`${name} Canisters`}>
        <TableWrapper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>
                    <Typography
                      whiteSpace={'nowrap'}
                      sx={{
                        color,
                      }}
                    >
                      ID
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace={'nowrap'}
                      sx={{
                        color,
                      }}
                    >
                      Type
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace={'nowrap'}
                      sx={{
                        color,
                      }}
                    >
                      Cycles Balance
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace={'nowrap'}
                      sx={{
                        color,
                      }}
                    >
                      Freezing Threshold Cycles
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace={'nowrap'}
                      sx={{
                        color,
                      }}
                    >
                      Idle Cycles Burned Per Day
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace={'nowrap'}
                      sx={{
                        color,
                      }}
                    >
                      Memory Size
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace={'nowrap'}
                      sx={{
                        color,
                      }}
                    >
                      Status
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {canisters?.canisters?.map(
                  (record: SNSCanisterInfoDetail, index: number) => (
                    <CanistersItem key={index} record={record} />
                  ),
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TableWrapper>
        {loadings.info ? (
          <Box
            sx={{
              minHeight: '600px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) : canisters?.canisters?.length <= 0 ? (
          <NoData />
        ) : null}
      </MainCard>
      <MainCard title={`${name} Transactions`}>
        <TableWrapper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography
                      whiteSpace={'nowrap'}
                      sx={{
                        color,
                      }}
                    >
                      Index
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace={'nowrap'}
                      sx={{
                        color,
                      }}
                    >
                      Amount
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace={'nowrap'}
                      sx={{
                        color,
                      }}
                    >
                      Type
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace={'nowrap'}
                      sx={{
                        color,
                      }}
                    >
                      Timestamp
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace={'nowrap'}
                      sx={{
                        color,
                      }}
                    >
                      From
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace={'nowrap'}
                      sx={{
                        color,
                      }}
                    >
                      To
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions?.data?.map(
                  (record: SNSCanisterTransactionDetail, index: number) => (
                    <TableRow key={record.index}>
                      <TableCell>
                        <Typography>{record.index}</Typography>
                      </TableCell>
                      <TableCell>
                        <Grid>
                          <Typography>
                            {new BigNumber(record.amount)
                              .dividedBy(10 ** Number(decimals))
                              .toFormat(4)}{' '}
                            {canisters?.icrc1_metadata?.icrc1_symbol}
                          </Typography>
                        </Grid>
                      </TableCell>
                      <TableCell>
                        <TokenSource
                          capitalize="capitalize"
                          source={record.kind}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {record.timestamp ? (
                            <>
                              {format(
                                fromUnixTime(
                                  Number(record.timestamp ?? 0) / 1e9,
                                ),
                                'yyyy-MM-dd, HH:mm:ss',
                              )}
                              ,{' '}
                              {formatDistanceToNow(
                                fromUnixTime(
                                  Number(record.timestamp ?? 0) / 1e9,
                                ),
                                { addSuffix: true },
                              )}
                            </>
                          ) : (
                            '-'
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          <TransactionsAddressLink owner={record.from_owner} />
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          <TransactionsAddressLink owner={record.to_owner} />
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TableWrapper>
        {loadings.transactions ? (
          <Box
            sx={{
              minHeight: '600px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) : transactions && transactions?.data.length <= 0 ? (
          <NoData />
        ) : null}
      </MainCard>
      <MainCard title={`${name} Proposals`}>
        <TableWrapper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>
                    <Typography
                      whiteSpace={'nowrap'}
                      sx={{
                        color,
                      }}
                    >
                      ID
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace={'nowrap'}
                      sx={{
                        color,
                      }}
                    >
                      Title
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace={'nowrap'}
                      sx={{
                        color,
                      }}
                    >
                      Type
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace={'nowrap'}
                      sx={{
                        color,
                      }}
                    >
                      Status
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace={'nowrap'}
                      sx={{
                        color,
                      }}
                    >
                      Votes
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {proposals?.data?.map(
                  (record: SNSCanisterProposalsDetail, index: number) => (
                    <ProposalsItem
                      key={index}
                      decimals={decimals}
                      record={record}
                    />
                  ),
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TableWrapper>
        {loadings.proposals ? (
          <Box
            sx={{
              minHeight: '600px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) : proposals?.data.length <= 0 ? (
          <NoData />
        ) : null}
      </MainCard>
      <MainCard title={`${name} Neurons`}>
        <TableWrapper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>
                    <Typography
                      whiteSpace={'nowrap'}
                      sx={{
                        color,
                      }}
                    >
                      ID
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace={'nowrap'}
                      sx={{
                        color,
                      }}
                    >
                      State
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace={'nowrap'}
                      sx={{
                        color,
                      }}
                    >
                      Staked {canisters?.icrc1_metadata?.icrc1_symbol}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace={'nowrap'}
                      sx={{
                        color,
                      }}
                    >
                      Maturity
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace={'nowrap'}
                      sx={{
                        color,
                      }}
                    >
                      Dissolve Delay
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace={'nowrap'}
                      sx={{
                        color,
                      }}
                    >
                      Age
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace={'nowrap'}
                      sx={{
                        color,
                      }}
                    >
                      Voting Power
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {neurons?.data?.map(
                  (record: SNSCanisterNeuronsDetail, index: number) => (
                    <NeuronsItem
                      key={index}
                      record={record}
                      decimals={decimals}
                      symbol={symbol}
                    />
                  ),
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TableWrapper>
        {loadings.neurons ? (
          <Box
            sx={{
              minHeight: '600px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) : neurons?.data?.length <= 0 ? (
          <NoData />
        ) : null}
      </MainCard>
    </Grid>
  );
}
