import Typography from '@/components/Typography';
import { NA } from '@/utils';
import BigNumber from 'bignumber.js';
import { ArrowUp } from 'react-feather';

export interface ProportionProps {
  value: bigint | number | string | undefined | null;
  align?: 'right' | 'left' | 'inherit' | 'center' | 'justify' | undefined;
  fontSize?: string;
  showArrow?: boolean;
  fontWeight?: number;
  bracket?: boolean;
}

function isUp(value: bigint | number | string | undefined | null) {
  return !!value && new BigNumber(Number(value)).isGreaterThan(0);
}

function isDown(value: bigint | number | string | undefined | null) {
  return !!value && new BigNumber(Number(value)).isLessThan(0);
}

function isZero(value: bigint | number | string | undefined | null) {
  return (
    (!!value || value === BigInt(0) || value === 0) &&
    new BigNumber(Number(value)).isEqualTo(0)
  );
}

enum ProportionType {
  UP = 'up',
  DOWN = 'down',
  EQUAL = 'equal',
}

const Colors = {
  [ProportionType.UP]: 'var(--color-success)',
  [ProportionType.DOWN]: '#D3625B',
  [ProportionType.EQUAL]: '#ffffff',
};

interface ProportionIconProps {
  type: ProportionType;
}

function ProportionIcon({ type }: ProportionIconProps) {
  return type === ProportionType.DOWN ? (
    <ArrowUp
      style={{
        transform: 'rotate(180deg)',
        width: 'var(--space-12)',
        height: 'var(--space-12)',
      }}
    />
  ) : type === ProportionType.UP ? (
    <ArrowUp style={{ width: 'var(--space-12)', height: 'var(--space-12)' }} />
  ) : null;
}

export function Proportion({
  value,
  fontSize,
  fontWeight,
  bracket,
  showArrow = true,
  ...props
}: ProportionProps) {
  const type = isUp(value)
    ? ProportionType.UP
    : isDown(value)
    ? ProportionType.DOWN
    : ProportionType.EQUAL;
  const proportion = isZero(value)
    ? '0.00%'
    : value
    ? `${new BigNumber(Number(value)).toFixed(2)}%`
    : undefined;
  return (
    <Typography
      style={{
        fontWeight: fontWeight ?? 500,
        fontSize: fontSize ?? '--font-size',
        color: Colors[type],
        gap: 0,
      }}
    >
      {proportion ? (
        <>
          {bracket ? <>(</> : null}
          {showArrow ? <ProportionIcon type={type} /> : null} {proportion}
          {bracket ? <>)</> : null}
        </>
      ) : (
        NA
      )}
    </Typography>
  );
}
