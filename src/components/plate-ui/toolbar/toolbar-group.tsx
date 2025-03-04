'use client';

import React from 'react';
import { cn } from '@udecode/cn';

export interface ToolbarGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function ToolbarGroup({ children, className }: ToolbarGroupProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {children}
    </div>
  );
} 