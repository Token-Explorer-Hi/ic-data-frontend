import Typography from '@/components/Typography';
import { Button, Checkbox, Grid, Menu, TextField } from '@mui/material';
import { useCallback, useState } from 'react';
import { FiFilter } from 'react-icons/fi';

export interface TableFilterProps {
  values: { key: string; value: string }[];
  onFilter:
    | ((values: string[]) => void)
    | ((value: string | undefined) => void);
  close?: () => void;
  /**
   * If true, allows multiple selections. If false, only single selection is allowed
   * @default true
   */
  multiple?: boolean;
}

const isKeySelected = (
  value: string[] | string | undefined,
  key: string,
): boolean => {
  if (!value) return false;
  if (Array.isArray(value)) {
    return value.includes(key);
  }
  return value === key;
};

const hasSelection = (value: string[] | string | undefined): boolean => {
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  if (typeof value === 'string') {
    return value !== '';
  }
  return false;
};

export function TableFilter({
  values,
  onFilter,
  close,
  multiple = true,
}: TableFilterProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedTypes, setSelectedTypes] = useState<
    string[] | string | undefined
  >(undefined);
  const [searchText, setSearchText] = useState<string>('');
  const handleCheckboxChange = useCallback(
    (key: string, checked: boolean) => {
      if (multiple) {
        const currentSelected = Array.isArray(selectedTypes)
          ? selectedTypes
          : [];
        if (checked) {
          setSelectedTypes([...new Set([...currentSelected, key])]);
        } else {
          const index = currentSelected.indexOf(key);
          if (index !== -1) {
            const newSelectedTypes = [...currentSelected];
            newSelectedTypes.splice(index, 1);
            setSelectedTypes(newSelectedTypes);
          }
        }
      } else {
        const newValue = checked ? key : undefined;
        setSelectedTypes(newValue);
        (onFilter as (value: string | undefined) => void)(newValue);
        if (checked) {
          handleClose();
        }
      }
    },
    [multiple, selectedTypes, setSelectedTypes, onFilter],
  );

  const handleReset = useCallback(() => {
    setSelectedTypes(multiple ? [] : undefined);
  }, [multiple]);

  const handleOk = useCallback(() => {
    if (multiple) {
      (onFilter as (values: string[]) => void)(
        Array.isArray(selectedTypes) ? selectedTypes : [],
      );
    } else {
      (onFilter as (value: string | undefined) => void)(
        typeof selectedTypes === 'string' && selectedTypes !== ''
          ? selectedTypes
          : undefined,
      );
    }
    if (close) close();
  }, [multiple, selectedTypes, onFilter]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSearchText('');
  };
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={hasSelection(selectedTypes) ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={hasSelection(selectedTypes) ? 'true' : undefined}
        onClick={handleClick}
        sx={{ padding: '0 var(--space-4)', minWidth: 'auto' }}
        color="inherit"
      >
        <FiFilter
          style={{
            width: 'var(--space-16)',
            padding: 0,
            color: hasSelection(selectedTypes)
              ? 'var(--color-primary)'
              : undefined,
          }}
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Grid
          display="flex"
          sx={{
            padding: 'var(--space-8) var(--space-8) 0',
          }}
          onKeyDown={(e: any) => e.stopPropagation()}
          flexDirection="column"
          role="group"
        >
          <TextField
            size="small"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearchChange}
            fullWidth
            variant="outlined"
            sx={{ mb: 'var(--space-8)' }}
          />
        </Grid>
        <Grid
          display="flex"
          sx={{
            padding: '0 var(--space-8) var(--space-8)',
            maxHeight: '220px',
            overflow: 'auto',
          }}
          gap="var(--space-4) 0"
          flexDirection="column"
        >
          {values
            .filter(
              (ele) =>
                ele.value.toLowerCase().includes(searchText.toLowerCase()) ||
                ele.key.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((ele) => (
            <Grid
              display="flex"
              key={ele.key}
              gap="0 var(--space-4)"
              style={{ cursor: 'pointer' }}
              onClick={() =>
                handleCheckboxChange(
                  ele.key,
                  !isKeySelected(selectedTypes, ele.key),
                )
              }
            >
              <Checkbox
                checked={isKeySelected(selectedTypes, ele.key)}
                onChange={(e) =>
                  handleCheckboxChange(ele.key, e.target.checked)
                }
              />
              <Typography>{ele.value}</Typography>
            </Grid>
          ))}
          {values.filter(
            (ele) =>
              ele.value.toLowerCase().includes(searchText.toLowerCase()) ||
              ele.key.toLowerCase().includes(searchText.toLowerCase())
          ).length === 0 && (
            <Typography
              sx={{
                textAlign: 'center',
                color: 'var(--color-text-secondary)',
                py: 'var(--space-8)',
              }}
            >
              No results found
            </Typography>
          )}
        </Grid>
        {multiple ? (
          <Grid
            display="flex"
            justifyContent="space-between"
            sx={{
              padding: '0',
              borderTop:
                'var(--line-width) var(--line-type) var(--color-border)',
            }}
          >
            <Button
              component="a"
              href="#"
              size="small"
              disabled={!hasSelection(selectedTypes)}
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button color="primary" size="small" onClick={handleOk}>
              Confirm
            </Button>
          </Grid>
        ) : null}
      </Menu>
    </div>
  );
}
