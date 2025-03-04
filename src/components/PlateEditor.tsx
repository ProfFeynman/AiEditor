'use client';

import React from 'react';
import {
  Plate,
  PlateContent,
  usePlateEditor,
} from '@udecode/plate/react';
import {
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { HeadingPlugin } from '@udecode/plate-heading/react';

// Sample initial value
const initialValue = [
  {
    type: 'h1',
    children: [{ text: 'Welcome to Plate Editor' }],
  },
  {
    type: 'p',
    children: [{ text: 'This is a rich text editor built with Plate.js and integrated with our Next.js app.' }],
  },
  {
    type: 'p',
    children: [
      { text: 'You can format text as ' },
      { text: 'bold', bold: true },
      { text: ', ' },
      { text: 'italic', italic: true },
      { text: ', or ' },
      { text: 'underlined', underline: true },
      { text: '.' },
    ],
  },
];

interface PlateEditorProps {
  onChange?: (value: any) => void;
  initialContent?: any[];
  placeholder?: string;
  readOnly?: boolean;
  enableAI?: boolean;
}

export const PlateEditor: React.FC<PlateEditorProps> = ({
  onChange,
  initialContent = initialValue,
  placeholder = 'Type something...',
  readOnly = false,
  enableAI = false,
}) => {
  const editor = usePlateEditor({
    plugins: [
      BlockquotePlugin,
      HeadingPlugin,
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
    ],
    value: initialContent,
  });

  // Optional AI component that could be rendered below the editor
  const AskAIComponent = () => {
    if (!enableAI) return null;
    
    const handleAskAI = async () => {
      // Implementation would connect to your OpenAI or Anthropic API
      console.log('Asking AI with current editor content...');
    };
    
    return (
      <div className="mt-4">
        <button 
          onClick={handleAskAI}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Ask AI
        </button>
      </div>
    );
  };
  
  return (
    <div className="border border-gray-300 rounded-md p-4">
      <Plate editor={editor}>
        <PlateContent 
          placeholder={placeholder}
          readOnly={readOnly}
          className="outline-none min-h-[200px] p-4"
        />
        <AskAIComponent />
      </Plate>
    </div>
  );
};

export default PlateEditor; 