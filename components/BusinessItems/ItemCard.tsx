"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';

interface BusinessItem {
  id: string;
  name: string;
  type: 'product' | 'service' | 'other';
  description: string;
}

interface ItemCardProps {
  item: BusinessItem;
  onRemove: (id: string) => void;
  onDescriptionChange: (id: string, description: string) => void;
}

export default function ItemCard({ item, onRemove, onDescriptionChange }: ItemCardProps) {
  const getTypeStyles = () => {
    switch (item.type) {
      case 'product':
        return 'border-blue-500/50 bg-blue-500/5 hover:bg-blue-500/10';
      case 'service':
        return 'border-green-500/50 bg-green-500/5 hover:bg-green-500/10';
      case 'other':
        return 'border-purple-500/50 bg-purple-500/5 hover:bg-purple-500/10';
    }
  };

  return (
    <Card className={`relative group transition-all ${getTypeStyles()}`}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onRemove(item.id)}
        type="button"
      >
        <X className="h-4 w-4" />
      </Button>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{item.name}</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-background">
              {item.type}
            </span>
          </div>
          <Textarea
            placeholder="Add description..."
            value={item.description}
            onChange={(e) => onDescriptionChange(item.id, e.target.value)}
            className="min-h-[80px] resize-none"
          />
        </div>
      </CardContent>
    </Card>
  );
}