"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';

type ItemType = 'product' | 'service' | 'other';

interface AddItemFormProps {
  onAdd: (name: string, type: ItemType) => void;
}

export default function AddItemForm({ onAdd }: AddItemFormProps) {
  const [newItem, setNewItem] = useState('');
  const [newItemType, setNewItemType] = useState<ItemType>('product');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.trim()) {
      onAdd(newItem.trim(), newItemType);
      setNewItem('');
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add new item..."
        className="flex-grow"
      />
      <Select
        value={newItemType}
        onValueChange={(value: ItemType) => setNewItemType(value)}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="product">Product</SelectItem>
          <SelectItem value="service">Service</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={handleSubmit} size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}