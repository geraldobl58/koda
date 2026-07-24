import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const base =
  'font-sans font-semibold rounded-sm px-4 py-3 cursor-pointer transition-colors ' +
  'focus-visible:outline-none focus-visible:ring-4 active:translate-y-px ' +
  'disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500';

const byVariant: Record<ButtonVariant, string> = {
  primary: 'text-neutral-0 bg-brand-500 hover:bg-brand-600 focus-visible:ring-brand-100',
  secondary:
    'text-neutral-900 bg-neutral-0 border border-neutral-300 hover:border-neutral-500 focus-visible:ring-brand-100',
};

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className, ...props }, ref) => {
    return (
      <button ref={ref} className={cx(base, byVariant[variant], className)} {...props} />
    );
  },
);

Button.displayName = 'Button';
