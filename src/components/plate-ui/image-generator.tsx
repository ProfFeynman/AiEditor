'use client';

import React, { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Loader2, ImageIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './dialog';
import { toast } from 'sonner';
import { useSettings } from '@/components/editor/settings';
import { SlateEditor } from '@udecode/plate';
import { insertMedia } from '@udecode/plate-media';
import { ImagePlugin } from '@udecode/plate-media/react';

interface ImageGeneratorProps {
  editor: SlateEditor;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageGenerator({ editor, isOpen, onClose }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { keys } = useSettings();

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt for the image');
      return;
    }

    setIsLoading(true);
    setGeneratedImage(null);

    try {
      const response = await fetch('/api/openai/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          // Optionally use API key from settings
          apiKey: keys.openai,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      setGeneratedImage(data.imageUrl);
    } catch (error) {
      toast.error((error as Error).message || 'Failed to generate image');
    } finally {
      setIsLoading(false);
    }
  };

  const insertImageIntoEditor = () => {
    if (!generatedImage) return;

    // Insert the generated image into the editor
    insertMedia(editor, {
      type: ImagePlugin.key,
    }).then(() => {
      // Set the URL for the inserted image
      const imageElement = {
        type: ImagePlugin.key,
        url: generatedImage,
        children: [{ text: prompt }],
      };
      
      editor.tf.setNodes(imageElement, { match: (n) => n.type === ImagePlugin.key && !n.url });
    });

    // Reset and close
    setPrompt('');
    setGeneratedImage(null);
    onClose();
  };

  const handleClose = () => {
    setPrompt('');
    setGeneratedImage(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Generate Image with AI</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Input
              placeholder="Describe the image you want to create..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {isLoading && (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {generatedImage && (
            <div className="flex justify-center">
              <img 
                src={generatedImage} 
                alt={prompt} 
                className="max-h-64 object-contain rounded-md" 
              />
            </div>
          )}
        </div>
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <div className="flex gap-2">
            {generatedImage ? (
              <Button onClick={insertImageIntoEditor}>
                Insert Image
              </Button>
            ) : (
              <Button onClick={generateImage} disabled={isLoading || !prompt.trim()}>
                {isLoading ? 'Generating...' : 'Generate'}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 