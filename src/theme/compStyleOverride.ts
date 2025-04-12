import { isDarkTheme } from '@/utils/index';
import { keyframes } from '@mui/material';
import { customizeBreakPoints } from './customizeThemeBreakpoints';

export function componentStyleOverrides(theme: { [key: string]: any }) {
  const isDark = isDarkTheme(theme);

  const globalButtonBackground = theme.colors.lightPrimaryMain;

  const menuHoverBackground = isDark
    ? theme.menuSelectedBack
    : theme.colors.lightLevel2;

  const CircularProgressKeyframes0 = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `;

  const CircularProgressKeyframes1 = keyframes`
    0% {
      stroke-dasharray: var(--space-1),var(--space-200);
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: var(--space-100),var(--space-200);
      stroke-dashoffset: var(---space-14);
    }
    100% {
      stroke-dasharray: var(--space-100),var(--space-200);
      stroke-dashoffset: var(---space-124);
    }
  `;

  return {
    MuiTypography: {
      styleOverrides: {
        root: {
          lineHeight: 1,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 'var(--space-8)',
          textTransform: 'none' as const,
          // "&.MuiButton-contained": {
          //   // background: globalButtonBackground,
          //   "&:hover": {
          //     background: isDark ? theme.colors.grey700 : theme.colors.grey300,
          //   },
          //   ".Mui-disabled": {
          //     background: isDark ? theme.colors.grey700 : theme.colors.grey300,
          //   },
          // },
          '&.MuiButton-outlinedPrimary': {
            color: isDark
              ? theme.colors.secondaryMain
              : theme.colors.lightPrimaryMain,
            borderColor: isDark
              ? theme.colors.secondaryMain
              : theme.colors.lightPrimaryMain,
            padding: 'var(--space-0) var(--space-8)',
            minWidth: 'var(--space-64)',
            '&:hover': {
              background: 'rgba(86, 105, 220, 0.1)',
            },
          },
          '&.MuiButton-contained.Mui-disabled': {
            ...(isDark
              ? {
                  background: '#4F5A84',
                }
              : {
                  color: '#9E9E9E',
                  background: isDark
                    ? theme.colors.grey700
                    : theme.colors.grey300,
                }),
          },
        },
        containedPrimary: {
          background: globalButtonBackground,
          color: 'white',
        },
        containedInherit: {
          background: isDark ? theme.colors.grey700 : theme.colors.grey300,
          color: 'inherit',
          '&:hover': {
            background: isDark ? theme.colors.grey800 : theme.colors.grey400,
          },
        },
        containedSecondary: {
          background: isDark ? theme.colors.darkLevel4 : '#EFEFFF',
          color: isDark ? '#ffffff' : theme.colors.primaryMain,
          border: 'var(--space-1) solid #5569DB',
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: isDark
            ? theme.colors.darkMainBackground
            : theme.colors.paper,
          border: isDark ? 'var(--space-1) solid var(--gray-700)' : 'none',
          // Date pick button
          '&.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation8': {
            '& .MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium':
              {
                '&:hover': {
                  backgroundColor: theme.colors.primaryMain,
                },
                '& .MuiTypography-caption': {
                  color: '#fff',
                },
              },
          },
        },
        rounded: {
          borderRadius: `${theme.borderRadius}px`,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          color: theme.colors.textDark,
          padding: 'var(--space-24)',
          [customizeBreakPoints.down('sm')]: {
            padding: '1.1428571429rem',
          },
        },
        title: {
          fontSize: 'var(--space-18)',
          [customizeBreakPoints.down('sm')]: {
            fontSize: '1.1428571429rem',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 'var(--space-24)',
          '&:last-of-type': {
            [customizeBreakPoints.down('sm')]: {
              paddingBottom: 'var(--space-12)',
            },
          },
          [customizeBreakPoints.down('sm')]: {
            padding: 'var(--space-12)',
          },
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: 'var(--space-24)',
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          transform: 'scale(1, 0.9)',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          alignItems: 'center',
        },
        outlined: {
          border: 'var(--space-1) dashed',
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&.radius-12': {
            borderRadius: 'var(--space-12)',
          },
          '&.MuiListItem-root': {
            color: theme.textSecondary,
            paddingTop: 'var(--space-10)',
            paddingBottom: 'var(--space-10)',
            backgroundColor: theme.menuBackground,
            '&.Mui-selected': {
              color: theme.textPrimary,
              backgroundColor: menuHoverBackground,
              '&:hover': {
                backgroundColor: menuHoverBackground,
              },
              '& .MuiListItemIcon-root': {
                color: theme.textPrimary,
              },
            },
            '&:hover': {
              backgroundColor: menuHoverBackground,
              color: theme.textPrimary,
              '& .MuiListItemIcon-root': {
                color: theme.textPrimary,
              },
            },
          },

          // sidebar menu
          '&.MuiListItem-root&.sidebar': {
            color: theme.textPrimary,
            paddingTop: 'var(--space-10)',
            paddingBottom: 'var(--space-10)',
            marginBottom: 'var(--space-5)',
            paddingLeft: '0px',
            '&:last-of-type': {
              marginBottom: 0,
            },
            '& .MuiSvgIcon-root': {
              color: isDark ? theme.darkTextPrimary : theme.darkTextSecondary,
            },
            '&.Mui-selected, &:hover': {
              color: theme.menuSelected,
              background: globalButtonBackground,
              '& .MuiListItemIcon-root': {
                color: theme.menuSelected,
              },
              '& .MuiSvgIcon-root': {
                color: theme.menuSelected,
              },
            },
          },
          '&.MuiListItem-root&.sub': {
            color: theme.textPrimary,
            paddingTop: 'var(--space-6)',
            paddingBottom: 'var(--space-6)',
            paddingLeft: '0px',
            background: 'transparent',
            '& .MuiSvgIcon-root': {
              color: isDark ? theme.darkTextPrimary : theme.darkTextSecondary,
            },
            '&.Mui-selected, &:hover': {
              color: theme.menuSelected,
              background: 'transparent',
              '& .MuiListItemIcon-root': {
                color: theme.menuSelected,
              },
              '& .MuiSvgIcon-root': {
                color: theme.colors.darkSecondaryMain,
              },
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: theme.textPrimary,
          minWidth: 'var(--space-36)',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: theme.textDark,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: theme.textDark,
          '&::placeholder': {
            color: theme.textSecondary,
            fontSize: '0.875rem',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: isDark
            ? theme.colors.darkBackground
            : theme.colors.grey50,
          borderRadius: `${theme.borderRadius}px`,
          paddingLeft: 0,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor:
              theme.customization.mode === 'dark'
                ? theme.colors.textPrimary + 28
                : theme.colors.lightGray200,
          },
          '&:hover $notchedOutline': {
            borderColor: theme.colors.primaryLight,
          },
          '&.MuiInputBase-multiline': {
            padding: 1,
          },
        },
        input: {
          fontWeight: 500,
          background: isDark
            ? theme.colors.darkBackground
            : theme.colors.grey50,
          padding: 'var(--space-16) var(--space-14)',
          borderRadius: `${theme.borderRadius}px`,
          '&.MuiInputBase-inputSizeSmall': {
            padding: 'var(--space-10) var(--space-14)',
            '&.MuiInputBase-inputAdornedStart': {
              paddingLeft: 0,
            },
          },
        },
        inputAdornedStart: {
          paddingLeft: 4,
        },
        notchedOutline: {
          borderRadius: 0,
          border: 0,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: isDark
              ? theme.colors.textPrimary + 50
              : theme.colors.grey300,
          },
        },
        mark: {
          backgroundColor: theme.paper,
          width: 'var(--space-4)',
        },
        valueLabel: {
          color: theme.colors.primaryMain,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiAutocomplete-tag': {
            background: isDark
              ? theme.colors.textPrimary + 20
              : theme.colors.secondaryLight,
            borderRadius: 4,
            color: theme.textDark,
            '.MuiChip-deleteIcon': {
              color: isDark
                ? theme.colors.textPrimary + 80
                : theme.colors.secondary200,
            },
          },
        },
        popper: {
          borderRadius: `${theme.borderRadius}px`,
          boxShadow: {
            xs: '0px var(--space-8) var(--space-10) -5px rgb(0 0 0 / 20%), 0px var(--space-16) var(--space-24) var(--space-2) rgb(0 0 0 / 14%), 0px var(--space-6) var(--space-30) var(--space-6) rgb(0 0 0 / 12%)',
            sm: '0px var(--space-8) var(--space-10) -0.3571428571rem rgb(0 0 0 / 20%), 0px var(--space-16) var(--space-24) var(--space-2) rgb(0 0 0 / 14%), 0px var(--space-6) var(--space-30) var(--space-6) rgb(0 0 0 / 12%)',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: theme.divider,
          opacity: isDark ? 0.2 : 1,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          '&:focus': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        select: {
          fontSize: 'var(--space-28)',
        },
        root: {
          padding: 0,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: isDark
            ? theme.colors.darkMainBackground
            : theme.colors.primaryDark,
          background: isDark ? theme.textPrimary : theme.colors.primary200,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-deletable .MuiChip-deleteIcon': {
            color: 'inherit',
          },
        },
      },
    },
    MuiTimelineContent: {
      styleOverrides: {
        root: {
          color: theme.textDark,
          fontSize: 'var(--space-16)',
        },
      },
    },
    MuiTreeItem: {
      styleOverrides: {
        label: {
          marginTop: 14,
          marginBottom: 14,
        },
      },
    },
    MuiTimelineDot: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiInternalDateTimePickerTabs: {
      styleOverrides: {
        tabs: {
          backgroundColor: isDark
            ? theme.colors?.darkPaper
            : theme.colors.primaryLight,
          '& .MuiTabs-flexContainer': {
            borderColor: isDark
              ? theme.colors.textPrimary + 20
              : theme.colors.primary200,
          },
          '& .MuiTab-root': {
            color: isDark ? theme.colors.textSecondary : theme.colors.grey900,
          },
          '& .MuiTabs-indicator': {
            backgroundColor: theme.colors.primaryDark,
          },
          '& .Mui-selected': {
            color: theme.colors.primaryDark,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        flexContainer: {
          borderBottom: 'var(--space-1) solid',
          borderColor: isDark
            ? theme.colors.textPrimary + 20
            : theme.colors.grey200,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          padding: 'var(--space-12) 0 var(--space-12) 0',
          backgroundColor: isDark
            ? theme.colors.darkLevel3
            : theme.colors.primary200,
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          '& td': {
            whiteSpace: 'nowrap',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: isDark
            ? 'rgba(189, 200, 240, 0.082)'
            : theme.colors.grey200,
          padding: 'var(--space-16)',
          '&.MuiTableCell-head': {
            fontSize: theme.fontSize.xs,
            color: theme.textTertiary,
            paddingTop: 'var(--space-8)',
            paddingBottom: 'var(--space-8)',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        popper: {
          "&[data-popper-placement*='top'] .MuiTooltip-tooltip": {
            marginBottom: 'var(--space-8)!important',
          },
        },
        tooltip: {
          color: theme.colors?.darkPaper,
          backgroundImage: theme.colors?.mainBackground,
          maxWidth: '100%',
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        // selectLabel: {
        //   fontSize: {
        //     xs: "var(--space-12)",
        //     sm: "var(--space-14)",
        //   },
        // },
        toolbar: {
          padding: '0 var(--space-16)',
        },
        actions: {
          marginLeft: 'var(--space-14)',
        },
        selectLabel: {
          fontSize: 'var(--space-14)',
        },
        displayedRows: {
          fontSize: 'var(--space-14)',
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          // ".Mui-selected": {
          //   backgroundColor: theme.colors.primaryMain,
          // },
          '.MuiPaginationItem-previousNext': {
            borderRadius: '50%',
          },
          '.MuiPaginationItem-root': {
            '&.Mui-selected': {
              backgroundColor: theme.colors.secondaryMain,
            },
          },
          '.MuiButtonBase-root': {
            minWidth: 'var(--space-22)',
            height: 'var(--space-22)',
          },
        },
        nav: {
          backgroundColor: theme.colors.primaryMain,
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          position: 'relative' as const,
          background: 'transparent',
          '&.with-loading': {
            minHeight: '210px',
          },
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          '& .MuiStepLabel-label': {
            color: isDark ? theme.textSecondary : theme.textPrimary,
            '&.Mui-active': {
              color: theme.textPrimary,
            },
          },
          '& .MuiStepIcon-root': {
            color: isDark ? theme.colors.darkLevel4 : '#BDBDBD',
            '&.Mui-active': {
              color: isDark
                ? theme.colors.darkSecondaryMain
                : theme.colors.lightPrimaryMain,
            },
            '&.MuiStepIcon-completed': {
              color: isDark ? theme.colors.darkSecondaryMain : '#00C853',
            },
          },
          '& .MuiStepConnector-line': {
            borderColor: isDark
              ? theme.colors.darkLevel4
              : theme.colors.grey300,
          },
        },
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          '& a': {
            '&:hover': {
              textDecoration: `underline solid ${theme.textSecondary}!important`,
            },
            '& .MuiTypography-root': {
              color: isDark ? theme.darkTextPrimary : theme.darkTextSecondary,
            },
          },
          '& .MuiTypography-root': {
            color: isDark ? theme.darkTextPrimary : theme.darkTextSecondary,
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 'var(--space-36)',
          borderRadius: 'var(--space-12)',
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          '& .lightGray200': {
            ...(theme.customization.mode !== 'dark'
              ? { backgroundColor: theme.colors.lightGray200 }
              : {}),
          },
          '& .lightGray50': {
            ...(theme.customization.mode !== 'dark'
              ? { backgroundColor: theme.colors.lightGray50 }
              : {}),
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        root: {
          '&.custom-select': {
            '& .MuiPaper-root': {
              background: theme.colors.darkLevel3,
              border: 'var(--space-1) solid #49588E',
              borderRadius: 'var(--space-8)',
              '& .MuiList-root': {
                padding: 0,
              },
              '& .MuiMenuItem-root': {
                background: theme.colors.darkLevel3,
                paddingTop: 'var(--space-12)',
                paddingBottom: 'var(--space-12)',
                color: theme.textPrimary,
                '&.disabled': {
                  background: theme.colors.darkLevel4,
                  opacity: 0.3,
                  cursor: 'not-allowed',
                  '&:hover': {
                    background: theme.colors.darkLevel4,
                    opacity: 0.3,
                  },
                  '&.active': {
                    background: theme.colors.darkLevel4,
                    opacity: 0.3,
                  },
                },
                '&.active': {
                  background: '#313D67',
                },
                '&:hover': {
                  background: '#313D67',
                },
              },
            },
          },
        },
        paper: {},
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          '&.customize-menu-list': {
            padding: 0,
            background: theme.colors.darkLevel3,
            border: 'var(--space-1) solid #49588E',
            borderRadius: 'var(--space-8)',
            width: 'var(--space-146)',
            overflow: 'hidden',
            '& .MuiMenuItem-root.MuiButtonBase-root': {
              background: theme.colors.darkLevel3,
              paddingTop: 'var(--space-10)',
              paddingBottom: 'var(--space-10)',
              margin: 'var(--space-5) 0',
              '&.active': {
                background: '#313D67',
              },
              '&:hover': {
                background: '#313D67',
              },
            },
            '&.style1': {
              background: theme.colors.darkMainBackground,
              border: `var(--space-1) solid  ${theme.colors.darkLevel3}`,
              '& .MuiMenuItem-root.MuiButtonBase-root': {
                background: theme.colors.darkMainBackground,
                '&.active': {
                  background: theme.colors.darkLevel3,
                  '& .customize-label': {
                    color: '#fff',
                  },
                },
                '& .customize-label.active': {
                  color: '#fff',
                },
                '&:hover': {
                  background: theme.colors.darkLevel3,
                  '& .customize-label': {
                    color: '#fff',
                  },
                },
              },
            },
            '& .Mui-disabled.opacity1': {
              opacity: 1,
            },
          },
          '&.customize-menu-list-light': {
            padding: 0,
            background: '#ffffff',
            border: 'var(--space-1) solid #EFEFFF',
            borderRadius: 'var(--space-12)',
            width: 'var(--space-146)',
            overflow: 'hidden',
            '& .MuiMenuItem-root.MuiButtonBase-root': {
              background: '#ffffff',
              paddingTop: 'var(--space-10)',
              paddingBottom: 'var(--space-10)',
              '&:first-of-type': {
                borderRadius: 'var(--space-12) var(--space-12) 0 0',
              },
              '&:last-of-type': {
                borderRadius: '0 0 var(--space-12) var(--space-12)',
              },
              '&.active': {
                background: '#F5F5FF',
              },
              '&:hover': {
                background: '#F5F5FF',
              },
            },
          },
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          animation: `${CircularProgressKeyframes0} 0.8s linear infinite`,
          '& .MuiCircularProgress-circle': {
            animation: `${CircularProgressKeyframes1} 0.8s ease-in-out infinite`,
          },
        },
      },
    },
  };
}
