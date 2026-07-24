import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label?: string;
  error?: string;
  id?: string;
}

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="mb-4 font-sans">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-neutral-900 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cx(
            'w-full text-base bg-neutral-0 text-neutral-900 border border-neutral-300 rounded-sm px-3 py-3',
            'placeholder:text-neutral-500 hover:border-neutral-500',
            'focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100',
            error && 'border-danger-500',
            className,
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-danger-500 mt-2">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
