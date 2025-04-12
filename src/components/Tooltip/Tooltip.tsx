import Typography from "@/components/Typography";
import { Tooltip as MuiTooltip, type TooltipProps as MuiTooltipProps } from "@mui/material";
import { ReactNode, useState } from "react";
import { AlertCircle } from "react-feather";

export interface TooltipProps extends MuiTooltipProps {
  background?: string;
  tips?: ReactNode;
  iconSize?: string;
  iconColor?: string;
  maxWidth?: string;
}

export function Tooltip({
  children,
  tips,
  background,
  maxWidth,
  iconSize = "var(--space-16)",
  iconColor = "#8492C4",
}: TooltipProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <MuiTooltip
      open={open}
      TransitionProps={{
        timeout: 300,
      }}
      PopperProps={{
        // @ts-ignore
        sx: {
          display: "flex",
          justifyContent: "center",
          "& .MuiTooltip-tooltip": {
            background,
            borderRadius: "var(--space-8)",
            padding: "var(--space-12) var(--space-16)",
            maxWidth: maxWidth ?? "auto",
            "& .MuiTooltip-arrow": {
              color: background,
            },
          },
        },
      }}
      title={
        <Typography color="#111936" fontSize={12} lineHeight="var(--space-16)">
          {tips}
        </Typography>
      }
      arrow
    >
      <>
        {children || (
          <AlertCircle
            size={iconSize}
            color={iconColor}
            onClick={handleClick}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            style={{ cursor: "pointer" }}
          />
        )}
      </>
    </MuiTooltip>
  );
}
