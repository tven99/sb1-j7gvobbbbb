"use client"

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

export default function NegativeWords({ businessId }: { businessId: string }) {
  const [words, setWords] = useState<string[]>([]);
  const [newWord, setNewWord] = useState('');

  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWord.trim() && !words.includes(newWord.trim().toLowerCase())) {
      setWords([...words, newWord.trim().toLowerCase()]);
      setNewWord('');
    }
  };

  const handleRemoveWord = (wordToRemove: string) => {
    setWords(words.filter(word => word !== wordToRemove));
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log('Saving negative words:', words);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Restricted Words</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddWord} className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              placeholder="Add a word to restrict..."
              className="flex-grow"
            />
            <Button type="submit">Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {words.map((word) => (
              <Badge key={word} variant="secondary" className="px-2 py-1">
                {word}
                <button
                  onClick={() => handleRemoveWord(word)}
                  className="ml-2 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <Button onClick={handleSave} className="w-full">Save Changes</Button>
        </form>
      </CardContent>
    </Card>
  );
}