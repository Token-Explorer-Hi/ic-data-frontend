import NoData from '@/components/NoData';
import { TableFilter } from '@/components/TableFilter';
import Typography from '@/components/Typography';
import {
  TableWrapper,
  TransactionsAddressLink,
  TypographyLink,
} from '@/components/index';
import { useGlobalContext } from '@/context/useGlobalContext';
import { useAddressTransactions, useSelectTokenLists } from '@/hooks';
import { TokenTransaction } from '@/types';
import {
  NA,
  singleTransTypeFormatter,
  timestampFormat,
  toSignificantWithGroupSeparator,
} from '@/utils';
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
  useTheme,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { FaSortAmountDown } from 'react-icons/fa';
import DownloadPageButton from '../DownloadPageButton';
import { TablePagination } from '../pagination';

export interface TokenTransactionsProps {
  address: string;
  selectedRange: DateRange;
  showDownloadData?: boolean;
}

export function AddressTransactions({
  address,
  selectedRange,
  showDownloadData = true,
}: TokenTransactionsProps) {
  const theme = useTheme() as Theme;
  const [pageNum, setPageNum] = useState(0); // Adjusted for 0-based pagination
  const [pageSize, setPageSize] = useState(25);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const { allTransactionTypes } = useGlobalContext();
  const { result: _allTokens } = useSelectTokenLists();

  const [selectToken0LedgerId, setSelectToken0LedgerId] = useState<
    string | undefined
  >();
  const [selectToken1LedgerId, setSelectToken1LedgerId] = useState<
    string | undefined
  >();
  const allTokens = useMemo(() => {
    if (!_allTokens) return [];
    // Use Map to filter duplicate ledgerIds
    const uniqueTokens = new Map();
    _allTokens.forEach((item: any) => {
      if (!uniqueTokens.has(item.ledgerId)) {
        uniqueTokens.set(item.ledgerId, {
          ...item,
          key: item.ledgerId,
          label: item.symbol,
          value: item.symbol,
        });
      }
    });
    return Array.from(uniqueTokens.values());
  }, [_allTokens]);
  const { result: transactions, loading } = useAddressTransactions({
    address,
    pageNum: pageNum + 1, // Adjust for 1-based API
    pageSize,
    txTypes: selectedTypes,
    token0LedgerId: selectToken0LedgerId,
    token1LedgerId: selectToken1LedgerId,
    startTime: selectedRange.from
      ? selectedRange.from.getTime().toString()
      : null,
    endTime: selectedRange.to ? selectedRange.to.getTime().toString() : null,
  });
  const handleOnFilter = useCallback((types: string[]) => {
    setSelectedTypes(types);
  }, []);
  const handleOnFilterSelectToken0LedgerId = useCallback(
    (ledgerId: string | undefined) => {
      if (typeof ledgerId === 'object') {
        ledgerId = ledgerId[0];
      }
      setSelectToken0LedgerId(ledgerId);
    },
    [],
  );
  const handleOnFilterSelectToken1LedgerId = useCallback(
    (ledgerId: string | undefined) => {
      if (typeof ledgerId === 'object') {
        ledgerId = ledgerId[0];
      }
      setSelectToken1LedgerId(ledgerId);
    },
    [],
  );

  const handlePageChange = (event: unknown, newPage: number) => {
    setPageNum(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPageSize(parseInt(event.target.value));
    setPageNum(0); // Reset to first page when page size changes
  };
  const showSwitch = useMemo(() => {
    return address === 'ryjl3-tyaaa-aaaaa-aaaba-cai';
  }, [address]);
  const color =
    theme.palette.mode === 'dark' ? theme.colors.grey400 : theme.colors.grey600;
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
    if (showSwitch && hideZeroTransfer) {
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
  }, [transactions, hideZeroTransfer, showSwitch]);
  return (
    <>
      <>
        <Grid
          display="flex"
          sx={{
            gap: 'var(--space-8)',
            padding: {
              xs: 'var(--space-12) var(--space-12) 0',
              sm: '0 var(--space-24) 0',
            },
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Grid
            display="flex"
            alignItems="center"
            sx={{
              gap: 'var(--space-4)',
              padding: {
                xs: '0',
                sm: 'var(--space-20) 0',
              },
            }}
          >
            <FaSortAmountDown />
            <Typography>
              Total {transactions?.total} transactions found
            </Typography>
          </Grid>
          {transactions && (
            <Grid display="flex" alignItems="center" marginLeft="auto">
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
                      'From Owner',
                      'From Account',
                      'From Account Textual',
                      'To Owner',
                      'To Account',
                      'To Account Textual',
                      'Token0 Symbol',
                      'Token0 Amount',
                      'Token0 Fee',
                      'Token1 Symbol',
                      'Token1 Amount',
                      'Token1 Fee',
                      'Token Value($)',
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
                          tx.token0Fee || NA,
                          tx.token1Symbol || NA,
                          tx.token1Amount || NA,
                          tx.token1Fee || NA,
                          tx.token0Value || NA,
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
                      `address_transactions_${address}_page${pageNum + 1}.csv`,
                    );
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                  }}
                />
              )}
              <TablePagination
                pageSizes={[10, 25, 50, 100]}
                count={transactions?.total || 0}
                page={pageNum}
                onPageChange={handlePageChange}
                pageSize={pageSize}
                onRowsPerPageChange={handleRowsPerPageChange}
                sx={{
                  marginLeft: 'auto',
                  flexShrink: 0,
                  display: { xs: 'none', md: 'block' },
                  opacity: transactions?.pages ? 1 : 0,
                  pointerEvents: transactions?.pages > 1 ? 'auto' : 'none',
                }}
              />
            </Grid>
          )}
        </Grid>
        <>
          <TableWrapper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography
                        whiteSpace="nowrap"
                        sx={{
                          color,
                        }}
                      >
                        Timestamp
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Grid display="flex">
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
                      <Grid display="flex">
                        <Typography
                          whiteSpace="nowrap"
                          sx={{
                            color,
                          }}
                        >
                          Token0 Amount
                        </Typography>
                        <TableFilter
                          values={allTokens}
                          onFilter={handleOnFilterSelectToken0LedgerId}
                          multiple={false}
                        />
                      </Grid>
                    </TableCell>
                    <TableCell>
                      <Grid display="flex">
                        <Typography
                          whiteSpace="nowrap"
                          sx={{
                            color,
                          }}
                        >
                          Token1 Amount
                        </Typography>
                        <TableFilter
                          values={allTokens}
                          onFilter={handleOnFilterSelectToken1LedgerId}
                          multiple={false}
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
                  {filterTransactions?.map(
                    (record: TokenTransaction, index: number) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography>
                            {timestampFormat(
                              new Date(record.token0TxTime).getTime(),
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>
                            {singleTransTypeFormatter(record.op).value}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>
                            {toSignificantWithGroupSeparator(
                              record.token0Amount,
                            )}
                            &nbsp;
                            {record.token0Symbol}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {record.token1Amount ? (
                            <Typography>
                              {toSignificantWithGroupSeparator(
                                record.token1Amount,
                              )}
                              &nbsp;
                              {record.token1Symbol}
                            </Typography>
                          ) : (
                            <Typography>{NA}</Typography>
                          )}
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
                          <TypographyLink
                            to={`/transactions/details/${record.id}`}
                          >
                            Details
                          </TypographyLink>
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
          ) : filterTransactions.length <= 0 ? (
            <>
              <NoData />
            </>
          ) : null}
          {/* Pagination */}
          {transactions && filterTransactions.length > 0 && (
            <TablePagination
              pageSizes={[10, 25, 50, 100]}
              count={transactions?.total || 0}
              page={pageNum}
              onPageChange={handlePageChange}
              pageSize={pageSize}
              onRowsPerPageChange={handleRowsPerPageChange}
              sx={{
                marginLeft: 'auto',
                flexShrink: 0,
                opacity: transactions?.pages ? 1 : 0,
                pointerEvents: transactions?.pages > 1 ? 'auto' : 'none',
              }}
            />
          )}
        </>
      </>
    </>
  );
}
