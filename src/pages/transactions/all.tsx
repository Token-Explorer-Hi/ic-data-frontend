import ICExplorerDayPicker from '@/components/DayPicker';
import {
  TableWrapper,
  TransactionsAddressLink,
  TypographyLink,
} from '@/components/index';
import NoData from '@/components/NoData';
import { TableFilter } from '@/components/TableFilter';
import MainCard from '@/components/ui-component/cards/MainCard';
import { useTransactions } from '@/hooks';
import { TokenTransaction } from '@/types';
import { NA, timestampFormat, toSignificantWithGroupSeparator } from '@/utils';

import DownloadPageButton from '@/components/DownloadPageButton';
import { TablePagination } from '@/components/pagination';
import { useGlobalContext } from '@/context/useGlobalContext';
import {
  Box,
  CircularProgress,
  FormControlLabel,
  Grid,
  Switch,
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
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { FaSortAmountDown } from 'react-icons/fa';

const DIFF_TIME = 90 * 24 * 3600;

export default function AllTransactions({
  showDownloadData = true,
}: {
  showDownloadData?: boolean;
}) {
  const theme = useTheme() as Theme;
  const [pageNum, setPageNum] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [pageSizes, setPageSizes] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const { allTransactionTypes } = useGlobalContext();

  const [hideZeroTransfer, setHideZeroTransfer] = useState<boolean>(true);
  useEffect(() => {
    if (localStorage.getItem('hideZeroTransfer')) {
      setHideZeroTransfer(localStorage.getItem('hideZeroTransfer') === 'true');
    }
    let size = Math.floor((window.innerHeight - 400) / 45);
    if (size < 10) {
      size = 10;
    }
    setPageSize(size);
    let maxSizes: number[] = [];
    if (size * 4 < 100) {
      maxSizes = [100];
    }
    setPageSizes([size, size * 2, size * 3, size * 4, ...maxSizes]);
  }, []);

  const [selectedRange, setSelectedRange] = useState<DateRange>({
    from: new Date(Date.now() - DIFF_TIME * 1000),
    to: new Date(Date.now()),
  });

  const { result: transactions, loading } = useTransactions({
    page: pageNum,
    size: pageSize,
    startTime: selectedRange.from
      ? selectedRange.from.getTime().toString()
      : null,
    endTime: selectedRange.to ? selectedRange.to.getTime().toString() : null,
    txTypes: selectedTypes,
  });
  const filterTransactions: TokenTransaction[] = useMemo(() => {
    if (hideZeroTransfer) {
      return (transactions?.list ?? []).filter((item: any) =>
        item.token0Symbol?.toLowerCase() === 'icp'
          ? Number(item.token0Amount) > 0.0001
          : true,
      );
    }
    return transactions?.list ?? [];
  }, [transactions, hideZeroTransfer]);

  const handlePageChange = (event: unknown, newPage: number) => {
    setPageNum(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPageSize(parseInt(event.target.value));
    setPageNum(0);
  };
  const handleOnFilter = useCallback((types: string[]) => {
    setSelectedTypes(types);
  }, []);
  const color =
    theme.palette.mode === 'dark' ? theme.colors.grey400 : theme.colors.grey600;

  const handleHideZeroTransferChange = () => {
    const _hideZeroTransfer = !hideZeroTransfer;
    setHideZeroTransfer(_hideZeroTransfer);
    localStorage.setItem(
      'hideZeroTransfer',
      _hideZeroTransfer ? 'true' : 'false',
    );
  };
  return (
    <Box
      className="wrap"
      sx={{
        padding: '0 var(--space-14) var(--space-14)',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography
          variant="h4"
          sx={{
            margin: {
              xs: 'var(--space-16) 0',
              sm: 'var(--space-24) 0',
            },
          }}
        >
          Transactions
        </Typography>
        <ICExplorerDayPicker callback={setSelectedRange} />
      </Box>
      <MainCard
        sx={{
          height: '100%',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <Grid
          display="flex"
          sx={{
            gap: 'var(--space-8)',
            alignItems: {
              xs: 'flex-start',
              sm: 'center',
            },
            flexDirection: { xs: 'column', sm: 'row' },
            padding: {
              xs: 'var(--space-12) var(--space-12) 0',
              sm: '0 var(--space-20)',
            },
          }}
        >
          <Grid
            display="flex"
            alignItems="center"
            sx={{
              gap: 'var(--space-4)',
              padding: {
                xs: 0,
                sm: 'var(--space-20) 0',
              },
            }}
          >
            <FaSortAmountDown />
            <Typography>
              More than {Number(transactions?.total ?? 0).toLocaleString()}{' '}
              transactions found
            </Typography>
          </Grid>
          {filterTransactions.length > 0 && (
            <Grid display="flex" alignItems="center" marginLeft="auto">
              <>
                <FormControlLabel
                  control={
                    <Switch
                      onChange={handleHideZeroTransferChange}
                      checked={hideZeroTransfer}
                      sx={{ width: 52 }}
                    />
                  }
                  sx={{
                    width: 'auto',
                    whiteSpace: 'nowrap',
                  }}
                  label="Hide Zero Transfer"
                />
                {showDownloadData && filterTransactions.length > 0 && (
                  <DownloadPageButton
                    onClick={() => {
                      // Convert transactions data to CSV format
                      const headers = [
                        'Time',
                        'Hash',
                        'Category',
                        'Source',
                        'Method',
                        'FromOwner',
                        'FromAccount',
                        'FromAccountTextual',
                        'ToOwner',
                        'ToAccount',
                        'ToAccountTextual',
                        'Token Symbol',
                        'Token Amount',
                        'Token Value',
                        'Token Fee',
                      ];
                      const csvData = [
                        headers.join(','),
                        ...filterTransactions.map((tx) =>
                          [
                            timestampFormat(tx.token0TxTime),
                            `="${tx.id}"`,
                            tx.category,
                            tx.source,
                            tx.op,
                            tx.fromOwner || NA,
                            tx.fromAccountId || NA,
                            tx.fromAccountTextual || NA,
                            tx.toOwner || NA,
                            tx.toAccountId || NA,
                            tx.toAccountTextual || NA,
                            tx.token0Symbol || NA,
                            tx.token0Amount || NA,
                            tx.token0Value ? `="$${tx.token0Value}"` : NA,
                            tx.token0Fee || NA,
                          ].join(','),
                        ),
                      ].join('\n');

                      // Create blob and download
                      const blob = new Blob([csvData], { type: 'text/csv' });
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.setAttribute('hidden', '');
                      a.setAttribute('href', url);
                      a.setAttribute(
                        'download',
                        `all_transactions_page${pageNum + 1}.csv`,
                      );
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      window.URL.revokeObjectURL(url);
                    }}
                  />
                )}
                <TablePagination
                  pageSizes={pageSizes}
                  count={transactions?.total || 0}
                  page={pageNum}
                  onPageChange={handlePageChange}
                  pageSize={pageSize}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  sx={{
                    marginLeft: 'auto',
                    flexShrink: 0,
                    display: { xs: 'none', md: 'block' },
                    opacity: transactions?.pages > 1 ? 1 : 0,
                    pointerEvents: transactions?.pages > 1 ? 'auto' : 'none',
                  }}
                />
              </>
            </Grid>
          )}
        </Grid>
        <TableWrapper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography whiteSpace="nowrap" sx={{ color }}>
                      Timestamp
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Grid display="flex" alignItems="center">
                      <Typography
                        whiteSpace="nowrap"
                        sx={{
                          color,
                        }}
                      >
                        Type
                      </Typography>
                      <TableFilter
                        values={allTransactionTypes}
                        onFilter={handleOnFilter}
                      />
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace="nowrap"
                      sx={{
                        color,
                      }}
                    >
                      Token0 Amount
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace="nowrap"
                      sx={{
                        color,
                      }}
                    >
                      Token1 Amount
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace="nowrap"
                      sx={{
                        color,
                      }}
                    >
                      From
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace="nowrap"
                      sx={{
                        color,
                      }}
                    >
                      To
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace="nowrap"
                      sx={{
                        color,
                      }}
                    >
                      Action
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterTransactions.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <Typography whiteSpace="nowrap">
                        {timestampFormat(record.token0TxTime)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography whiteSpace="nowrap">{record.op}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography whiteSpace="nowrap">
                        {record.token0Amount
                          ? `${toSignificantWithGroupSeparator(
                              record.token0Amount,
                            )} ${record.token0Symbol}`
                          : NA}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography whiteSpace="nowrap">
                        {record.token1Amount
                          ? `${toSignificantWithGroupSeparator(
                              record.token1Amount,
                            )} ${record.token1Symbol}`
                          : NA}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <TransactionsAddressLink
                        alias={record.fromAlias}
                        owner={record.fromOwner ?? record.fromAccountId}
                        sub={record.fromSubaccount}
                      />
                    </TableCell>
                    <TableCell>
                      <TransactionsAddressLink
                        alias={record.toAlias}
                        owner={record.toOwner ?? record.toAccountId}
                        sub={record.toSubaccount}
                      />
                    </TableCell>
                    <TableCell>
                      <TypographyLink to={`/transactions/details/${record.id}`}>
                        Details
                      </TypographyLink>
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
        ) : (
          filterTransactions.length <= 0 && <NoData />
        )}
        {filterTransactions.length > 0 && (
          <TablePagination
            pageSizes={pageSizes}
            count={transactions?.total || 0}
            page={pageNum}
            onPageChange={handlePageChange}
            pageSize={pageSize}
            onRowsPerPageChange={handleRowsPerPageChange}
            sx={{
              marginLeft: 'auto',
              flexShrink: 0,
              opacity: transactions?.pages > 1 ? 1 : 0,
              pointerEvents: transactions?.pages > 1 ? 'auto' : 'none',
            }}
          />
        )}
      </MainCard>
    </Box>
  );
}
