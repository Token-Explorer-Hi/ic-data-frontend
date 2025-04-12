import Typography, { TypographyProps } from '@/components/Typography';
import { ReactNode } from 'react';
import { Link } from './Link';

export interface TypographyLinkProps extends TypographyProps {
  children: ReactNode;
  to: string;
}

export const TypographyLink = ({
  children,
  to,
  ...props
}: TypographyLinkProps) => {
  return (
    <Link to={to}>
      <Typography color="var(--color-primary)" {...props}>
        {children}
      </Typography>
    </Link>
  );
};
