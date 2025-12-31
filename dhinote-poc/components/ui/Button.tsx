'use client';

import { ButtonHTMLAttributes, FC } from 'react';
import clsx from 'clsx';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  loading?: boolean;

}

const Button: FC<Props> = ({ variant = 'primary', loading, children, className, ...props }) => {
  const base = 'px-4 py-3 rounded-md text-sm font-semibold transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed';
  const variants: Record<string, string> = {
    primary: 'rounded-lg bg-[#156B5A] text-white shadow-sm hover:bg-[#125a4b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#156B5A] transition-colors',
    outline: 'border border-gray-300 text-gray-800 bg-white hover:bg-gray-50',
  };

  return (
    <button
      className={clsx(base, variants[variant], className)}
      {...props} disabled={loading}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default Button;