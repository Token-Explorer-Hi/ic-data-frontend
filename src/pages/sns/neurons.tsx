import { Link } from '@/components/index';
import NoData from '@/components/NoData';
import { TablePagination } from '@/components/pagination';
import { TableWrapper } from '@/components/TableWrapper';
import { TokenSource } from '@/components/TokenSource';
import MainCard from '@/components/ui-component/cards/MainCard';
import { useRouter } from '@/hooks/useCustomRouter';
import { BigNumber, NA } from '@/utils';
import { formatDuration } from '@/utils/formatDuration';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Box,
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

import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Theme } from '@mui/material/styles';
import { format, formatDistanceToNow, fromUnixTime } from 'date-fns';
import { useEffect, useState } from 'react';
import { FaSortAmountDown } from 'react-icons/fa';
import { SNSCanisterNeuronsDetail } from './details';

const NeuronsItem = ({
  record,
  decimals,
}: {
  record: SNSCanisterNeuronsDetail;
  decimals: number;
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
          <TokenSource source={record.state} />
        </TableCell>
        <TableCell>
          <Typography>
            {record.stake_e8s > 0
              ? new BigNumber(record.stake_e8s)
                  .div(new BigNumber(10).pow(decimals ?? 0))
                  .toFormat()
              : NA}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography>
            {record.maturity_e8s_equivalent > 0
              ? record.maturity_e8s_equivalent
              : NA}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography>
            {record.current_dissolve_delay_seconds
              ? formatDuration(record.current_dissolve_delay_seconds)
              : NA}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography>
            {record.current_age_seconds
              ? formatDuration(record.current_age_seconds)
              : NA}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography>
            {record.voting_power > 0
              ? new BigNumber(
                  new BigNumber(record.voting_power)
                    .div(new BigNumber(10).pow(decimals ?? 0))
                    .toFixed(0),
                ).toFormat()
              : NA}
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
export default function SNSNeurons() {
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(0); // Adjust for 0-based pagination
  const [pageSize, setPageSize] = useState(25);
  const theme = useTheme() as Theme;
  const router = useRouter();
  const color =
    theme.palette.mode === 'dark' ? theme.colors.grey400 : theme.colors.grey600;
  const id = router.query.id;
  const [canisters, setCanisters] = useState<any>(null);
  const [neurons, setNeurons] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    async function fetchCanisterInfo() {
      // SNS canisters
      const result = await fetch(
        `https://sns-api.internetcomputer.org/api/v1/snses/${id}`,
      );
      const canisters = await result.json();
      setCanisters(canisters);

      const neuronsResult = await fetch(
        `https://sns-api.internetcomputer.org/api/v1/snses/${id}/neurons?limit=${pageSize}&offset=${
          pageSize * pageNum
        }`,
      );
      const neurons = await neuronsResult.json();
      setNeurons(neurons);
      setLoading(false);
    }

    fetchCanisterInfo();
  }, [id]);
  const symbol = canisters?.icrc1_metadata?.icrc1_symbol;
  const decimals = canisters?.icrc1_metadata?.icrc1_decimals;

  const handlePageChange = (event: unknown, newPage: number) => {
    setPageNum(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPageSize(parseInt(event.target.value));
    setPageNum(0); // Reset to the first page when page size changes
  };
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
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Link color="inherit" href="/sns">
          SNS
        </Link>
        <Link color="inherit" href={`/sns/${id}`}>
          {symbol}
        </Link>
        <Typography sx={{ color: 'text.primary' }}>Neurons</Typography>
      </Breadcrumbs>
      <Grid container>
        <Grid
          item
          xs={6}
          display={'flex'}
          flexDirection={'column'}
          gap="var(--space-24)"
        >
          <Typography fontSize="var(--space-32)">{symbol} Neurons</Typography>
        </Grid>
      </Grid>
      <MainCard>
        <Grid
          display="flex"
          alignItems="center"
          sx={{
            gap: 'var(--space-4)',
            padding: {
              xs: 'var(--space-12)',
              sm: 'var(--space-20)',
            },
          }}
        >
          <FaSortAmountDown />
          <Typography>
            More than {Number(neurons?.max_neuron_index ?? 0).toLocaleString()}{' '}
            neurons found
          </Typography>
        </Grid>
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
                    />
                  ),
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TableWrapper>
        {loading ? (
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
        ) : neurons && neurons?.data.length <= 0 ? (
          <NoData />
        ) : null}
        {neurons && neurons?.data.length > 0 && (
          <TablePagination
            count={neurons?.max_neuron_index || 0}
            page={pageNum}
            onPageChange={handlePageChange}
            pageSize={pageSize}
            onRowsPerPageChange={handleRowsPerPageChange}
            sx={{
              flexShrink: 0,
              opacity: neurons?.max_neuron_index / pageSize > 1 ? 1 : 0,
              pointerEvents:
                neurons?.max_neuron_index / pageSize > 1 ? 'auto' : 'none',
            }}
          />
        )}
      </MainCard>
    </Grid>
  );
}
