import Typography from '@/components/Typography';
import { useGlobalSearch } from '@/hooks';
import { useRouter } from '@/hooks/useCustomRouter';
import { formatDollarAmount } from '@/utils';
import { Close } from '@mui/icons-material'; // Use MUI icons
import {
  Divider,
  Fade,
  Grid,
  IconButton,
  InputAdornment,
  InputProps,
  MenuItem,
  Popover,
  Select,
  Skeleton,
  TextField,
  useTheme,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Search } from 'react-feather';

import NoData from '@/components/NoData';
import useDebounce from '@/hooks/useDebounce';
import { TokenImage } from './Image';
import { AddressLink } from './Link/AddressLink';
import { TokenLink } from './Link/TokenLink';

enum Type {
  'Token' = 'Token',
  'Address' = 'Address',
  'AllFilters' = 'All Filters',
}
export interface GlobalSearchProps {
  width?: number;
}

export function GlobalSearch() {
  const theme = useTheme() as Theme;

  const [keyword, setKeyword] = useState<string>('');
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (wrapperRef && wrapperRef.current) {
      setWidth(wrapperRef.current.clientWidth);
    }
  }, [wrapperRef]);

  const handleInputChange = useCallback((value: string) => {
    setKeyword(value);
    setOpen(!!value);
  }, []);
  const debouncedValue = useDebounce(keyword, 600);
  const { loading, result } = useGlobalSearch(debouncedValue);
  const handleInputClick: InputProps['onClick'] = useCallback((event: any) => {
    event.stopPropagation();
  }, []);

  const handlePopoverClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
    },
    [],
  );

  const handleSearchClick = useCallback(
    (event: React.MouseEvent<SVGElement>) => {
      event.stopPropagation();
    },
    [],
  );

  const handleClearClick = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      event.stopPropagation();
      setKeyword('');
    },
    [setKeyword],
  );

  useEffect(() => {
    document.addEventListener('click', () => {
      setOpen(false);
    });

    return () => {
      document.removeEventListener('click', () => {
        setOpen(false);
      });
    };
  }, []);
  const handlePopoverClose = () => {
    setOpen(false);
  };

  const [show, setShow] = useState<Type>(Type.AllFilters);

  const handleShow = useCallback(
    (value: Type) => {
      setShow(value);
    },
    [show],
  );
  return (
    <Grid
      sx={{
        width: '100%',
        border:
          theme.palette.mode === 'dark'
            ? `var(--space-1) solid var(--gray-700)`
            : 'none',
        borderRadius: 'var(--space-4)',
      }}
      ref={wrapperRef}
    >
      <TextField
        fullWidth
        value={keyword}
        placeholder="Search by Address / Token"
        size="small"
        onChange={(event) => handleInputChange(event.target.value)}
        onClick={handleInputClick}
        InputProps={{
          startAdornment: (
            <>
              <Select
                value={show}
                onChange={(event) => handleShow(event.target.value as Type)}
              >
                <MenuItem value="All Filters">All Filters</MenuItem>
                <MenuItem value="Token">Token</MenuItem>
                <MenuItem value="Address">Address</MenuItem>
              </Select>
            </>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {keyword && (
                <IconButton onClick={handleClearClick} edge="end">
                  <Close />
                </IconButton>
              )}
              <IconButton onClick={(e: any) => handleSearchClick(e)} edge="end">
                <Search
                  style={{
                    width: 'var(--space-20)',
                    height: 'var(--space-20)',
                  }}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
        className="global-search-input"
      />
      <Popover
        open={open && !!width}
        anchorEl={wrapperRef.current}
        onClose={handlePopoverClose}
        sx={{
          width: '100%',
          maxWidth: '100%',
          minWidth: '100%',

          marginTop: 'var(--space-8)',
        }}
        TransitionComponent={Fade}
        transitionDuration={500}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
      >
        <div
          style={{
            minWidth: '300px',
            minHeight: 'var(--space-200)',
            padding: 'var(--space-10)',
            width: width || 'fit-content',
            maxWidth: '100%',
          }}
          onClick={handlePopoverClick}
        >
          {loading ? (
            <>
              <Skeleton height="var(--space-24)" />
              <Skeleton height="var(--space-24)" />
              <Skeleton height="var(--space-24)" />
              <Skeleton height="var(--space-24)" />
              <Skeleton height="var(--space-24)" />
              <Skeleton height="var(--space-24)" />
            </>
          ) : (result?.tokenList && result?.tokenList.length) ||
            (result?.addressList && result?.addressList.length) ? (
            <Grid
              display="flex"
              flexDirection="column"
              style={{
                width: '100%',
                overflow: 'auto',
                maxHeight: '420px',
                gap: 'var(--space-10)',
              }}
            >
              {result?.tokenList && result?.tokenList.length > 0 ? (
                <div
                  style={{
                    display:
                      show === Type.Token || show === Type.AllFilters
                        ? 'block'
                        : 'none',
                    width: '100%',
                  }}
                >
                  <Typography
                    variant="h5"
                    style={{ margin: '0 0 var(--space-14) 0' }}
                  >
                    Tokens
                  </Typography>
                  <Grid
                    display="flex"
                    flexDirection="column"
                    gap="var(--space-10) 0"
                    alignItems="start"
                  >
                    {result.tokenList.map((token: any) => (
                      <Grid
                        display="flex"
                        alignItems="center"
                        gap="0 var(--space-10)"
                        key={token.ledgerId}
                        style={{ width: '100%', cursor: 'pointer' }}
                        onClick={() => {
                          router.push(`/token/details/${token.ledgerId}`);
                        }}
                      >
                        <TokenImage tokenId={token.ledgerId} />
                        <Grid
                          display="flex"
                          flexDirection="column"
                          gap="var(--space-5)"
                        >
                          <Grid display="flex" gap="var(--space-5)">
                            <Typography>{token.symbol}</Typography>
                            <Typography>
                              {formatDollarAmount(token.priceUSD)}
                            </Typography>
                          </Grid>
                          <TokenLink id={token.ledgerId} shorten={false} />
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              ) : null}
              {result?.tokenList &&
              result?.tokenList.length &&
              result?.addressList &&
              result?.addressList.length &&
              show === Type.AllFilters ? (
                <Divider sx={{ width: '100%', margin: 'var(--space-10) 0' }} />
              ) : null}
              {result?.addressList && result?.addressList.length > 0 ? (
                <div
                  style={{
                    display:
                      show === Type.Address || show === Type.AllFilters
                        ? 'block'
                        : 'none',
                    width: '100%',
                  }}
                >
                  <Typography
                    variant="h5"
                    style={{ margin: '0 0 var(--space-14) 0' }}
                  >
                    Address
                  </Typography>
                  <Grid
                    display="flex"
                    flexDirection="column"
                    gap="var(--space-10)"
                    alignItems="start"
                  >
                    {result.addressList.map((address: any) => (
                      <AddressLink
                        key={address.principalId ?? address.accountId}
                        owner={address.principalId ?? address.accountId}
                        shorten={false}
                      />
                    ))}
                  </Grid>
                </div>
              ) : null}
            </Grid>
          ) : (
            <NoData />
          )}
        </div>
      </Popover>
    </Grid>
  );
}
