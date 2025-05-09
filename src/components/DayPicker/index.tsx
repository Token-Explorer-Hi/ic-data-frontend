import { Box, Grid, Theme, useTheme } from '@mui/material';
import moment, { Moment } from 'moment';
import type { RangePickerProps } from 'rc-picker';
import { RangePicker } from 'rc-picker';
import generateConfig from 'rc-picker/lib/generate/moment';
import enUS from 'rc-picker/lib/locale/en_US';
import { useRef, useState, useEffect } from 'react';

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
  // Store the selected date range
  const [selectedRange, setSelectedRange] = useState<[Moment, Moment]>(
    [moment().subtract(DIFF_TIME, 'seconds'), moment()]
  );

  // Range picker change handler
  const handleRangeChange: RangePickerProps<Moment>['onChange'] = (dates) => {
    if (dates && dates[0] && dates[1]) {
      // Create initial range
      let from = dates[0];
      let to = dates[1].endOf('day');
      
      // Calculate the time difference in seconds
      const diffInSeconds = (to.valueOf() - from.valueOf()) / 1000;
      
      // If the range is greater than DIFF_TIME (3 months), adjust the from date
      if (diffInSeconds > DIFF_TIME) {
        // Set the from date to be 3 months before the to date
        from = moment(to).subtract(DIFF_TIME, 'seconds');
      }
      
      // Update the displayed date range
      setSelectedRange([from, to]);
      
      // Call the callback with the adjusted date range
      const range = {
        from: from.toDate(),
        to: to.toDate(),
      };
      callback?.(range);
    } else if (dates && dates[0]) {
      // Only start date selected
      setSelectedRange([dates[0], selectedRange[1]]);
    } else if (dates && dates[1]) {
      // Only end date selected
      setSelectedRange([selectedRange[0], dates[1]]);
    }
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
          value={selectedRange}
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
