import Typography from "@/components/Typography";
import type { Sorter } from "@/types";
import { Grid, Box, useTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { useCallback, useEffect, useState } from "react";

export interface TableSorterProps {
  title: React.ReactNode;
  onSorter: (sorter: Sorter) => void;
  sort: Order;
}

export type Order = "asc" | "desc" | "default";

export function TableSorter({ title, onSorter, sort: __sort }: TableSorterProps) {
  const theme = useTheme() as Theme;
  const [sort, setSort] = useState<Order>("asc");

  useEffect(() => {
    setSort(__sort ?? "asc");
  }, [__sort]);

  const handleSort = useCallback(() => {
    if (sort === "asc") {
      setSort("desc");
      onSorter("desc");
    } else if (sort === "desc") {
      setSort("default");
      onSorter("default");
    } else {
      setSort("asc");
      onSorter("asc");
    }
  }, [sort, setSort]);

  return (
    <Grid display="flex" gap="var(--space-4)" onClick={handleSort} sx={{ cursor: "pointer" }}>
      <>
        <Typography
          whiteSpace="nowrap"
          sx={{ color: theme.palette.mode === "dark" ? theme.colors.grey400 : "#757575" }}
        >
          {title}
        </Typography>
        <Grid
          display="flex"
          flexDirection="column"
          gap="var(--space-2) 0"
          sx={{
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              cursor: "pointer",
              width: 0,
              height: 0,
              borderRight: "var(--space-4) solid transparent",
              borderLeft: "var(--space-4) solid transparent",
              borderBottom: `var(--space-5) solid ${sort === "asc" ? "var(--color-primary)" : "var(--color-border)"}`,
            }}
          />
          <Box
            sx={{
              cursor: "pointer",
              width: 0,
              height: 0,
              borderRight: "var(--space-4) solid transparent",
              borderLeft: "var(--space-4) solid transparent",
              borderTop: `var(--space-5) solid ${sort === "desc" ? "var(--color-primary)" : "var(--color-border)"}`,
            }}
          />
        </Grid>
      </>
    </Grid>
  );
}
