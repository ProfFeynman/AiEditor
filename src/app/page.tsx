/**
 * Home Page Component
 * 
 * This is the main landing page of the application that renders the PlateEditor.
 * The component includes:
 * - A header with navigation and settings
 * - A centered container for the editor
 * - Responsive layout using Tailwind CSS
 */

'use client';

import React from 'react';
import { PlateEditor } from '@/components/editor/plate-editor';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header section with navigation and settings */}
      <div className="flex items-center justify-between border-b bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">playground.platejs.org/editor</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">100%</span>
          <span className="text-sm">Settings</span>
        </div>
      </div>
      {/* Main editor container */}
      <div className="mx-auto max-w-5xl p-8">
        <PlateEditor />
      </div>
    </main>
  );
}
