import Typography from '@/components/Typography';
import { Button, CircularProgress, useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { PiDownload } from 'react-icons/pi';

export default function DownloadPageButton({
  onClick,
  loading,
}: {
  onClick: () => void;
  loading?: boolean;
}) {
  const theme = useTheme() as Theme;
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      disabled={loading}
      sx={{
        borderColor:
          theme.palette.mode === 'dark'
            ? 'var(--gray-700)!important'
            : 'var(--border-color)!important',
        padding: 'var(--space-8)!important',
        height: {
          sx: 'var(--space-24)!important',
          sm: 'var(--space-32)!important',
        },
        width: 'auto',
        flexShrink: 1,
      }}
    >
      {loading ? (
        <CircularProgress color="inherit" size={20} />
      ) : (
        <>
          <PiDownload
            style={{
              fill:
                theme.palette.mode === 'dark'
                  ? theme.palette.text.secondary
                  : '#757575',
              marginRight: 'var(--space-8)',
            }}
          />
          <Typography sx={{ whiteSpace: 'nowrap' }}>
            Download Page Data
          </Typography>
        </>
      )}
    </Button>
  );
}
