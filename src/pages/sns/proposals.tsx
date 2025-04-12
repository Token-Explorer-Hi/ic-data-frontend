import NoData from '@/components/NoData';
import { TablePagination } from '@/components/pagination';
import { TableWrapper } from '@/components/TableWrapper';
import { TokenSource } from '@/components/TokenSource';
import MainCard from '@/components/ui-component/cards/MainCard';
import { useRouter } from '@/hooks/useCustomRouter';
import { BigNumber } from '@/utils';
import {
  Box,
  CircularProgress,
  Grid,
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
import Link from '@mui/material/Link';
import { Theme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { FaSortAmountDown } from 'react-icons/fa';
import { SNSCanisterProposalsDetail } from './details';

export default function SNSPropsals() {
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(0); // Adjust for 0-based pagination
  const [pageSize, setPageSize] = useState(25);

  const theme = useTheme() as Theme;
  const router = useRouter();
  const color =
    theme.palette.mode === 'dark' ? theme.colors.grey400 : theme.colors.grey600;
  const id = router.query.id;
  const [canisters, setCanisters] = useState<any>(null);
  const [proposals, setProposals] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    async function fetchCanisterInfo() {
      // SNS canisters
      const result = await fetch(
        `https://sns-api.internetcomputer.org/api/v1/snses/${id}`,
      );
      const canisters = await result.json();
      setCanisters(canisters);

      const proposalsResult = await fetch(
        `https://sns-api.internetcomputer.org/api/v1/snses/${id}/proposals?limit=${pageSize}&offset=${
          pageSize * pageNum
        }`,
      );
      const proposals = await proposalsResult.json();
      setProposals(proposals);
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
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/sns">
          SNS
        </Link>
        <Link underline="hover" color="inherit" href={`/sns/${id}`}>
          {symbol}
        </Link>
        <Typography sx={{ color: 'text.primary' }}>Proposals</Typography>
      </Breadcrumbs>
      <Grid container>
        <Grid
          item
          xs={6}
          display={'flex'}
          flexDirection={'column'}
          gap="var(--space-24)"
        >
          <Typography fontSize="var(--space-32)">{symbol} Proposals</Typography>
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
            More than{' '}
            {Number(proposals?.max_proposal_index ?? 0).toLocaleString()}{' '}
            proposals found
          </Typography>
        </Grid>
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
                    <TableRow key={record.id}>
                      <TableCell>
                        <Typography>{record.id}</Typography>
                      </TableCell>
                      <TableCell>
                        <Grid>
                          <Typography>{record.proposal_title}</Typography>
                        </Grid>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {record.nervous_system_function.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <TokenSource source={record.status} />
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {new BigNumber(
                            new BigNumber(record.votes)
                              .div(new BigNumber(10).pow(decimals ?? 0))
                              .toFixed(0),
                          ).toFormat()}
                        </Typography>
                      </TableCell>
                    </TableRow>
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
        ) : proposals && proposals?.data.length <= 0 ? (
          <NoData />
        ) : null}
        {proposals && proposals?.data.length > 0 && (
          <TablePagination
            count={proposals?.max_proposal_index || 0}
            page={pageNum}
            onPageChange={handlePageChange}
            pageSize={pageSize}
            onRowsPerPageChange={handleRowsPerPageChange}
            sx={{
              flexShrink: 0,
              opacity: proposals?.max_proposal_index / pageSize > 1 ? 1 : 0,
              pointerEvents:
                proposals?.max_proposal_index / pageSize > 1 ? 'auto' : 'none',
            }}
          />
        )}
      </MainCard>
    </Grid>
  );
}
