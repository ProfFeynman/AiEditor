'use client';

import React from 'react';
import { cn } from '@udecode/cn';
import { PlateContent } from '@udecode/plate/react';

import { FixedToolbar } from './fixed-toolbar';
import { FloatingToolbar } from './floating-toolbar';

export interface EditorProps {
  className?: string;
  variant?: 'default' | 'demo';
}

export function Editor({ className, variant = 'default' }: EditorProps) {
  return (
    <div
      className={cn(
        'relative bg-white border rounded-lg shadow-sm',
        className
      )}
    >
      {variant === 'demo' && <FixedToolbar />}
      
      <div className="min-h-[500px] p-8">
        <PlateContent 
          className="prose prose-slate max-w-none outline-none" 
          placeholder="Type something..." 
          spellCheck={false}
        />
      </div>
      
      <FloatingToolbar />
    </div>
  );
}

export interface EditorContainerProps {
  children: React.ReactNode;
}

export function EditorContainer({ children }: EditorContainerProps) {
  return (
    <div className="relative w-full max-w-screen-lg mx-auto">
      {children}
    </div>
  );
}
