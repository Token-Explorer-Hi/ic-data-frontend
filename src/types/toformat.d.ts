declare module 'toformat' {
  export default function toFormat<T>(constructor: { new (...args: any[]): T }): {
    new (...args: any[]): T & {
      format(decimals?: number): string;
      toFormat(decimals?: number): string;
    };
  };
}
