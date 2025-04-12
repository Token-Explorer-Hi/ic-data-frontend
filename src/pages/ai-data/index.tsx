import NoData from '@/components/NoData';
import { TableWrapper } from '@/components/TableWrapper';
import Typography from '@/components/Typography';
import MainCard from '@/components/ui-component/cards/MainCard';
import { useICECanister } from '@/hooks/useICEInfo';
import { bytesToHex, getKey } from '@/utils';
import { BigNumber } from '@/utils/bignumber';
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import { Theme } from '@mui/material/styles';

export default function Info() {
  const theme = useTheme() as Theme;
  const { loadings, indexCanisters, storageCanisters } = useICECanister(
    'sf467-nyaaa-aaaae-qajpq-cai',
  );

  const color =
    theme.palette.mode === 'dark' ? theme.colors.grey400 : theme.colors.grey600;
  return (
    <Box
      className="wrap"
      sx={{
        padding: 'var(--space-14)',
        flex: 1,
        display: 'flex',
        gap: 'var(--space-14)',
        flexDirection: 'column',
      }}
    >
      <MainCard title="Index Canisters">
        <TableWrapper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography whiteSpace="nowrap" sx={{ color }}>
                      Canister ID
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography whiteSpace="nowrap" sx={{ color }}>
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography whiteSpace="nowrap" sx={{ color }}>
                      Cycles
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography whiteSpace="nowrap" sx={{ color }}>
                      Memory Size
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography whiteSpace="nowrap" sx={{ color }}>
                      Module Hash
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography whiteSpace="nowrap" sx={{ color }}>
                      Status
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {indexCanisters?.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography copyable>
                        {item.canister_id.toString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{item.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {new BigNumber(item.status.cycles)
                          .div(1e12)
                          .toFormat(4)}{' '}
                        T
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {new BigNumber(item.status.memory_size)
                          .div(1024 * 1024)
                          .toFormat(2)}{' '}
                        MB
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {item.status.module_hash &&
                        item.status.module_hash.length > 0
                          ? bytesToHex(item.status.module_hash[0])
                          : ''}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography textTransform="capitalize">
                        {getKey(item.status.status)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TableWrapper>
        {loadings.index ? (
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
        ) : indexCanisters.length <= 0 ? (
          <>
            <NoData />
          </>
        ) : null}
      </MainCard>
      <MainCard title="Storage Canisters">
        <TableWrapper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography whiteSpace="nowrap" sx={{ color }}>
                      Canister ID
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography whiteSpace="nowrap" sx={{ color }}>
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography whiteSpace="nowrap" sx={{ color }}>
                      Cycles
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography whiteSpace="nowrap" sx={{ color }}>
                      Memory Size
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography whiteSpace="nowrap" sx={{ color }}>
                      Module Hash
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography whiteSpace="nowrap" sx={{ color }}>
                      Status
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {storageCanisters?.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography copyable>
                        {item.canister_id.toString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Storage {item.month.toString()}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {new BigNumber(item.status.cycles)
                          .div(1e12)
                          .toFormat(4)}{' '}
                        T
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {new BigNumber(item.status.memory_size)
                          .div(1024 * 1024)
                          .toFormat(2)}{' '}
                        MB
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {item.status.module_hash &&
                        item.status.module_hash.length > 0
                          ? bytesToHex(item.status.module_hash[0])
                          : ''}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography textTransform="capitalize">
                        {getKey(item.status.status)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TableWrapper>
        {loadings.storage ? (
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
        ) : storageCanisters.length <= 0 ? (
          <>
            <NoData />
          </>
        ) : null}
      </MainCard>
    </Box>
  );
}
