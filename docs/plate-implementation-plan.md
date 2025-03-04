# Plate.js Implementation Plan

## Project Overview

This document outlines the step-by-step plan to integrate Plate.js rich text editor into our Next.js 14 application using App Router. We'll be implementing a customizable text editor with AI capabilities that leverages our existing OpenAI and Anthropic integrations.

## Phase 1: Setup and Basic Integration

### 1. Install Dependencies

```bash
npm install @udecode/plate-common @udecode/plate-core slate slate-react slate-history
```

For UI components, we'll use the Plate CLI to install the component library:

```bash
npx @udecode/plate-ui@latest init
```

For essential plugins:

```bash
npm install @udecode/plate-basic-elements @udecode/plate-basic-marks @udecode/plate-block-quote @udecode/plate-list @udecode/plate-paragraph @udecode/plate-heading @udecode/plate-link @udecode/plate-autoformat
```

### 2. Create Basic Editor Structure

- Create `src/components/PlateEditor` directory
- Implement basic editor with essential plugins
- Create a provider for editor configuration

## Phase 2: Implement Core Features

### 1. Basic Text Formatting

- Bold, italic, underline
- Headings
- Lists (ordered and unordered)
- Block quotes

### 2. Media Support

- Images
- Links
- Tables (optional)

### 3. Markdown Support

- Add markdown serialization and deserialization
- Implement autoformatting for markdown shortcuts

## Phase 3: AI Integration

### 1. Text Completion

- Integrate with existing OpenAI API
- Implement autocompletion

### 2. AI Commands

- Add slash commands for AI features
- Implement "Ask AI" functionality

### 3. Content Generation

- Implement AI-powered content suggestions
- Add text improvement capabilities

## Phase 4: Firebase Integration

### 1. Document Storage

- Create schema for editor content in Firestore
- Implement save/load functionality

### 2. User Permissions

- Connect with existing authentication
- Add document ownership and permissions

### 3. Real-time Collaboration (Optional)

- Implement collaborative editing
- Add presence indicators

## Phase 5: UI/UX Polish

### 1. Styling

- Customize editor appearance using Tailwind CSS
- Create consistent design with the rest of the application

### 2. Toolbar

- Implement floating toolbar
- Add responsive design for mobile

### 3. Accessibility

- Ensure keyboard navigation
- Test and improve screen reader support

## Implementation Timeline

| Phase | Estimated Time | Dependencies |
|-------|----------------|--------------|
| Setup | 1-2 days | None |
| Core Features | 3-4 days | Phase 1 |
| AI Integration | 2-3 days | Phase 2, OpenAI/Anthropic APIs |
| Firebase Integration | 2-3 days | Phase 3, Firebase setup |
| UI/UX Polish | 2-3 days | Phase 4 |

## Component Architecture

```
src/
  components/
    PlateEditor/
      index.tsx                 # Main export
      PlateEditorContent.tsx    # Editor content component
      PlateToolbar.tsx          # Editor toolbar
      plugins/                  # Plugin configurations
      components/               # Custom components
      providers/                # Context providers
      utils/                    # Utility functions
      hooks/                    # Custom hooks
```

## Sample Usage

Basic usage in a page component:

```tsx
'use client';

import { PlateEditor } from '@/components/PlateEditor';
import { useState } from 'react';

export default function DocumentPage() {
  const [content, setContent] = useState([]);
  
  const handleChange = (newContent) => {
    setContent(newContent);
    // Save to Firebase or perform other actions
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Document Editor</h1>
      <PlateEditor 
        initialValue={content}
        onChange={handleChange}
        placeholder="Start typing..."
        readOnly={false}
        enableAI={true}
      />
    </div>
  );
}
```

## Firebase Integration

For document storage and retrieval:

```tsx
// Example function to save document
async function saveDocument(userId, documentId, content) {
  await firestore
    .collection('documents')
    .doc(documentId)
    .set({
      content: content,
      userId: userId,
      updatedAt: serverTimestamp(),
    }, { merge: true });
}

// Example function to load document
async function loadDocument(documentId) {
  const doc = await firestore
    .collection('documents')
    .doc(documentId)
    .get();
    
  if (doc.exists) {
    return doc.data().content;
  }
  
  return [];
}
```

## AI Integration

Leveraging existing OpenAI API:

```tsx
// Example function for AI text completion
async function getAICompletion(prompt, content) {
  const response = await fetch('/api/openai/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: [
        { role: 'system', content: 'You are a helpful writing assistant.' },
        { role: 'user', content: `Context: ${content}\n\nPrompt: ${prompt}` }
      ]
    }),
  });
  
  const result = await response.json();
  return result.content;
}
```

## Next Steps

1. Begin with basic installation and setup
2. Implement core text formatting features
3. Add media support
4. Integrate AI capabilities
5. Connect with Firebase
6. Polish UI/UX 