'use client';

import React from 'react';
import { cn } from '@udecode/cn';

export interface ToolbarButtonProps {
  children: React.ReactNode;
  tooltip?: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ToolbarButton({
  children,
  tooltip,
  isActive = false,
  onClick,
  className,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'rounded p-1 hover:bg-gray-100 focus:outline-none',
        isActive && 'bg-gray-200',
        className
      )}
      onClick={onClick}
      title={tooltip}
      aria-label={tooltip}
    >
      {children}
    </button>
  );
} 