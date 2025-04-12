import { TablePagination as MuiTablePagination } from '@mui/material';
import { useEffect } from 'react';
export function TablePagination({
  pageSizes = [10, 25, 50, 100],
  count,
  page,
  onPageChange,
  pageSize = 25,
  onRowsPerPageChange,
  labelRowsPerPage = 'Show:',
  sx = { marginLeft: 'auto', flexShrink: 0 },
}: {
  pageSizes?: number[];
  count: number;
  page: number;
  onPageChange: (event: unknown, newPage: number) => void;
  pageSize: number;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  labelRowsPerPage?: string;
  sx?: { [key: string]: any };
}) {
  // Add keyboard event listener for pagination
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle keyboard events when the user is not typing in an input field
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const maxPage = Math.ceil(count / pageSize) - 1;

      switch (event.key) {
        case 'ArrowLeft':
          if (page > 0) {
            onPageChange(null, page - 1);
          }
          break;
        case 'ArrowRight':
          if (page < maxPage) {
            onPageChange(null, page + 1);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [count, page, pageSize, onPageChange]);

  return (
    <MuiTablePagination
      rowsPerPageOptions={pageSizes}
      component="div"
      count={count}
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={pageSize}
      onRowsPerPageChange={onRowsPerPageChange}
      sx={sx}
      labelRowsPerPage={labelRowsPerPage}
    />
  );
}

export default function Pagination() {
  return null;
}
