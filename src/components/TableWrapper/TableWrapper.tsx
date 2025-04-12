import React from 'react';

import styles from './wrapper.module.css';

interface TableWrapperProps {
  children: React.ReactNode;
}

export function TableWrapper({ children }: TableWrapperProps) {
  return (
    <div className={styles.table_wrapper} style={{ height: '100%' }}>
      <div className={styles.table_content} style={{ height: '100%' }}>
        {children}
      </div>
    </div>
  );
}
