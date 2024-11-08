"use client"

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import AddItemForm from './BusinessItems/AddItemForm';
import ItemCard from './BusinessItems/ItemCard';
import { fetchBusinessInfo, updateBusinessInfo } from '@/lib/api';

interface BusinessItem {
  id: string;
  name: string;
  type: 'product' | 'service' | 'other';
  description: string;
}

interface BusinessInfoFormProps {
  businessId: string;
}

export default function BusinessInfoForm({ businessId }: BusinessInfoFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [businessInfo, setBusinessInfo] = useState({
    name: '',
    description: '',
  });
  const [items, setItems] = useState<BusinessItem[]>([]);

  useEffect(() => {
    const loadBusinessInfo = async () => {
      try {
        const data = await fetchBusinessInfo(businessId);
        setBusinessInfo({
          name: data.name,
          description: data.description,
        });
        setItems(data.items);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load business information",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadBusinessInfo();
  }, [businessId, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusinessInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = (name: string, type: BusinessItem['type']) => {
    setItems(prev => [...prev, {
      id: Date.now().toString(),
      name,
      type,
      description: ''
    }]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleItemDescriptionChange = (id: string, description: string) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, description } : item
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await updateBusinessInfo(businessId, {
        ...businessInfo,
        items
      });

      toast({
        title: "Success",
        description: "Business information updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update business information",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Business Name</label>
            <Input
              id="name"
              name="name"
              value={businessInfo.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Business Description</label>
            <Textarea
              id="description"
              name="description"
              value={businessInfo.description}
              onChange={handleChange}
              required
              rows={4}
            />
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium">Products, Services & Other Items</label>
            <AddItemForm onAdd={handleAddItem} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onRemove={handleRemoveItem}
                  onDescriptionChange={handleItemDescriptionChange}
                />
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Update Business Info'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}