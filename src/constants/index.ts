export const ASSETS_DECIMALS = 2;
export const ICP_BALANCE_DECIMALS = 4;
export const ICS_BALANCE_DECIMALS = 2;
export const MAX_TOKEN_MINT_NAME_LENGTH = 30;
export const MAX_TOKEN_MINT_SYMBOL_LENGTH = 15;

export const NONE_PRICE_SYMBOL = 'N/A';
export const DEFAULT_PERCENT_SYMBOL = '0.00%';
export const TOKEN_AMOUNT_DISPLAY_DECIMALS = 8;
export const NONE_TOKEN_SYMBOL = 'N/A';
export const EMPTY_CONTENT_SYMBOL = 'N/A';

export const REACT_GA_TRACKING_ID = 'UA-200662567-2';

export const MINT_TOKEN_CYCLES = 1860000000000;

export const MINT_NFT_PAY_MOUNT = 10;
export const NFT_UPLOAD_FILES = [
  'image',
  'video',
  'audio',
  'txt',
  'js',
  'ts',
  'pdf',
  'json',
  'ppt',
  'pptx',
  'xls',
  'xlsx',
  'docx',
  'doc',
];

export const CurrencyAmountFormatDecimals = (
  decimals: number | bigint | undefined,
) => {
  if (!decimals) return TOKEN_AMOUNT_DISPLAY_DECIMALS;
  if (Number(decimals) > TOKEN_AMOUNT_DISPLAY_DECIMALS)
    return TOKEN_AMOUNT_DISPLAY_DECIMALS;
  return Number(decimals);
};

export const DAYJS_FORMAT = 'MM/DD/YYYY HH:mm:ss';

export const AnonymousPrincipal = '2vxsx-fae';

export const MaxInt64 = (2 ** 64 - 1).toString();
export const APPROVE_MAX_NUMBER = Number.MAX_VALUE;

export const SAFE_INTEGER_LENGTH = 12;
export const SAFE_DECIMALS_LENGTH = 8;
export const MAX_SWAP_INPUT_LENGTH = 25;

export const NONE_SUB_HEX =
  '0000000000000000000000000000000000000000000000000000000000000000';

export * from './canister';
export * from './server';
export * from './types';

export * from './constants';
export * from './date';
export * from './host';
