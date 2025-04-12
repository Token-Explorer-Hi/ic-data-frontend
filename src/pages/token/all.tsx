import DownloadPageButton from '@/components/DownloadPageButton';
import {
  Order,
  TableSorter,
  TableWrapper,
  TokenImage,
  TokenSource,
  TypographyLink,
} from '@/components/index';
import NoData from '@/components/NoData';
import { TablePagination } from '@/components/pagination';
import { Proportion } from '@/components/Proportion';
import Typography from '@/components/Typography';
import MainCard from '@/components/ui-component/cards/MainCard';
import { useTokens } from '@/hooks';
import { Sorter, SorterArgs, TokenDetail } from '@/types';
import {
  formatDollarAmount,
  NA,
  parseTokenAmount,
  toSignificantWithGroupSeparator,
} from '@/utils';
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
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FaSortAmountDown } from 'react-icons/fa';

interface Sorters {
  [key: string]: Order;
}
export default function AllTokens({
  showDownloadData = true,
}: {
  showDownloadData?: boolean;
}) {
  const theme = useTheme() as Theme;
  const [pageNum, setPageNum] = useState(0); // MUI pagination is 0-based
  const [sorters, setSorters] = useState<Sorters>({} as Sorters);
  const [pageSize, setPageSize] = useState(0);
  const [pageSizes, setPageSizes] = useState<number[]>([]);
  useEffect(() => {
    let size = Math.floor((window.innerHeight - 400) / 62);
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

  // Filter out the "default" sortOrder
  const sorterArgs = useMemo(() => {
    return Object.keys(sorters)
      .filter((key) => sorters[key] !== 'default') // Only include valid sorters
      .map(
        (key) =>
          ({
            sortOrder: sorters[key] as 'asc' | 'desc',
            sortBy: key,
          }) as SorterArgs,
      );
  }, [sorters]);

  const { result: tokens, loading } = useTokens({
    page: pageNum + 1,
    size: pageSize,
    sorters: sorterArgs,
  });
  const handlePageChange = (event: unknown, newPage: number) => {
    setPageNum(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPageSize(parseInt(event.target.value));
    setPageNum(0); // Reset to first page when page size changes
  };

  const handleSort = useCallback(
    (field: string, sorter: Sorter) => {
      setSorters({ [field]: sorter });
    },
    [setSorters],
  );

  const color =
    theme.palette.mode === 'dark' ? theme.colors.grey400 : theme.colors.grey600;
  return (
    <>
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
            Token Tracker
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
                gap: 'var(--space-12)',
                width: {
                  xs: '100%',
                  sm: 'auto',
                },
              }}
            >
              <FaSortAmountDown />
              <Typography>
                More than {Number(tokens?.total ?? 0).toLocaleString()} tokens
                found
              </Typography>
            </Grid>
            <Grid
              display={'flex'}
              alignItems={'center'}
              sx={{
                marginLeft: 'auto',
              }}
            >
              {showDownloadData && tokens && tokens?.list.length > 0 && (
                <DownloadPageButton
                  onClick={() => {
                    // Convert tokens data to CSV format
                    const headers = [
                      'Token ID',
                      'Name',
                      'Symbol',
                      'Source',
                      'Standards',
                      'Decimal',
                      'Fee',
                      'Price($)',
                      'Price(ICP)',
                      'Change 24h(%)',
                      'Volume 24h($)',
                      'Total Supply',
                      'Supply Cap',
                      'Market Cap($)',
                      'Fully Diluted Market Cap($)',
                      'Holders',
                      'Transactions',
                      'Website',
                      'Twitter',
                    ];
                    const csvData = [
                      headers.join(','),
                      ...tokens.list.map((token) =>
                        [
                          token.ledgerId,
                          token.name,
                          token.symbol,
                          token.source,
                          token.standardArray?.join(';') || NA,
                          token.tokenDecimal,
                          token.fee,
                          token.price ? `$${token.price}` : NA,
                          token.priceICP || NA,
                          token.priceChange24 ? `${token.priceChange24}%` : NA,
                          token.txVolume24 ? `="$${token.txVolume24}"` : NA,
                          `="${token.totalSupply}"`,
                          token.supplyCap ? `="$${token.supplyCap}"` : NA,
                          token.marketCap ? `="$${token.marketCap}"` : NA,
                          token.fullyDilutedMarketCap
                            ? `="$${token.fullyDilutedMarketCap}"`
                            : NA,
                          token.holderAmount || NA,
                          token.transactionAmount || NA,
                          token.tokenDetail?.Website || NA,
                          token.tokenDetail?.Twitter || NA,
                        ].join(','),
                      ),
                    ].join('\n');

                    // Add BOM to force Excel to recognize the file as UTF-8
                    const BOM = '\uFEFF';
                    // Create blob and download
                    const blob = new Blob([BOM + csvData], {
                      type: 'text/csv;charset=utf-8',
                    });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.setAttribute('hidden', '');
                    a.setAttribute('href', url);
                    a.setAttribute(
                      'download',
                      `all_tokens_page${pageNum + 1}.csv`,
                    );
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                  }}
                />
              )}
              <TablePagination
                count={tokens?.total || 0}
                page={pageNum}
                pageSizes={pageSizes}
                onPageChange={handlePageChange}
                pageSize={pageSize}
                onRowsPerPageChange={handleRowsPerPageChange}
                sx={{
                  marginLeft: 'auto',
                  flexShrink: 0,
                  display: { xs: 'none', md: 'block' },
                  opacity: tokens && tokens?.pages > 1 ? 1 : 0,
                  pointerEvents: tokens && tokens?.pages > 1 ? 'auto' : 'none',
                }}
              />
            </Grid>
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
                        #
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        whiteSpace={'nowrap'}
                        sx={{
                          color,
                        }}
                      >
                        Token
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        whiteSpace={'nowrap'}
                        sx={{
                          color,
                        }}
                      >
                        Price
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <TableSorter
                        title="Change(%)"
                        onSorter={(sorter) =>
                          handleSort('priceChange24', sorter)
                        }
                        sort={sorters.priceChange24}
                      />
                    </TableCell>
                    <TableCell>
                      <TableSorter
                        title="Volume(24H)"
                        onSorter={(sorter) => handleSort('txVolume24', sorter)}
                        sort={sorters.txVolume24}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        whiteSpace={'nowrap'}
                        sx={{
                          color,
                        }}
                      >
                        Total Supply
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <TableSorter
                        title="Market Cap"
                        onSorter={(sorter) => handleSort('marketCap', sorter)}
                        sort={sorters.marketCap}
                      />
                    </TableCell>
                    <TableCell>
                      <TableSorter
                        title="Holders"
                        onSorter={(sorter) =>
                          handleSort('holderAmount', sorter)
                        }
                        sort={sorters.holderAmount}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        whiteSpace={'nowrap'}
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
                  {tokens?.list?.map((record: TokenDetail, index: number) => (
                    <TableRow key={record.ledgerId}>
                      <TableCell>
                        <Typography>{index + 1}</Typography>
                      </TableCell>
                      <TableCell>
                        <Grid
                          container
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
                          flexWrap="nowrap"
                          gap="0 var(--space-4)"
                        >
                          <Grid>
                            <TokenImage tokenId={record.ledgerId} />
                          </Grid>
                          <Grid>
                            <Typography>{record.symbol}</Typography>
                          </Grid>
                          <Grid>
                            <TokenSource source={record.source} />
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell>
                        <Grid
                          display="flex"
                          flexDirection="column"
                          sx={{ gap: 'var(--space-4)' }}
                        >
                          <Typography>
                            {formatDollarAmount(record.price)}
                          </Typography>
                          <Typography>
                            {record.priceICP
                              ? `${toSignificantWithGroupSeparator(
                                  record.priceICP,
                                )} ICP`
                              : NA}
                          </Typography>
                        </Grid>
                      </TableCell>
                      <TableCell>
                        {record.priceChange24 &&
                          (record.priceChange24 ? (
                            <Proportion value={Number(record.priceChange24)} />
                          ) : null)}
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {record.txVolume24
                            ? formatDollarAmount(record.txVolume24)
                            : NA}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {parseTokenAmount(
                            record.totalSupply,
                            record.tokenDecimal,
                          ).toFormat(4)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {record.marketCap
                            ? formatDollarAmount(record.marketCap)
                            : NA}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {Number(record.holderAmount).toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <TypographyLink
                          to={`/token/details/${record.ledgerId}`}
                        >
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
            tokens && tokens?.list.length <= 0 && <NoData />
          )}
          {tokens && tokens?.list.length > 0 && (
            <TablePagination
              count={tokens?.total || 0}
              page={pageNum}
              pageSizes={pageSizes}
              onPageChange={handlePageChange}
              pageSize={pageSize}
              onRowsPerPageChange={handleRowsPerPageChange}
              sx={{
                marginLeft: 'auto',
                flexShrink: 0,
                opacity: tokens?.pages > 1 ? 1 : 0,
                pointerEvents: tokens?.pages > 1 ? 'auto' : 'none',
              }}
            />
          )}
        </MainCard>
      </Box>
    </>
  );
}
