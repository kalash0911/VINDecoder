import type { ReactNode } from 'react';
import '../styles/alert.css';

interface AlertProps {
  variant: 'error' | 'info';
  children: ReactNode;
}

export function Alert({ variant, children }: AlertProps) {
  return (
    <p className={`alert alert--${variant}`} role={variant === 'error' ? 'alert' : undefined}>
      {children}
    </p>
  );
}
