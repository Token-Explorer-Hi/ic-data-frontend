import { TableWrapper } from '@/components';
import DownloadPageButton from '@/components/DownloadPageButton';
import Typography from '@/components/Typography';
import MainCard from '@/components/ui-component/cards/MainCard';
import { getToken } from '@/hooks';
import { useRouter } from '@/hooks/useCustomRouter';
import { BigNumber, NA, sleep } from '@/utils';
import {
  Box,
  Chip,
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
import { format, fromUnixTime } from 'date-fns';
import { useEffect, useState } from 'react';
import { FaSortAmountDown } from 'react-icons/fa';
import { getSNSCanisters } from './ic';
import localSNSData, { SNSData } from './sns';

interface SNSResponse {
  data: SNSData[];
  max_sns_index: number;
  total_snses: number;
}
const getLifecycleColor = (
  lifecycle: string,
): 'warning' | 'success' | 'info' | 'secondary' | 'default' => {
  switch (lifecycle) {
    case 'LIFECYCLE_PENDING':
      return 'warning';
    case 'LIFECYCLE_ADOPTED':
      return 'success';
    case 'LIFECYCLE_OPEN':
      return 'info';
    case 'LIFECYCLE_COMMITTED':
      return 'secondary';
    default:
      return 'default';
  }
};
function Item({ item }: { item: SNSData }) {
  const router = useRouter();
  const [ledger, setLedger] = useState<string | undefined>(item.ledger);
  const [symbol, setSymbol] = useState<string | undefined>(item.symbol);
  const [decimals, setDecimals] = useState<number | undefined>(item.decimals);

  const [totalSupply, setTotalSupply] = useState<string | undefined>(
    item?.totalSupply ?? '',
  );
  useEffect(() => {
    async function fetchCanisterInfo() {
      if (!ledger || !symbol || !decimals || !totalSupply) {
        // SNS canisters
        let _ledger = ledger;
        if (!_ledger) {
          const canisters = await getSNSCanisters(item.root_canister_id);
          if (canisters?.ledger_canister_id) {
            const ledgerId = canisters.ledger_canister_id;
            setLedger(ledgerId);
            _ledger = ledgerId;
          }
        }
        const result = await getToken(_ledger);
        if (result) {
          setSymbol(result.symbol);
          item.symbol = result.symbol;
          console.log(result, '-result');
          setTotalSupply(String(result.totalSupply));
          item.totalSupply = String(result.totalSupply);
          setDecimals(result.tokenDecimal);
          item.decimals = result.tokenDecimal;
        }
      }
    }

    fetchCanisterInfo();
  }, [item.root_canister_id, ledger]);

  return (
    <TableRow key={item.root_canister_id}>
      <TableCell>
        <a
          href={`https://dashboard.internetcomputer.org/sns/${item.root_canister_id}`}
          target="_blank"
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-8)',
          }}
        >
          {item.logo && (
            <Box
              component="img"
              src={item.logo}
              alt={`${item.name} logo`}
              sx={{
                height: 40,
                width: 40,
                objectFit: 'contain',
              }}
            />
          )}
          <Typography variant="body1">{item.name}</Typography>
        </a>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{symbol || NA}</Typography>
      </TableCell>
      <TableCell>
        <Chip
          label={
            <Typography color="white">
              {item.swap_lifecycle.lifecycle.replace('LIFECYCLE_', '')}
            </Typography>
          }
          color={getLifecycleColor(item.swap_lifecycle.lifecycle)}
          size="small"
        />
      </TableCell>
      <TableCell>
        <Typography variant="body1">
          {new BigNumber(totalSupply ?? 0)
            .div(new BigNumber(10).pow(decimals ?? 0))
            .toFormat(0) || NA}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography>
          {item.swap_lifecycle.decentralization_sale_open_timestamp_seconds
            ? format(
                fromUnixTime(
                  item.swap_lifecycle
                    .decentralization_sale_open_timestamp_seconds,
                ),
                'yyyy-MM-dd HH:mm:ss',
              )
            : NA}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" color="text.secondary">
          <Typography>{ledger || NA}</Typography>
        </Typography>
      </TableCell>
    </TableRow>
  );
}
const SNSList = ({
  showDownloadData = true,
}: {
  showDownloadData?: boolean;
}) => {
  const [snsData, setSNSData] = useState<SNSData[]>(localSNSData.data);
  const theme = useTheme() as Theme;

  useEffect(() => {
    const fetchSNSData = async () => {
      try {
        const response = await fetch(
          'https://sns-api.internetcomputer.org/api/v1/snses?offset=0&limit=100&include_swap_lifecycle=LIFECYCLE_PENDING&include_swap_lifecycle=LIFECYCLE_ADOPTED&include_swap_lifecycle=LIFECYCLE_OPEN&include_swap_lifecycle=LIFECYCLE_COMMITTED',
        );
        const data: SNSResponse = await response.json();
        setSNSData(
          data.data.map((item) => {
            const localSNS = localSNSData.data.find(
              (i) => i.root_canister_id === item.root_canister_id,
            );
            if (localSNS) {
              return {
                ...item,
                ...localSNS,
              };
            }
            return item;
          }),
        );
      } catch (error) {
        console.error('Error fetching SNS data:', error);
      }
    };

    fetchSNSData();
  }, []);

  const color =
    theme.palette.mode === 'dark' ? theme.colors.grey400 : theme.colors.grey600;

  const [downloadLoading, setDownloadLoading] = useState(false);
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
          SNS Tracker
        </Typography>
      </Box>
      <MainCard>
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
              sm: 'var(--space-10) var(--space-24)',
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
              More than {Number(snsData?.length ?? 0).toLocaleString()} SNS
              tokens found
            </Typography>
          </Grid>
          <Grid
            display={'flex'}
            alignItems={'center'}
            sx={{
              marginLeft: 'auto',
            }}
          >
            {showDownloadData && snsData && snsData?.length > 0 && (
              <DownloadPageButton
                loading={downloadLoading}
                onClick={async () => {
                  setDownloadLoading(true);
                  await sleep(5000);
                  // Convert SNS data to CSV format
                  const headers = [
                    'Name',
                    'Symbol',
                    'Root Canister',
                    'Ledger ID',
                    'Total Supply',
                    'Decimals',
                    'Status',
                    'Sale Open Time',
                    'Website',
                    'Description',
                    'NNS Proposal',
                    'Enabled',
                  ];

                  // Helper function to safely wrap text in quotes
                  const wrapInQuotes = (text: string) => `="${text}"`;

                  const csvData = [
                    headers.join(','),
                    ...snsData.map((sns) => {
                      // Process special characters in description
                      const description = (sns.description || '')
                        .replace(/[\n\r]+/g, ' ')
                        .replace(/,/g, ';')
                        .replace(/"/g, "'");

                      // Format sale open time
                      const saleOpenTime =
                        sns.swap_lifecycle
                          .decentralization_sale_open_timestamp_seconds;
                      const formattedTime = saleOpenTime
                        ? format(
                            fromUnixTime(Number(saleOpenTime)),
                            'yyyy-MM-dd HH:mm:ss',
                          )
                        : NA;

                      return [
                        wrapInQuotes(sns.name || NA),
                        wrapInQuotes(sns.symbol || NA),
                        wrapInQuotes(sns.root_canister_id),
                        wrapInQuotes(sns.ledger || NA),
                        wrapInQuotes(
                          new BigNumber(sns.totalSupply ?? 0)
                            .div(new BigNumber(10).pow(sns.decimals ?? 0))
                            .toString() || NA,
                        ),
                        wrapInQuotes(String(sns.decimals || NA)),
                        wrapInQuotes(saleOpenTime ? 'Open' : 'Closed'),
                        wrapInQuotes(formattedTime),
                        wrapInQuotes(sns.url || NA),
                        wrapInQuotes(description || NA),
                        wrapInQuotes(
                          String(sns.nns_proposal_id_create_sns || NA),
                        ),
                        wrapInQuotes(sns.enabled ? 'Yes' : 'No'),
                      ].join(',');
                    }),
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
                  a.setAttribute('download', `sns_list.csv`);
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  window.URL.revokeObjectURL(url);
                  setDownloadLoading(false);
                }}
              />
            )}
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
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace={'nowrap'}
                      sx={{
                        color,
                      }}
                    >
                      Symbol
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
                      Total Supply
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace={'nowrap'}
                      sx={{
                        color,
                      }}
                    >
                      Sale Open Time
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      whiteSpace={'nowrap'}
                      sx={{
                        color,
                      }}
                    >
                      Ledger ID
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {snsData.map((item) => (
                  <Item key={item.root_canister_id} item={item} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TableWrapper>
      </MainCard>
    </Box>
  );
};

export default SNSList;
