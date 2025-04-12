import OpenChat from "@/assets/images/icons/OpenChat";
import { useTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaDiscord, FaGithub, FaMedium, FaProductHunt, FaTelegram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Icons = (site: any, size = "var(--space-24)") => {
  const theme = useTheme() as Theme;
  const fill = theme.palette.mode === "dark" ? theme.colors?.paper : theme.colors?.darkPaper;
  switch (site) {
    case "Website":
      return <AiOutlineGlobal style={{ fontSize: size, fill }} />;
    case "Discord":
      return <FaDiscord style={{ fontSize: size, fill }} />;
    case "Github":
      return <FaGithub style={{ fontSize: size, fill }} />;
    case "Twitter":
      return <FaSquareXTwitter style={{ fontSize: size, fill }} />;
    case "Medium":
      return <FaMedium style={{ fontSize: size, fill }} />;
    case "Telegram":
      return <FaTelegram style={{ fontSize: size, fill }} />;
    case "Other":
      return <FaProductHunt style={{ fontSize: size, fill }} />;
    case "OpenChat":
      return <OpenChat />;
    default:
      return null;
  }
};

export interface SiteIconProps {
  site: string;
  size?: string;
}

export function SiteIcon({ site, size }: SiteIconProps) {
  return Icons(site, size);
}
