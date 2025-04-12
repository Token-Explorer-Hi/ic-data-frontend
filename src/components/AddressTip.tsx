import Typography from "@/components/Typography";
import { Tooltip, TooltipProps } from "@/components/index";
import { isValidPrincipal, principalToAccount, principalToSubHex } from "@/utils";
import { Grid, useTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";

export interface AddressTipProps {
  children: TooltipProps["children"];
  owner?: string | undefined | null;
}

export function AddressTip({ owner, children }: AddressTipProps) {
  const theme = useTheme() as Theme;
  const handleStopDefault: any = (event: any) => {
    event.stopPropagation();
  };

  return (
    <Tooltip
      title={
        owner?.includes("-") && isValidPrincipal(owner) ? (
          <Grid display="flex" flexDirection="column" onClick={handleStopDefault}>
            <Typography>
              <Typography
                style={{
                  color:
                    theme.palette.mode === "dark" ? theme.colors.grey400 : theme.colors.grey600,
                  wordBreak: "break-all",
                }}
              >
                Principal ID:{" "}
              </Typography>
              <Typography
                copyable
                style={{
                  color:
                    theme.palette.mode === "dark" ? theme.colors.grey400 : theme.colors.grey600,
                  wordBreak: "break-all",
                }}
              >
                {owner}
              </Typography>
            </Typography>
            <Typography>
              <Typography
                style={{
                  color:
                    theme.palette.mode === "dark" ? theme.colors.grey400 : theme.colors.grey600,
                  wordBreak: "break-all",
                }}
              >
                Account ID:{" "}
              </Typography>
              <Typography
                copyable
                style={{ wordBreak: "break-all" }}
                copyText={principalToAccount(owner)}
              >
                {principalToAccount(owner)}
              </Typography>
            </Typography>
            <Typography>
              <Typography
                style={{
                  color:
                    theme.palette.mode === "dark" ? theme.colors.grey400 : theme.colors.grey600,
                  wordBreak: "break-all",
                }}
              >
                Subaccount:{" "}
              </Typography>
              <Typography
                copyable
                style={{ wordBreak: "break-all" }}
                copyText={principalToSubHex(owner)}
              >
                {principalToSubHex(owner)}
              </Typography>
            </Typography>
          </Grid>
        ) : (
          <Grid display="flex" flexDirection="column" onClick={handleStopDefault}>
            <Typography>
              <Typography
                style={{
                  color:
                    theme.palette.mode === "dark" ? theme.colors.grey400 : theme.colors.grey600,
                  wordBreak: "break-all",
                }}
              >
                Account ID:{" "}
              </Typography>
              <Typography copyable style={{ wordBreak: "break-all" }} copyText={owner as string}>
                {owner}
              </Typography>
            </Typography>
          </Grid>
        )
      }
    >
      {children}
    </Tooltip>
  );
}
