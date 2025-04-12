import {
  ClickAwayListener,
  Grid,
  Typography as MuiTypography,
  type TypographyProps as MuiTypographyProps,
  useTheme,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { RxCopy } from 'react-icons/rx';

export interface TypographyProps extends MuiTypographyProps {
  copyable?: boolean | string;
  copyText?: string;
}

function Typography({ children, copyText, ...props }: TypographyProps) {
  const theme = useTheme() as Theme;
  const [open, setOpen] = useState(false);
  const handleCopy = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (navigator.clipboard) {
      navigator.clipboard.writeText((copyText ?? children) as string);
    }
    setOpen(true);
  };

  const color = theme.colors?.darkPaper;
  return (
    <MuiTypography
      component="span"
      sx={{
        ...(props?.sx ?? {}),
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'text',
      }}
      display="flex"
      alignItems="center"
      gap="var(--space-4)"
      textTransform={props.textTransform}
      {...props}
    >
      {children}
      {(props.copyable === true || props.copyable === 'true') && (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Grid component="em" sx={{ cursor: 'pointer' }}>
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              placement="top"
              onClose={() => setOpen(false)}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title={
                <MuiTypography
                  fontStyle="normal"
                  sx={{
                    ...(props?.sx ?? {}),
                    WebkitTouchCallout: 'none',
                    WebkitUserSelect: 'text',
                    color,
                  }}
                >
                  Copy success
                </MuiTypography>
              }
            >
              <Grid component="i" onClick={handleCopy}>
                <RxCopy />
              </Grid>
            </Tooltip>
          </Grid>
        </ClickAwayListener>
      )}
    </MuiTypography>
  );
}

export default Typography;
