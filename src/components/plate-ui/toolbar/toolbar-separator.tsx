'use client';

import React from 'react';
import { cn } from '@udecode/cn';

export interface ToolbarSeparatorProps {
  className?: string;
}

export function ToolbarSeparator({ className }: ToolbarSeparatorProps) {
  return (
    <div className={cn('mx-1 h-6 w-px bg-gray-200', className)} />
  );
} 