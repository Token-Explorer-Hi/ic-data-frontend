import React, { useState } from "react";
import { AlertCircle } from "react-feather";

import { Box, Collapse } from "./Mui";

export interface CollapseTextProps {
  description: React.ReactNode;
  label: React.ReactNode;
}

export function CollapseText({ label, description }: CollapseTextProps) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", gap: "0 var(--space-5)", alignItems: "center" }}>
        {label}
        <AlertCircle size="var(--space-14)" cursor="pointer" onClick={handleToggle} />
      </Box>
      <Collapse appear={false} in={open}>
        {description}
      </Collapse>
    </Box>
  );
}
