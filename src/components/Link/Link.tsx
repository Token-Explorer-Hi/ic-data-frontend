import type { LinkProps } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

export interface CustomLinkProps extends Omit<LinkProps, 'to'> {
  to?: string;
  link?: string;
  className?: string;
  children: React.ReactNode;
  target?: string;
  style?: React.CSSProperties;
}

export const Link = ({ to, link, className, children, style, target, ...props }: CustomLinkProps) => {
  if (link) {
    return (
      <a
        href={link}
        className={className}
        target={target || "_blank"}
        rel="noreferrer"
        style={{ textDecoration: "none", ...style }}
        {...props}
      >
        {children}
      </a>
    );
  }

  if (!to) {
    return <>{children}</>;
  }

  return (
    <RouterLink to={to} className={className} style={{ textDecoration: "none", ...style }} {...props}>
      {children}
    </RouterLink>
  );
};
