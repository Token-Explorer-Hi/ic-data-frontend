import Typography from '@/components/Typography';
import { Grid } from '@mui/material';

export interface TokenSourceProps {
  source: string;
  className?: string;
  borderRadius?: string;
  padding?: any;
  capitalize?: 'capitalize' | 'lowercase' | 'none';
}

export function TokenSource({
  source,
  className,
  borderRadius,
  padding,
  capitalize = 'none',
}: TokenSourceProps) {
  return (
    <Grid
      display="flex"
      sx={{
        padding: padding || {
          xs: 'var(--space-4) ',
          sm: 'var(--space-4) var(--space-4)',
        },
        background: 'var(--color-primary)',
        borderRadius: borderRadius || 'var(--space-4)',
        width: 'fit-content',
      }}
      className={className}
    >
      <Typography
        sx={{
          fontSize: {
            sm: 'var(--space-12)',
            xs: 'var(--space-8)',
          },
          color: 'white',
          whiteSpace: 'nowrap',
          textTransform: capitalize === 'capitalize' ? 'capitalize' : 'none',
        }}
      >
        {source}
      </Typography>
    </Grid>
  );
}
