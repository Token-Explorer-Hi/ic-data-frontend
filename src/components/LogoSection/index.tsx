import { Link } from "@/components/Link";
import Logo from "@/components/Logo";
import { ButtonBase } from "@mui/material";

export default function LogoSection() {
  return (
    <ButtonBase disableRipple component={Link} to="/">
      <Logo />
    </ButtonBase>
  );
}
