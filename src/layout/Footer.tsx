import icpSvg from "@/assets/images/icp.svg";
import { Box, Button, Divider, Grid, Link, Typography } from "@mui/material";
import { BiSolidArrowToTop } from "react-icons/bi";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
export default function Footer() {
  return (
    <Box className="footer" display="flex" justifyContent="center" alignContent="center">
      <Box className="wrap" width="100%">
        <Box
          width="100%"
          className="top"
          display="flex"
          sx={{ height: { xs: "var(--space-36)", sm: "var(--space-48)" } }}
        >
          <Grid
            display="flex"
            alignItems="center"
            sx={{ marginRight: "auto", gap: "var(--space-8)" }}
          >
            <Link
              href="https://x.com/ICExplorer_io"
              target="_blank"
              style={{
                borderRadius: "10000px",
                background: "#ddd",
                padding: "var(--space-6)",
                width: "var(--space-28)",
                height: "var(--space-28)",
              }}
            >
              <FaXTwitter
                fill="black"
                style={{
                  width: "var(--space-16)",
                  height: "var(--space-16)",
                }}
              />
            </Link>
            <Link
              href="https://github.com/Token-Explorer-Hi/ic-explorer-docs/blob/main/api.md"
              target="_blank"
              style={{
                borderRadius: "10000px",
                background: "#ddd",
                padding: "var(--space-6)",
                width: "var(--space-28)",
                height: "var(--space-28)",
              }}
            >
              <FaGithub
                fill="black"
                style={{
                  width: "var(--space-16)",
                  height: "var(--space-16)",
                }}
              />
            </Link>
          </Grid>
          <Button
            sx={{ marginLeft: "auto" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <BiSolidArrowToTop color="var(--typography-color)" />
            <Typography>Back to Top</Typography>
          </Button>
        </Box>
        <Divider sx={{ width: "100%" }} />
        <Box
          gap="var(--space-10)"
          sx={{
            padding: {
              xs: "var(--space-16) 0",
              sm: "var(--space-24) 0",
            },
            width: "100%",
          }}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
        >
          <Typography
            variant="h3"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-8)",
              fontSize: {
                xs: "var(--space-16)",
                sm: "var(--space-20)",
              },
            }}
          >
            <img src={icpSvg} width={36} alt="pwered by icp" />
            Powered By ICP
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: {
                xs: "var(--space-10)",
                sm: "var(--space-14)",
              },
            }}
          >
            IC Explorer is a Block Explorer and Analytics Platform for ICP
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
