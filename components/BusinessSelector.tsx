"use client"

import { useState } from 'react';
import { useBusinessContext } from '@/contexts/BusinessContext';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { PlusCircle, Edit2, Trash2 } from 'lucide-react';

export default function BusinessSelector() {
  const { businesses, selectedBusinessId, addBusiness, selectBusiness, updateBusinessName, removeBusiness } = useBusinessContext();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editingName, setEditingName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSelectBusiness = (id: string) => {
    selectBusiness(id);
    router.push(`/business/${id}/dashboard`);
  };

  const handleAddBusiness = () => {
    const name = `Business ${businesses.length + 1}`;
    const newId = addBusiness(name);
    router.push(`/business/${newId}/dashboard`);
  };

  const startEditing = (business: { id: string; name: string }) => {
    setEditingId(business.id);
    setEditingName(business.name);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editingId && editingName.trim()) {
      updateBusinessName(editingId, editingName.trim());
      setIsEditing(false);
      setEditingId(null);
      setEditingName('');
    }
  };

  const handleRemove = (id: string) => {
    removeBusiness(id);
    router.push(`/business/${businesses[0]?.id}/dashboard`);
  };

  const selectedBusiness = businesses.find(b => b.id === selectedBusinessId);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Select value={selectedBusinessId} onValueChange={handleSelectBusiness}>
          <SelectTrigger className="w-full">
            <SelectValue>
              {selectedBusiness?.name || "Select a business"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {businesses.map((business) => (
              <SelectItem key={business.id} value={business.id}>
                {business.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => selectedBusiness && startEditing(selectedBusiness)}
        >
          <Edit2 className="w-4 h-4" />
        </Button>
        {businesses.length > 1 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Remove Business</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to remove this business? This action cannot be undone.
                  All associated data will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => selectedBusiness && handleRemove(selectedBusiness.id)}
                  className="bg-destructive text-destructive-foreground"
                >
                  Remove
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
      <Button onClick={handleAddBusiness} variant="outline" className="w-full">
        <PlusCircle className="w-4 h-4 mr-2" />
        Add Business
      </Button>

      <Dialog open={isEditing} onOpenChange={(open) => !open && setIsEditing(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Business Name</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Input
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              placeholder="Enter business name"
              autoFocus
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}