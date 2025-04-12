import { Override } from "@/types";
import { Box, BoxProps } from "@mui/material";
import { useCallback, useState } from "react";

import HeaderContext from "./headerContext";
import { SortDirection } from "./types";

export type HeaderProps = Override<
  BoxProps,
  {
    onSortChange?: (sortField: string, sortDirection: SortDirection) => void;
    defaultSortFiled?: string;
    defaultSortDirection?: SortDirection;
  }
>;

export default function Header({
  children,
  onSortChange,
  defaultSortFiled = "",
  defaultSortDirection = SortDirection.DESC,
  ...props
}: HeaderProps) {
  const [sortField, setSortField] = useState(defaultSortFiled);
  const [sortDirection, setSortDirection] = useState(defaultSortDirection);

  const sortChange = useCallback((sortField: string, sortDirection: SortDirection) => {
    setSortField(sortField);
    setSortDirection(sortDirection);

    if (onSortChange) onSortChange(sortField, sortDirection);
  }, []);

  return (
    <HeaderContext.Provider value={{ sortChange, sortField, sortDirection }}>
      <Box
        {...props}
        sx={{
          padding: "var(--space-20) 0",
          borderBottom: "var(--space-1) solid rgba(189, 200, 240, 0.082)",
          display: "grid",
          ...(props.sx ?? {}),
        }}
      >
        {children}
      </Box>
    </HeaderContext.Provider>
  );
}
