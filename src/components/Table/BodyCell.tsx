import Typography from "@/components/Typography";
import { TypographyProps } from "@mui/material";

export type BodyCellProps = TypographyProps;

export default function BodyCell({ ...props }: BodyCellProps) {
  const handleClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (props.onClick) props.onClick(event);
  };

  return (
    <Typography
      sx={{
        cursor: "pointer",
        userSelect: "none",
        "@media screen and (max-width: 600px)": {
          fontSize: "var(--space-12)",
        },
        ...props.sx,
      }}
      onClick={handleClick}
    >
      {props.children}
    </Typography>
  );
}
