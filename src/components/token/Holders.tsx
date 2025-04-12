import {
  TableSorter,
  TableWrapper,
  TextualAddressLink,
} from '@/components/index';
import NoData from '@/components/NoData';
import Typography from '@/components/Typography';
import { useTokenHolders } from '@/hooks';
import type { Holder, Sorter, TokenDetail } from '@/types';
import { BigNumber, formatDollarAmount, NA, parseTokenAmount } from '@/utils';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useCallback, useEffect, useState } from 'react';
import { FaChartPie, FaSortAmountDown } from 'react-icons/fa';
import { MdOutlineTipsAndUpdates } from 'react-icons/md';
import DownloadPageButton from '../DownloadPageButton';
import { TablePagination } from '../pagination';

export interface TokenHoldersProps {
  id: string;
  initPageSize?: number;
  showTokenHoldersChart?: boolean;
  showChart?: boolean;
  tokenDetail?: TokenDetail;
  showDownloadData?: boolean;
}
const formatNumber = (num: number | string) => {
  return new BigNumber(num || 0)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Initialize the variable-pie module
const PieChart = ({ symbol, data }: { symbol: string; data: any }) => {
  const theme = useTheme() as Theme;
  const options = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
    },
    plotOptions: {
      pie: {
        backgroundColor: 'transparent',
      },
    },
    title: {
      text: `${symbol} Top 100 Token Holders`,
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        color:
          theme.palette.mode === 'dark'
            ? theme.colors.grey400
            : theme.colors.grey600,
      },
    },
    subtitle: {
      text: 'Source: nns',
      style: {
        fontSize: '12px',
        color:
          theme.palette.mode === 'dark'
            ? theme.colors.grey400
            : theme.colors.grey600,
      },
    },
    tooltip: {
      headerFormat: '',
      pointFormat:
        '<span style="color:{point.color}">\u25CF</span> <b> ' +
        'Account: {point.accountId}</b><br/>' +
        'Amount: <b>{point.amount}</b> {point.symbol}<br/>' +
        'Value: <b>${point.valueUSD}</b><br/>',
    },
    series: [
      {
        minPointSize: 10,
        innerSize: '20%',
        zMin: 0,
        name: 'holders',
        borderRadius: 5,
        data:
          data?.map((holder: any) => ({
            name: holder.accountId,
            accountId: holder.accountId,
            y: parseFloat(holder.amount),
            z: parseFloat(holder.valueUSD),
            amount: holder.amount,
            symbol: holder.symbol,
            valueUSD: holder.valueUSD,
          })) || [],
        colors: [
          '#4caefe',
          '#3dc3e8',
          '#2dd9db',
          '#1feeaf',
          '#0ff3a0',
          '#00e887',
          '#23e274',
        ],
      },
    ],
  };

  return (
    <Grid style={{ padding: 'var(--space-20) 0' }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Grid>
  );
};
export function TokenHolders({
  id,
  initPageSize = 25,
  showTokenHoldersChart = true,
  showDownloadData = true,
  tokenDetail,
  showChart = false,
}: TokenHoldersProps) {
  const theme = useTheme() as Theme;
  const [pageNum, setPageNum] = useState(0); // Adjust pagination for 0-based index
  const [pageSize, setPageSize] = useState(initPageSize);
  const [isDesc, setIsDesc] = useState(true);

  const { result: holders, loading } = useTokenHolders({
    tokenId: id,
    pageNum: pageNum + 1,
    pageSize,
    isDesc,
  });

  const handlePageChange = (event: unknown, newPage: number) => {
    setPageNum(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPageSize(parseInt(event.target.value));
    setPageNum(0); // Reset to the first page when page size changes
  };

  const handleSorter = useCallback(
    (field: string, sorter: Sorter) => {
      setIsDesc(sorter === 'default' || sorter === 'desc');
    },
    [setIsDesc],
  );

  const [top100, setTop100] = useState<Holder[]>([]);
  useEffect(() => {
    if (!top100.length && holders) {
      setTop100(holders?.list);
    }
  }, [holders, top100]);

  const top100Amount = top100.reduce(
    (sum, holder) => sum + parseFloat(holder.amount),
    0,
  );
  const totalSymbol = new BigNumber(tokenDetail?.totalSupply || 0)
    .dividedBy(10 ** (tokenDetail?.tokenDecimal || 8))
    .toNumber();

  return (
    <>
      <Grid>
        <Grid
          display="flex"
          sx={{
            padding: {
              xs: 'var(--space-12) var(--space-12) 0',
              sm: '0 var(--space-20) 0',
            },
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 'var(--space-8)', sm: 'var(--space-16)' },
          }}
        >
          <Grid display="flex" sx={{ gap: 'var(--space-12)' }}>
            {showTokenHoldersChart && holders && holders?.list?.length > 0 && (
              <Grid
                display="flex"
                alignItems="center"
                sx={{
                  gap: 'var(--space-4)',
                }}
              >
                <Button
                  size="small"
                  href={`/token/tokenholderchart/${id}`}
                  variant="contained"
                  sx={{
                    display: 'flex',
                    gap: 'var(--space-4)',
                  }}
                >
                  <FaChartPie />
                  Token Holders Chart
                </Button>
              </Grid>
            )}
            <Grid
              display="flex"
              alignItems="center"
              sx={{ gap: 'var(--space-4)' }}
            >
              <FaSortAmountDown />
              <Typography>
                Total of {Number(holders?.total).toLocaleString()} holders
              </Typography>
            </Grid>
          </Grid>
          <Grid
            display={'flex'}
            sx={{
              marginLeft: 'auto',
              alignItems: 'center',
            }}
          >
            {showDownloadData && holders && holders?.list?.length > 0 && (
              <DownloadPageButton
                onClick={() => {
                  // Convert holders data to CSV format
                  const headers = [
                    'Rank',
                    'Alias',
                    'Symbol',
                    'Owner',
                    'Account',
                    'Subaccount',
                    'Amount',
                    'Percentage',
                    'Value($)',
                  ];

                  const csvData = [
                    headers.join(','),
                    ...holders.list.map((holder, index) => {
                      return [
                        index + 1 + pageNum * pageSize,
                        holder.alias || NA,
                        holder.symbol || NA,
                        holder.owner || NA,
                        holder.accountId || NA,
                        holder.subaccount || NA,
                        holder.amount,
                        `${new BigNumber(holder.amount)
                          .dividedBy(
                            parseTokenAmount(
                              tokenDetail?.totalSupply ?? 0,
                              tokenDetail?.tokenDecimal ?? 0,
                            ),
                          )
                          .multipliedBy(100)
                          .toFixed(2)}%`,
                        `="$${holder.valueUSD}"`,
                      ].join(',');
                    }),
                  ].join('\n');

                  // Create blob and download
                  const blob = new Blob([csvData], { type: 'text/csv' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.setAttribute('hidden', '');
                  a.setAttribute('href', url);
                  a.setAttribute(
                    'download',
                    `token_holders_${id}_page${pageNum + 1}.csv`,
                  );
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  window.URL.revokeObjectURL(url);
                }}
              />
            )}
            <TablePagination
              count={holders?.total || 0}
              page={pageNum}
              onPageChange={handlePageChange}
              pageSize={pageSize}
              onRowsPerPageChange={handleRowsPerPageChange}
              sx={{
                flexShrink: 0,
                display: { xs: 'none', md: 'block' },
                opacity: holders && holders?.pages > 1 ? 1 : 0,
                pointerEvents: holders && holders?.pages > 1 ? 'auto' : 'none',
              }}
            />
          </Grid>
        </Grid>
        {showChart && (
          <>
            <Grid
              display={'flex'}
              alignItems="center"
              justifyContent="center"
              sx={{
                padding: 'var(--space-20) 0',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'flex-start', md: 'center' },
              }}
            >
              <Grid
                flex="1"
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                gap="var(--space-4)"
              >
                <MdOutlineTipsAndUpdates
                  color="var(--color-primary)"
                  fontSize="var(--space-14)"
                />
                The top {top100?.length || 0} holders collectively own{' '}
                {formatNumber(
                  new BigNumber(top100Amount ?? 0)
                    .dividedBy(totalSymbol ?? 0)
                    .multipliedBy(100)
                    .toFixed(2),
                )}
                % ({formatNumber(top100Amount || 0)} Tokens) of{' '}
                {tokenDetail?.symbol || ''}
              </Grid>
              <Box sx={{ width: { xs: '100%', md: 'auto' } }}>
                <Divider
                  orientation="vertical"
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    height: '40px',
                    mx: 2,
                  }}
                />
                <Divider
                  sx={{
                    display: { xs: 'block', md: 'none' },
                    my: 2,
                  }}
                />
              </Box>
              <Grid
                flex="1"
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                gap="var(--space-4)"
              >
                <MdOutlineTipsAndUpdates
                  color="var(--color-primary)"
                  fontSize="var(--space-14)"
                />
                Token Total Supply: {formatNumber(totalSymbol || 0)}{' '}
                {tokenDetail?.symbol || ''}
                {'  '}|{'  '}Total Token Holders: {holders?.total || 0}
              </Grid>
            </Grid>
            <Divider />
            <Grid sx={{ padding: 'var(--space-20) 0' }}>
              <PieChart
                symbol={tokenDetail?.symbol || ''}
                data={holders?.list || []}
              />
              <Typography>
                (A token of {formatNumber(top100Amount || 0)} tokens held by the
                top 100 accounts from the total supply of{' '}
                {formatNumber(totalSymbol || 0)} token)
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
      <TableWrapper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography
                    whiteSpace="nowrap"
                    sx={{
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.colors.grey400
                          : theme.colors.grey600,
                    }}
                  >
                    Rank
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    whiteSpace="nowrap"
                    sx={{
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.colors.grey400
                          : theme.colors.grey600,
                    }}
                  >
                    Address
                  </Typography>
                </TableCell>
                <TableCell>
                  <TableSorter
                    title="Amount"
                    onSorter={(sorter) => handleSorter('amount', sorter)}
                    sort={isDesc ? 'desc' : 'asc'}
                  />
                </TableCell>
                <TableCell>
                  <Typography
                    whiteSpace="nowrap"
                    sx={{
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.colors.grey400
                          : theme.colors.grey600,
                    }}
                  >
                    Percentage
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    whiteSpace="nowrap"
                    sx={{
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.colors.grey400
                          : theme.colors.grey600,
                    }}
                  >
                    Value
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {holders?.list?.map((record: Holder, index: number) => (
                <TableRow key={record.owner ?? record.accountId}>
                  <TableCell>
                    <Typography>{pageNum * pageSize + index + 1}</Typography>
                  </TableCell>
                  <TableCell>
                    <TextualAddressLink
                      alias={record.alias}
                      owner={record.owner}
                      account={record.accountId}
                      subaccount={record.subaccount}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {new BigNumber(record.amount).toFormat(
                        record.tokenDecimal,
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {new BigNumber(record.amount)
                        .dividedBy(
                          parseTokenAmount(
                            tokenDetail?.totalSupply ?? 0,
                            tokenDetail?.tokenDecimal ?? 0,
                          ),
                        )
                        .multipliedBy(100)
                        .toFixed(2)}
                      %
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {formatDollarAmount(record.valueUSD)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
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
      ) : holders && holders?.list.length <= 0 ? (
        <NoData />
      ) : null}
      {/* Pagination */}
      <TablePagination
        count={holders?.total || 0}
        page={pageNum}
        onPageChange={handlePageChange}
        pageSize={pageSize}
        onRowsPerPageChange={handleRowsPerPageChange}
        sx={{
          flexShrink: 0,
          opacity: holders && holders?.pages > 1 ? 1 : 0,
          pointerEvents: holders && holders?.pages > 1 ? 'auto' : 'none',
        }}
      />
    </>
  );
}
