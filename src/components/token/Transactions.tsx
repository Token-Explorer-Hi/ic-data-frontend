import NoData from '@/components/NoData';
import { TableFilter } from '@/components/TableFilter';
import Typography from '@/components/Typography';
import {
  Link,
  TableWrapper,
  TransactionsAddressLink,
} from '@/components/index';
import { useGlobalContext } from '@/context/useGlobalContext';
import { useTokenTransactions } from '@/hooks';
import { TokenTransaction } from '@/types';
import { NA, timestampFormat, toSignificantWithGroupSeparator } from '@/utils';
import { singleTokenTransTypeFormatter } from '@/utils/index';
import {
  Box,
  Button,
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
  useTheme,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { FaSortAmountDown } from 'react-icons/fa';
import DownloadPageButton from '../DownloadPageButton';
import { TablePagination } from '../pagination';

export interface TokenTransactionsProps {
  id: string;
  selectedRange?: DateRange;
  showDownloadData?: boolean;
}

export function TokenTransactions({
  id,
  selectedRange,
  showDownloadData = true,
}: TokenTransactionsProps) {
  const theme = useTheme() as Theme;
  const [pageNum, setPageNum] = useState(0); // Adjust for 0-based pagination
  const [pageSize, setPageSize] = useState(25);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const { allTokenTransactionTypes } = useGlobalContext();
  const { result: transactions, loading } = useTokenTransactions({
    tokenId: id,
    pageNum: pageNum + 1, // Adjust for 1-based API
    pageSize,
    txTypes: selectedTypes,
    startTime: selectedRange?.from
      ? selectedRange.from.getTime().toString()
      : null,
    endTime: selectedRange?.to ? selectedRange.to.getTime().toString() : null,
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

  const handleOnFilter = useCallback((types: string[]) => {
    setSelectedTypes(types);
  }, []);

  const showSwitch = useMemo(() => {
    return id === 'ryjl3-tyaaa-aaaaa-aaaba-cai';
  }, [id]);
  const [hideZeroTransfer, setHideZeroTransfer] = useState<boolean>(true);
  useEffect(() => {
    if (localStorage.getItem('hideZeroTransfer')) {
      setHideZeroTransfer(localStorage.getItem('hideZeroTransfer') === 'true');
    }
  }, []);
  const handleHideZeroTransferChange = () => {
    const _hideZeroTransfer = !hideZeroTransfer;
    setHideZeroTransfer(_hideZeroTransfer);
    localStorage.setItem(
      'hideZeroTransfer',
      _hideZeroTransfer ? 'true' : 'false',
    );
  };
  const filterTransactions: TokenTransaction[] = useMemo(() => {
    if (hideZeroTransfer) {
      return (transactions?.list ?? [])
        .map((item: any) => ({
          ...item,
          fromAccountTextual: item.fromAccountTextual || null,
          toAccountTextual: item.toAccountTextual || null,
        }))
        .filter((item: any) =>
          item.token0Symbol?.toLowerCase() === 'icp'
            ? Number(item.token0Amount) > 0.0001
            : true,
        );
    }
    return (transactions?.list ?? []).map((item: any) => ({
      ...item,
      fromAccountTextual: item.fromAccountTextual || null,
      toAccountTextual: item.toAccountTextual || null,
    }));
  }, [transactions, hideZeroTransfer]);

  return (
    <>
      <Grid
        display="flex"
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
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
            More than {Number(transactions?.total ?? 0).toLocaleString()}{' '}
            transactions found
          </Typography>
        </Grid>
        {transactions && (
          <Grid
            display="flex"
            alignItems="center"
            marginLeft="auto"
            flexShrink={0}
          >
            {showSwitch && (
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
            )}
            {showDownloadData && (
              <DownloadPageButton
                onClick={() => {
                  // Convert transactions data to CSV format
                  const headers = [
                    'Time',
                    'Tx Hash',
                    'Hash',
                    'Category',
                    'Source',
                    'Source Canister',
                    'Method',
                    'From Account',
                    'From Subaccount',
                    'To Account',
                    'To Subaccount',
                    'Amount',
                    'Value($)',
                    'Fee',
                  ];
                  const csvData = [
                    headers.join(','),
                    ...filterTransactions.map((tx) =>
                      [
                        timestampFormat(tx.token0TxTime),
                        tx.token0TxHash || NA,
                        `="${tx.id}"`,
                        tx.category,
                        tx.source,
                        tx.sourceCanister || NA,
                        tx.op,
                        tx.fromAccountId || NA,
                        tx.fromSubaccount ===
                        '0000000000000000000000000000000000000000000000000000000000000000'
                          ? NA
                          : tx.fromSubaccount,
                        tx.toAccountId || NA,
                        tx.toSubaccount ===
                        '0000000000000000000000000000000000000000000000000000000000000000'
                          ? NA
                          : tx.toSubaccount,
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
                    `token_transactions_${id}_page${pageNum + 1}.csv`,
                  );
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  window.URL.revokeObjectURL(url);
                }}
              />
            )}
            <TablePagination
              count={transactions?.total || 0}
              page={pageNum}
              onPageChange={handlePageChange}
              pageSize={pageSize}
              onRowsPerPageChange={handleRowsPerPageChange}
              sx={{
                flexShrink: 0,
                display: { xs: 'none', md: 'block' },
                opacity: transactions?.pages > 1 ? 1 : 0,
                pointerEvents: transactions?.pages > 1 ? 'auto' : 'none',
              }}
            />
          </Grid>
        )}
      </Grid>
      <TableWrapper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {transactions?.list?.[0]?.token0TxIndex && (
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
                      Index
                    </Typography>
                  </TableCell>
                )}
                {transactions?.list?.[0]?.token0TxHash ? (
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
                      Transaction Hash
                    </Typography>
                  </TableCell>
                ) : (
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
                      Timestamp
                    </Typography>
                  </TableCell>
                )}
                <TableCell>
                  <Grid display="flex">
                    <Typography
                      whiteSpace="nowrap"
                      sx={{
                        color:
                          theme.palette.mode === 'dark'
                            ? theme.colors.grey400
                            : theme.colors.grey600,
                      }}
                    >
                      Method
                    </Typography>
                    <TableFilter
                      values={allTokenTransactionTypes}
                      onFilter={handleOnFilter}
                    />
                  </Grid>
                </TableCell>

                {transactions?.list?.[0]?.token0TxHash && (
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
                      Age
                    </Typography>
                  </TableCell>
                )}
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
                    From
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
                    To
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
                    Amount
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
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterTransactions?.map(
                (record: TokenTransaction, index: number) => (
                  <TableRow key={index}>
                    {record?.token0TxIndex && (
                      <TableCell>
                        <Typography>{record?.token0TxIndex}</Typography>
                      </TableCell>
                    )}
                    {record?.token0TxHash ? (
                      <TableCell>
                        <Typography copyable>
                          {(record?.token0TxHash as string).slice(0, 13)}
                          ...
                        </Typography>
                      </TableCell>
                    ) : (
                      <TableCell>
                        <Typography>
                          {timestampFormat(
                            new Date(record.token0TxTime).getTime(),
                          )}
                        </Typography>
                      </TableCell>
                    )}
                    <TableCell>
                      <Button
                        variant="outlined"
                        disabled
                        size="small"
                        sx={{ paddingTop: 0, paddingBottom: 0 }}
                      >
                        {singleTokenTransTypeFormatter(record.op).value}
                      </Button>
                    </TableCell>
                    {record.token0TxHash && (
                      <TableCell>
                        <Typography>
                          {timestampFormat(
                            new Date(record.token0TxTime).getTime(),
                          )}
                        </Typography>
                      </TableCell>
                    )}
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
                      <Typography>
                        {toSignificantWithGroupSeparator(record.token0Amount)}
                        &nbsp;
                        {record.token0Symbol}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Link to={`/transactions/details/${record.id}`}>
                        <Typography color={'var(--color-primary)'}>
                          Details
                        </Typography>
                      </Link>
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
      ) : transactions && transactions?.list.length <= 0 ? (
        <NoData />
      ) : null}
      {/* Pagination */}
      {transactions && transactions?.list.length > 0 && (
        <TablePagination
          count={transactions?.total || 0}
          page={pageNum}
          onPageChange={handlePageChange}
          pageSize={pageSize}
          onRowsPerPageChange={handleRowsPerPageChange}
          sx={{
            flexShrink: 0,
            opacity: transactions?.pages > 1 ? 1 : 0,
            pointerEvents: transactions?.pages > 1 ? 'auto' : 'none',
          }}
        />
      )}
    </>
  );
}
