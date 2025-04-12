import { DownArrow, UpArrow } from "@/components/Arrow";
import Typography from "@/components/Typography";
import { Override } from "@/types";
import { TypographyProps, useTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { useCallback, useContext } from "react";

import HeaderContext from "./headerContext";
import { SortDirection } from "./types";

export type HeaderCellProps = Override<
  TypographyProps,
  {
    isSort?: boolean;
    sortField?: string;
    field?: string;
    sortDirection?: SortDirection;
  }
>;

export default function HeaderCell({ isSort, field, ...props }: HeaderCellProps) {
  const theme = useTheme() as Theme;

  const { sortChange, sortField, sortDirection } = useContext(HeaderContext);

  const arrow = useCallback(
    (field: string | undefined) => {
      return sortField === field ? (
        sortDirection === SortDirection.ASC ? (
          <UpArrow />
        ) : (
          <DownArrow />
        )
      ) : (
        ""
      );
    },
    [sortDirection, sortField]
  );

  const handleClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (isSort && field) {
      sortChange(
        field,
        sortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC
      );
    }
    if (props.onClick) props.onClick(event);
  };

  return (
    <Typography
      {...props}
      sx={{
        cursor: "pointer",
        userSelect: "none",
        color: theme.colors.darkPrimary400,
        display: "flex",
        alignItems: "center",
        fontSize: "var(--space-12)",
        ...(props.sx ?? {}),
      }}
      onClick={handleClick}
    >
      {props.children} {arrow(field)}
    </Typography>
  );
}
