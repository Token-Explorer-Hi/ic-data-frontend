/* eslint-disable jsx-a11y/anchor-is-valid */
import DownloadPageButton from '@/components/DownloadPageButton';
import { TableWrapper } from '@/components/index';
import { AddressLink } from '@/components/Link';
import NoData from '@/components/NoData';
import { TablePagination } from '@/components/pagination';
import Typography from '@/components/Typography';
import MainCard from '@/components/ui-component/cards/MainCard';
import { NONE_SUB_HEX } from '@/constants/index';
import { useAddresses } from '@/hooks';
import { AddressList } from '@/types';
import { NA } from '@/utils';
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
import { useEffect, useState } from 'react';
import { FaSortAmountDown } from 'react-icons/fa';

export default function AllAddress({
  showDownloadData = true,
}: {
  showDownloadData: boolean;
}) {
  const theme = useTheme() as Theme;
  const [pageNum, setPageNum] = useState(0); // Page number should be 0-based for MUI
  const [pageSize, setPageSize] = useState(0);
  const [pageSizes, setPageSizes] = useState<number[]>([]);
  useEffect(() => {
    let size = Math.floor((window.innerHeight - 400) / 48);
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
  const { result: addresses, loading } = useAddresses(pageNum + 1, pageSize); // Adjust for 1-based API

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
          Address
        </Typography>
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
              md: 'center',
            },
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
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
              width: {
                xs: '100%',
                sm: 'auto',
              },
            }}
          >
            <FaSortAmountDown />
            <Typography>More than {addresses?.total} address found</Typography>
          </Grid>
          <Grid
            display={'flex'}
            alignItems={'center'}
            sx={{
              marginLeft: 'auto',
            }}
          >
            {showDownloadData && addresses && addresses?.list.length > 0 && (
              <DownloadPageButton
                onClick={() => {
                  // Convert addresses data to CSV format
                  const headers = ['Owner', 'Subaccount', 'AccountId', 'Alias'];
                  const csvData = [
                    headers.join(','),
                    ...addresses.list.map((addr) =>
                      [
                        addr.owner || NA,
                        addr.subaccount !==
                        '0000000000000000000000000000000000000000000000000000000000000000'
                          ? addr.subaccount
                          : NA,
                        addr.accountId || NA,
                        addr.alias || NA,
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
                    `all_addresses_page${pageNum + 1}.csv`,
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
              count={addresses?.total || 0}
              page={pageNum}
              onPageChange={handlePageChange}
              pageSize={pageSize}
              onRowsPerPageChange={handleRowsPerPageChange}
              sx={{
                flexShrink: 0,
                display: { xs: 'none', md: 'block' },
                opacity: (addresses && addresses?.pages > 1) || 0,
                pointerEvents: (addresses && addresses?.pages > 1) || 'none',
              }}
            />
          </Grid>
        </Grid>
        <TableWrapper>
          <TableContainer>
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography
                        whiteSpace="nowrap"
                        color={
                          theme.palette.mode === 'dark'
                            ? theme.colors.grey400
                            : '#757575'
                        }
                      >
                        #
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        whiteSpace="nowrap"
                        color={
                          theme.palette.mode === 'dark'
                            ? theme.colors.grey400
                            : '#757575'
                        }
                      >
                        Account ID
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        whiteSpace="nowrap"
                        color={
                          theme.palette.mode === 'dark'
                            ? theme.colors.grey400
                            : '#757575'
                        }
                      >
                        Principal ID
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        whiteSpace="nowrap"
                        color={
                          theme.palette.mode === 'dark'
                            ? theme.colors.grey400
                            : '#757575'
                        }
                      >
                        Subaccount
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        whiteSpace="nowrap"
                        color={
                          theme.palette.mode === 'dark'
                            ? theme.colors.grey400
                            : '#757575'
                        }
                      >
                        Name Tag
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {addresses?.list?.map(
                    (record: AddressList, index: number) => (
                      <TableRow key={record.accountId || index}>
                        <TableCell>
                          <Typography>{index + 1}</Typography>
                        </TableCell>
                        <TableCell>
                          {record.accountId !== '' ? (
                            <AddressLink owner={record.accountId} shorten />
                          ) : (
                            NA
                          )}
                        </TableCell>
                        <TableCell>
                          {record.owner !== '' ? (
                            <AddressLink shorten={false} owner={record.owner} />
                          ) : (
                            NA
                          )}
                        </TableCell>
                        <TableCell>
                          <Typography>
                            {record.subaccount !== '' &&
                            record.subaccount !== NONE_SUB_HEX
                              ? record.subaccount
                              : NA}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{record.alias}</Typography>
                        </TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            </>
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
        ) : addresses && addresses?.list.length <= 0 ? (
          <NoData />
        ) : null}
        {addresses && addresses?.list.length > 0 && (
          <TablePagination
            pageSizes={pageSizes}
            count={addresses?.total || 0}
            page={pageNum}
            onPageChange={handlePageChange}
            pageSize={pageSize}
            onRowsPerPageChange={handleRowsPerPageChange}
            sx={{
              flexShrink: 0,
              opacity: addresses?.pages > 1 || 0,
              pointerEvents: addresses?.pages > 1 || 'none',
            }}
          />
        )}
      </MainCard>
    </Box>
  );
}
