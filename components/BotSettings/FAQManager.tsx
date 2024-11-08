"use client"

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical, X } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  enabled: boolean;
}

export default function FAQManager({ businessId }: { businessId: string }) {
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: '1',
      question: 'What are the key features of SaaSify?',
      answer: 'SaaSify offers AI-powered conversations, lead qualification, CRM integration, multilingual support, and customizable workflows.',
      enabled: true,
    },
    // Add more default FAQs as needed
  ]);

  const handleAddFAQ = () => {
    const newFAQ: FAQ = {
      id: Date.now().toString(),
      question: '',
      answer: '',
      enabled: true,
    };
    setFaqs([...faqs, newFAQ]);
  };

  const handleRemoveFAQ = (id: string) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
  };

  const handleChange = (id: string, field: keyof FAQ, value: string | boolean) => {
    setFaqs(faqs.map(faq => 
      faq.id === id ? { ...faq, [field]: value } : faq
    ));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(faqs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFaqs(items);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="faqs">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {faqs.map((faq, index) => (
                  <Draggable key={faq.id} draggableId={faq.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="p-4 border rounded-lg space-y-2"
                      >
                        <div className="flex items-center gap-2">
                          <div {...provided.dragHandleProps}>
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <Switch
                            checked={faq.enabled}
                            onCheckedChange={(checked) => handleChange(faq.id, 'enabled', checked)}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveFAQ(faq.id)}
                            className="ml-auto"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <Input
                          value={faq.question}
                          onChange={(e) => handleChange(faq.id, 'question', e.target.value)}
                          placeholder="Question"
                          className="mb-2"
                        />
                        <Textarea
                          value={faq.answer}
                          onChange={(e) => handleChange(faq.id, 'answer', e.target.value)}
                          placeholder="Answer"
                          rows={3}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Button onClick={handleAddFAQ} className="mt-4">
          Add FAQ
        </Button>
      </CardContent>
    </Card>
  );
}