'use client';

import { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function InputField({ label, className, ...props }: InputFieldProps) {
  return (
    <div className="space-y-1.5 w-full">
      <label className="text-xs font-medium text-white/40 uppercase tracking-wider px-1">
        {label}
      </label>
      <input
        className={cn(
          "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white transition-all outline-none",
          "focus:border-burgundy focus:ring-1 focus:ring-burgundy/20 placeholder:text-white/20",
          className
        )}
        {...props}
      />
    </div>
  );
}
