import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

import NoData from "@/components/no-data";
import Typography from "@/components/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Grid, Menu, MenuItem, TextField } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

interface UseStylesProps {
  contained: boolean;
  fullHeight?: boolean;
  borderRadius: string;
  label: boolean;
  border?: string | boolean;
  multiline?: boolean;
  background?: string | "level3";
}

const useStyles = ({
  contained,
  background,
  fullHeight,
  multiline,
  borderRadius,
  label,
  border,
}: UseStylesProps) => {
  return makeStyles((theme: Theme) => {
    return {
      inputBox: {
        display: label && contained ? "block" : "flex",
        alignItems: "center",
        border: contained
          ? border ?? theme.palette.border.normal
          : border === true
          ? theme.palette.border.normal
          : border === "border0"
          ? theme.palette.border.border0
          : "none",
        background: background
          ? background === "level3"
            ? theme.palette.background.level3
            : background
          : theme.palette.background.level4,
        borderRadius,
        padding: contained ? `var(--space-7) var(--space-12)` : "var(--space-3) var(--space-12)",
        gap: "0 var(--space-5)",
        height: contained || multiline ? "auto" : fullHeight ? "100%" : "var(--space-48)",
        ...(multiline ? { minHeight: "var(--space-48)" } : {}),
        margin: label ? "var(--space-12) 0 0 0" : "0",
        "@media(max-width: 640px)": {
          padding: contained ? `var(--space-4) var(--space-6)` : "0 var(--space-6)",
        },
        "& input": {
          color: theme.palette.text.primary,
        },
        "&:hover": {
          borderColor: "#ffffff",
        },
      },
    };
  });
};

export type FilledTextFiledMenus = {
  label: string;
  value: any;
};

export interface FilledTextFieldProps {
  label?: string | React.ReactNode;
  value?: any;
  select?: boolean;
  onChange?: (value: any) => void;
  onFocus?: () => void;
  required?: boolean;
  menus?: FilledTextFiledMenus[];
  maxWidth?: number;
  fullHeight?: boolean;
  disabled?: boolean;
  InputProps?: any;
  contained?: boolean;
  CustomNoData?: React.ReactNode;
  placeholder?: string;
  type?: string;
  menuDisabled?: (value: FilledTextFiledMenus) => boolean;
  helperText?: string;
  multiline?: boolean;
  borderRadius?: string;
  border?: string | boolean;
  labelSize?: string;
  fontSize?: string;
  placeholderSize?: string;
  background?: string;
  [x: string]: any;
}

export interface FilledTextFieldLabelProps {
  label?: React.ReactNode;
  required?: boolean;
  labelSize?: string;
}

export function FilledTextFieldLabel({
  label,
  required,
  labelSize = "var(--space-16)",
}: FilledTextFieldLabelProps) {
  return (
    <Box>
      {required && (
        <Typography sx={{ color: "#D3625B" }} fontSize={labelSize}>
          *
        </Typography>
      )}

      <Typography fontSize={labelSize}>{label}</Typography>
    </Box>
  );
}

interface ValueProps {
  helperText?: string;
  select?: boolean;
  value?: any;
  menus?: FilledTextFiledMenus[];
}

function Value({ select, value, menus = [], helperText }: ValueProps) {
  return (
    <>
      <Typography
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        color="textPrimary"
      >
        {select ? menus.filter((menu) => menu.value === value)[0]?.label ?? value : value}
      </Typography>
      {helperText ? (
        <Typography
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            marginTop: "var(--space-4)",
          }}
        >
          {helperText}
        </Typography>
      ) : null}
    </>
  );
}

function FilledTextField(
  {
    label,
    value,
    select,
    onChange,
    required,
    menus = [],
    maxWidth,
    fullHeight,
    disabled,
    InputProps,
    borderRadius = "var(--space-8)",
    contained = false,
    CustomNoData,
    menuDisabled,
    helperText,
    multiline,
    onFocus,
    border,
    background,
    labelSize,
    ...props
  }: FilledTextFieldProps,
  ref: any
) {
  const classes = useStyles({
    contained,
    background,
    fullHeight,
    borderRadius,
    border,
    label: !!label,
    multiline,
  })();
  const [anchorEl, setAnchorEl] = useState(null);
  const inputRef = useRef<HTMLElement | null>(null);
  const outerBoxRef = useRef<HTMLElement | null>(null);
  const [menuWidth, setMenuWidth] = useState<number | undefined>(undefined);

  const handleOuterBoxClick = (event: any) => {
    if (disabled) return;
    if (select) {
      setAnchorEl(event.currentTarget);
    } else {
      inputRef?.current?.focus();
    }
  };

  const focus = () => {
    inputRef?.current?.focus();
  };

  useImperativeHandle(
    ref,
    () => ({
      focus,
    }),
    [focus]
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const width = outerBoxRef?.current?.clientWidth;
    setMenuWidth(width ?? undefined);
  }, []);

  const handleMenuItemClick = ({ value }: { value: any }) => {
    if (onChange) onChange(value);
    setAnchorEl(null);
  };

  return (
    <Box>
      {label ? (
        <FilledTextFieldLabel required={required} label={label} labelSize={labelSize} />
      ) : null}
      <Box
        ref={outerBoxRef}
        className={classes.inputBox}
        sx={{
          ...(fullHeight ? { height: "100%" } : {}),
          ...(select ? { cursor: "pointer" } : {}),
          ...(maxWidth ? { maxWidth: `${maxWidth}px` } : {}),
        }}
        onClick={handleOuterBoxClick}
      >
        <>
          {contained && (
            <FilledTextFieldLabel required={required} label={label} labelSize={labelSize} />
          )}
          <Grid container alignItems="center" sx={{ flex: 1 }}>
            <Grid item xs>
              {!select ? (
                <TextField
                  sx={{
                    "& input": {
                      fontSize: props.fontSize ?? "var(--space-16)",
                    },
                    "& textarea": {
                      fontSize: props.fontSize ?? "var(--space-16)",
                    },
                    "& input::placeholder": {
                      fontSize: props.placeholderSize ?? "var(--space-16)",
                    },
                    "& textarea::placeholder": {
                      fontSize: props.placeholderSize ?? "var(--space-16)",
                    },
                  }}
                  inputRef={inputRef}
                  {...props}
                  variant="standard"
                  onChange={({ target: { value } }) => onChange && onChange(value)}
                  value={value}
                  multiline={multiline}
                  InputProps={{
                    disableUnderline: true,
                    ...(InputProps || {}),
                  }}
                  fullWidth
                  disabled={disabled}
                  helperText={helperText}
                  onFocus={onFocus}
                  autoComplete="off"
                />
              ) : value ? (
                <Value menus={menus} value={value} helperText={helperText} select={select} />
              ) : (
                <Typography
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  color="#c5c5c5"
                >
                  {props.placeholder}
                </Typography>
              )}
            </Grid>
            {select && <KeyboardArrowDownIcon sx={{ cursor: "pointer" }} />}
          </Grid>
        </>
      </Box>

      {Boolean(anchorEl) && (
        <Menu
          className="custom-select"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          PaperProps={{
            style: {
              width: menuWidth,
              transform: "translateY(var(--space-10))",
            },
          }}
        >
          {menus.map((menu, index) => (
            <MenuItem
              key={menu.value + index}
              className={`${!!menuDisabled && menuDisabled(menu) ? "disabled" : ""}`}
              onClick={() => {
                if (!!menuDisabled && menuDisabled(menu)) return;
                handleMenuItemClick(menu);
              }}
            >
              {menu.label}
            </MenuItem>
          ))}
          {menus.length === 0 ? CustomNoData || <NoData /> : null}
        </Menu>
      )}
    </Box>
  );
}

export default forwardRef(FilledTextField);
