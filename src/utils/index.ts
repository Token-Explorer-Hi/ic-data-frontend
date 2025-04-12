/* eslint-disable no-extend-native */

import { explorerLink, toSignificant } from '@/utils';
import BigNumber from 'bignumber.js';
import JSBI from 'jsbi';

export const NA = 'N/A'; // Not Applicable or Not Available

(BigInt as any).prototype.toJSON = function toJSON() {
  return this.toString();
};

// avoid scientific notation when use toString
BigNumber.set({ EXPONENTIAL_AT: 10 ** 9 });

BigNumber.config({
  ROUNDING_MODE: BigNumber.ROUND_DOWN,
});

export const NO_GROUP_SEPARATOR_FORMATTER = {
  groupSeparator: '',
};

export { JSBI };

export function isDarkTheme(theme: any): boolean {
  return theme.customization.mode === 'dark';
}

export function isICPSwapOfficial(account: string | undefined): boolean {
  return (
    account ===
      'b2b33b29fa0f9458ec7ba0025f6a53126043fad143dd17619d5f162f41e69869' ||
    account ===
      'e695fda51d898ad6f46211d8f468f85dd1364819e52c7740e4b4db90918ea6bc' ||
    account ===
      'fbe00b464da19fc7bf234cf05e376631ad896163558174c375f6e9be96d95e95' ||
    account ===
      '1ce94412fa0ad3b93132c651105d86e17bb87bafc78e9010a9e24a47a98e5b03' ||
    account ===
      '9b0812ed39fe6e63c442d7a81672c0c2568ce10011dffc0e50a635250ff6967f'
  );
}

export function mockALinkAndOpen(url: string, id: string): void {
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('target', '_blank');
  a.setAttribute('id', id);
  if (!document.getElementById(id)) {
    document.body.appendChild(a);
  }
  a.click();
}

export function getExplorerPrincipalLink(principalId: string): string {
  return explorerLink(principalId);
}

export function getExplorerAccountLink(account: string): string {
  return `https://dashboard.internetcomputer.org/account/${account}`;
}

export function openBase64ImageInNewWindow(base64String: string) {
  const image = new Image();
  image.src = base64String;

  const win = window.open('');
  win?.document.write(image.outerHTML);
}

export function stringToArrayBuffer(string: string): Uint8Array {
  return new TextEncoder().encode(string);
}

export function arrayBufferToString(arrayBuffer: Uint8Array): string {
  return new TextDecoder('utf-8').decode(arrayBuffer);
}

export type CountingTime = {
  hour: string | number;
  min: string | number;
  sec: string | number;
};

export function toDoubleNumber(string: number | string) {
  const newString = String(string);

  if (newString.length < 2) {
    return `0${newString}`;
  }

  return string;
}

export function counter(time: string | number | Date): CountingTime {
  const now = new Date().getTime();
  const end = new Date(time).getTime();

  const diff = end - now;

  if (diff <= 0) {
    return {
      hour: '00',
      min: '00',
      sec: '00',
    };
  }

  const sec = parseInt(String((diff / 1000) % 60));
  const min = parseInt(String((diff / (60 * 1000)) % 60));
  const hour = parseInt(String(diff / (60 * 60 * 1000)));

  return {
    hour: toDoubleNumber(hour),
    min: toDoubleNumber(min),
    sec: toDoubleNumber(sec),
  };
}

export function toFormat(value: string | number | BigNumber | undefined) {
  if (value === undefined) return '';
  return new BigNumber(value).toFormat();
}

export function toSignificantFormatted(val: number | string, dig = 8) {
  return toSignificant(val, dig, { groupSeparator: ',' });
}

export function isHouseUserTokenTransactions(
  canisterId: string,
  principal: string,
) {
  return `https://637g5-siaaa-aaaaj-aasja-cai.raw.ic0.app/address/${canisterId}${
    principal ? `/${principal}` : ''
  }`;
}

export function timeParser(time: any): Date {
  const date = new Date(time);
  const seconds = date.getSeconds();
  return new Date(date.getTime() - seconds * 1000);
}

export function getPageSize(initSize = 10) {
  let size = initSize;
  if (window) {
    if (window.innerHeight > 1400) {
      size += 5;
    } else if (window.innerHeight > 1600) {
      size += 10;
    } else if (window.innerHeight > 2000) {
      size += 11;
    }
  }
  return size;
}
export function getKey(data: any) {
  return data ? Object.keys(data)[0] : '';
}

export function bytesToHex(bytes: number[] | Uint8Array | undefined): string {
  if (!bytes || !bytes.length) return '';
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export const getFirstNonZeroDecimalPosition = (num: number): number => {
  const decimalPart = String(num).split('.')[1];
  if (!decimalPart) return 2;
  for (let i = 0; i < decimalPart.length; i++) {
    if (decimalPart[i] !== '0') {
      return i + 2;
    }
  }
  return 2;
};

export * from './transactionTypeFormatter';
export * from './type';

export * from './availableArgsNull';
export * from './bignumber';
export * from './classes';
export * from './converter';
export * from './date';
export * from './enumToString';
export * from './explorerLink';
export * from './fetch';
export * from './formatPercentage';
export * from './global';
export * from './ic';
export * from './isAvailablePageArgs';
export * from './isBigIntMemo';
export * from './isNullArgs';
export * from './isPrincipal';
export * from './isValidAccount';
export * from './isValidPrincipal';
export * from './mockALink';
export * from './nowInSeconds';
export * from './number';
export * from './numberToString';
export * from './pageArgsFormat';
export * from './principalToAccount';
export * from './principalToSubHex';
export * from './resultFormat';
export * from './shorten';
export * from './sleep';
export * from './time';
export * from './tokenAmount';
export * from './toSignificant';
export * from './unixToDate';
export * from './xlsx';
