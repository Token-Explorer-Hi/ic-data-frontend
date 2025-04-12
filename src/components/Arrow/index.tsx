import { SvgIconProps } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export function DownArrow(props: SvgIconProps) {
  return <ArrowDownwardIcon {...props} sx={{ width: "var(--space-16)", height: "var(--space-16)" }} />;
}

export function UpArrow(props: SvgIconProps) {
  return (
    <ArrowDownwardIcon
      {...props}
      sx={{ transform: "rotate(180deg)", width: "var(--space-16)", height: "var(--space-16)" }}
    />
  );
}

export function RightArrow(props: SvgIconProps) {
  return (
    <ArrowDownwardIcon
      {...props}
      sx={{ transform: "rotate(270deg)", width: "var(--space-16)", height: "var(--space-16)" }}
    />
  );
}

export function LeftArrow(props: SvgIconProps) {
  return (
    <ArrowDownwardIcon
      {...props}
      sx={{ transform: "rotate(90deg)", width: "var(--space-16)", height: "var(--space-16)" }}
    />
  );
}
