import Typography from "@/components/Typography";
import { NONE_SUB_HEX } from "@/constants/index";
import { subaccountHexToBytes } from "@/utils";
import { encodeIcrcAccount } from "@dfinity/ledger-icrc";
import { Principal } from "@dfinity/principal";
import { Grid, useTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";
import Tooltip, { TooltipProps } from "@mui/material/Tooltip";
import { useMemo } from "react";

export interface TransactionTooltipProps {
  owner: string | undefined | null;
  sub?: string | null;
  children: TooltipProps["children"];
}

export function TransactionTooltip({ owner, sub, children }: TransactionTooltipProps) {
  const theme = useTheme() as Theme;

  const handleStopDefault: any = (event: any) => {
    event.stopPropagation();
  };

  const address = useMemo(() => {
    if (!owner) return undefined;
    if (sub && sub !== NONE_SUB_HEX) {
      return encodeIcrcAccount({
        owner: Principal.fromText(owner),
        subaccount: subaccountHexToBytes(sub),
      });
    }

    return owner;
  }, [owner, sub, NONE_SUB_HEX]);

  const color = theme.colors?.darkPaper;
  return (
    <Tooltip
      title={
        owner?.includes("-") ? (
          <Grid
            component="p"
            display="flex"
            flexDirection="column"
            onClick={handleStopDefault}
            sx={{ gap: "var(--space-8)" }}
          >
            <Typography copyable style={{ whiteSpace: "nowrap", color }} copyText={address}>
              ID:
              {address}
            </Typography>
            <Typography copyable style={{ whiteSpace: "nowrap", color }} copyText={owner}>
              Owner:
              {owner}
            </Typography>
            {sub && sub !== NONE_SUB_HEX ? (
              <Typography copyable style={{ whiteSpace: "nowrap", color }} copyText={sub}>
                Subaccount:
                {sub}
              </Typography>
            ) : null}
          </Grid>
        ) : (
          <></>
        )
      }
    >
      <Grid component="span">{children}</Grid>
    </Tooltip>
  );
}
