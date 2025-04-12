import { Box, Grid, Theme, useTheme } from '@mui/material';
import moment, { Moment } from 'moment';
import type { RangePickerProps } from 'rc-picker';
import { RangePicker } from 'rc-picker';
import generateConfig from 'rc-picker/lib/generate/moment';
import enUS from 'rc-picker/lib/locale/en_US';
import { useRef, useState } from 'react';

const DIFF_TIME = 90 * 24 * 3600;

export default function ICExplorerDayPicker({
  callback,
  sx,
}: {
  callback?: (range: { from: Date; to: Date }) => void;
  sx?: object;
}) {
  const theme = useTheme() as Theme;
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<Moment | null>(
    null,
  );

  // Range picker change handler
  const handleRangeChange: RangePickerProps<Moment>['onChange'] = (dates) => {
    if (dates && dates[0] && dates[1]) {
      const range = {
        from: dates[0].toDate(),
        to: dates[1].endOf('day').toDate(),
      };
      callback?.(range);
    }
    setSelectedStartDate(dates?.[0] || null);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{ position: 'relative', ...sx }}
      ref={wrapperRef}
    >
      <Grid
        display="flex"
        alignItems="center"
        sx={{
          borderRadius: 'var(--space-8)',
          gap: 'var(--space-8)',
          border: `var(--space-1) solid ${
            theme.palette.mode === 'dark'
              ? 'var(--gray-700)'
              : 'var(--border-color)'
          }`,
          backgroundColor: 'var(--color-surface-02)',
          '&:hover': {
            backgroundColor: 'var(--color-surface-03)',
          },
        }}
      >
        <RangePicker<Moment>
          defaultValue={[moment().subtract(DIFF_TIME, 'seconds'), moment()]}
          onChange={handleRangeChange}
          allowClear={false}
          format="YYYY-MM-DD"
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: theme.palette.mode === 'dark' ? 'white' : 'black',
          }}
          locale={enUS}
          generateConfig={generateConfig}
          separator="~"
          prefixCls="rc-picker"
        />
      </Grid>
    </Box>
  );
}
