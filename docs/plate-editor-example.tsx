'use client';

import React, { useState } from 'react';
import {
  createPlugins,
  createPlateUI,
  Plate,
  PlateContent,
  PlateEditor as PlateEditorType,
  PlateProvider,
  RenderAfterEditable,
  withProps,
} from '@udecode/plate-common';
import { 
  createParagraphPlugin,
  ELEMENT_PARAGRAPH,
} from '@udecode/plate-paragraph';
import {
  createHeadingPlugin,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
} from '@udecode/plate-heading';
import {
  createBoldPlugin,
  createItalicPlugin,
  createUnderlinePlugin,
  createStrikethroughPlugin,
  createCodePlugin,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  MARK_STRIKETHROUGH,
  MARK_CODE,
} from '@udecode/plate-basic-marks';
import {
  createBlockquotePlugin,
  ELEMENT_BLOCKQUOTE,
} from '@udecode/plate-block-quote';
import {
  createListPlugin,
  createTodoListPlugin,
  ELEMENT_LI,
  ELEMENT_OL,
  ELEMENT_UL,
  ELEMENT_TODO_LI,
} from '@udecode/plate-list';
import {
  createLinkPlugin,
  ELEMENT_LINK,
} from '@udecode/plate-link';
import {
  createImagePlugin,
  ELEMENT_IMAGE,
} from '@udecode/plate-media';
import {
  createAutoformatPlugin,
} from '@udecode/plate-autoformat';
import { createReactPlugin } from '@udecode/plate-headless';

// Basic Components
const Paragraph = withProps(PlateContent, {
  as: 'p',
  className: 'py-2 first:pt-0 last:pb-0',
});

const H1 = withProps(PlateContent, {
  as: 'h1',
  className: 'text-3xl font-bold py-2',
});

const H2 = withProps(PlateContent, {
  as: 'h2',
  className: 'text-2xl font-bold py-2',
});

const H3 = withProps(PlateContent, {
  as: 'h3',
  className: 'text-xl font-bold py-2',
});

const Blockquote = withProps(PlateContent, {
  as: 'blockquote',
  className: 'border-l-4 border-gray-300 pl-4 italic py-2',
});

const Link = withProps(PlateContent, {
  as: 'a',
  className: 'text-blue-500 underline',
});

const Li = withProps(PlateContent, {
  as: 'li',
  className: 'ml-6 list-disc',
});

const Ol = withProps(PlateContent, {
  as: 'ol',
  className: 'ml-6 list-decimal',
});

const Ul = withProps(PlateContent, {
  as: 'ul',
  className: 'ml-6 list-disc',
});

// Create components lookup object
const components = createPlateUI({
  [ELEMENT_PARAGRAPH]: Paragraph,
  [ELEMENT_H1]: H1,
  [ELEMENT_H2]: H2,
  [ELEMENT_H3]: H3,
  [ELEMENT_BLOCKQUOTE]: Blockquote,
  [ELEMENT_LINK]: Link,
  [ELEMENT_LI]: Li,
  [ELEMENT_OL]: Ol,
  [ELEMENT_UL]: Ul,
});

// Define plugins
const plugins = createPlugins([
  createParagraphPlugin(),
  createHeadingPlugin(),
  createBlockquotePlugin(),
  createListPlugin(),
  createTodoListPlugin(),
  createLinkPlugin(),
  createImagePlugin(),
  createBoldPlugin(),
  createItalicPlugin(),
  createUnderlinePlugin(),
  createStrikethroughPlugin(),
  createCodePlugin(),
  createAutoformatPlugin(),
  createReactPlugin(),
], {
  components,
});

// Sample initial value
const initialValue = [
  {
    id: '1',
    type: ELEMENT_H1,
    children: [{ text: 'Welcome to Plate Editor' }],
  },
  {
    id: '2',
    type: ELEMENT_PARAGRAPH,
    children: [{ text: 'This is a rich text editor built with Plate.js and integrated with our Next.js app.' }],
  },
  {
    id: '3',
    type: ELEMENT_PARAGRAPH,
    children: [
      { text: 'You can format text as ' },
      { text: 'bold', [MARK_BOLD]: true },
      { text: ', ' },
      { text: 'italic', [MARK_ITALIC]: true },
      { text: ', or ' },
      { text: 'underlined', [MARK_UNDERLINE]: true },
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
  const [editor, setEditor] = useState<PlateEditorType | null>(null);
  
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
      <PlateProvider
        plugins={plugins}
        initialValue={initialContent}
        onChange={onChange}
        editor={editor}
        editorRef={setEditor}
      >
        <Plate
          editableProps={{
            placeholder,
            readOnly,
            className: 'outline-none min-h-[200px]',
          }}
        >
          <PlateContent className="p-4" />
          <RenderAfterEditable>
            <AskAIComponent />
          </RenderAfterEditable>
        </Plate>
      </PlateProvider>
    </div>
  );
};

export default PlateEditor; 