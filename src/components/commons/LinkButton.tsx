import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import Link from 'next/link';
import * as React from 'react';

interface LinkButtonProps extends ButtonProps {
  href: string;
  label: string;
}

export function LinkButton({ href, label, ...buttonProps }: LinkButtonProps) {
  return (
    <Link href={href}>
      <Button {...buttonProps}>{label}</Button>
    </Link>
  );
}
