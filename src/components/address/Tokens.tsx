import {
  TableSorter,
  TableWrapper,
  TokenImage,
  TokenLink,
} from '@/components/index';
import NoData from '@/components/NoData';
import Typography from '@/components/Typography';
import { useAddressTokens } from '@/hooks';
import type { AddressToken, Sorter } from '@/types';
import { BigNumber, formatDollarAmount, NA } from '@/utils';

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
  useTheme,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { useCallback, useEffect, useState } from 'react';
import { FaSortAmountDown } from 'react-icons/fa';
import DownloadPageButton from '../DownloadPageButton';
import { TablePagination } from '../pagination';

export interface TokenHoldersProps {
  address: string;
  showDownloadData?: boolean;
}

export function AddressTokens({
  address,
  showDownloadData = true,
}: TokenHoldersProps) {
  const theme = useTheme() as Theme;
  const [pageNum, setPageNum] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [isDesc, setIsDesc] = useState(true);
  const [pageSizes, setPageSizes] = useState<number[]>([]);
  useEffect(() => {
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
  const { result: tokens, loading } = useAddressTokens({
    address,
    pageNum: pageNum + 1,
    pageSize,
    isDesc,
  });
  const handlePageChange = (event: unknown, newPage: number) => {
    setPageNum(newPage);
  };

  const handleSorter = useCallback(
    (field: string, sorter: Sorter) => {
      setIsDesc(sorter === 'desc' || sorter === 'default');
    },
    [setIsDesc],
  );
  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPageSize(parseInt(event.target.value));
    setPageNum(0);
  };

  const color =
    theme.palette.mode === 'dark' ? theme.colors.grey400 : theme.colors.grey600;
  return (
    <>
      <Grid
        display="flex"
        sx={{
          padding: {
            xs: 'var(--space-12) var(--space-12) 0',
            sm: '0 var(--space-20) 0',
          },
          alignItems: {
            xs: 'flex-start',
            sm: 'center',
          },
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Grid display="flex" alignItems="center" sx={{ gap: 'var(--space-4)' }}>
          <FaSortAmountDown />
          <Typography>Total {tokens?.total} Tokens found</Typography>
        </Grid>
        <Grid
          display="flex"
          sx={{
            marginLeft: 'auto',
            alignItems: 'center',
          }}
        >
          {showDownloadData && tokens && tokens?.list?.length > 0 && (
            <DownloadPageButton
              onClick={() => {
                // Convert tokens data to CSV format
                const headers = ['Token ID', 'Symbol', 'Amount', 'Value ($)'];
                const csvData = [
                  headers.join(','),
                  ...tokens.list.map((token) =>
                    [
                      token.ledgerId,
                      token.symbol,
                      token.amount,
                      token.valueUSD ? `="$${token.valueUSD}"` : NA,
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
                  `address_tokens_${address}_page${pageNum + 1}.csv`,
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
            count={tokens?.total || 0}
            page={pageNum}
            onPageChange={handlePageChange}
            pageSize={pageSize}
            onRowsPerPageChange={handleRowsPerPageChange}
            sx={{
              flexShrink: 0,
              display: { xs: 'none', md: 'block' },
              opacity: tokens?.pages ? 1 : 0,
              pointerEvents: tokens?.pages ? 'auto' : 'none',
            }}
            labelRowsPerPage="Show:"
          />
        </Grid>
      </Grid>
      <TableWrapper>
        <TableContainer>
          <Table>
            {/* Table Head */}
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography whiteSpace="nowrap" sx={{ color }}>
                    Canister ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography whiteSpace="nowrap" sx={{ color }}>
                    Token Name
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
                  <Typography whiteSpace="nowrap" sx={{ color }}>
                    Value
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {tokens?.list?.map((record: AddressToken) => (
                <TableRow key={record.ledgerId}>
                  {/* Canister ID */}
                  <TableCell>
                    <TokenLink id={record.ledgerId} />
                  </TableCell>

                  {/* Token Name */}
                  <TableCell>
                    <Grid
                      display="flex"
                      alignItems="center"
                      gap="var(--space-5)"
                    >
                      <TokenImage tokenId={record.ledgerId} />
                      <Typography>{record.symbol}</Typography>
                    </Grid>
                  </TableCell>

                  {/* Amount */}
                  <TableCell>
                    <Typography>
                      {new BigNumber(record.amount).toFormat(
                        record.tokenDecimal,
                      )}
                    </Typography>
                  </TableCell>

                  {/* Value */}
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
      ) : !tokens?.list.length ? (
        <NoData />
      ) : null}
      {/* Pagination */}
      {tokens && tokens?.list?.length > 0 && (
        <TablePagination
          pageSizes={pageSizes}
          count={tokens?.total || 0}
          page={pageNum}
          onPageChange={handlePageChange}
          pageSize={pageSize}
          onRowsPerPageChange={handleRowsPerPageChange}
          sx={{
            flexShrink: 0,
            opacity: tokens?.pages ? 1 : 0,
            pointerEvents: tokens?.pages ? 'auto' : 'none',
          }}
          labelRowsPerPage="Show:"
        />
      )}
    </>
  );
}
