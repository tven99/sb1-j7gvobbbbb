"use client"

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';

interface TopCustomerQuestionsProps {
  businessId: string;
}

const initialQuestions = [
  {
    id: '1',
    question: 'What are the key features of SaaSify?',
    answer: 'SaaSify offers AI-powered conversations, lead qualification, CRM integration, multilingual support, and customizable workflows. It helps businesses boost customer satisfaction, increase sales efficiency, and streamline operations.'
  },
  {
    id: '2',
    question: 'How does SaaSify integrate with WhatsApp?',
    answer: 'SaaSify integrates with WhatsApp through our multi-channel support feature. This allows businesses to engage with customers on WhatsApp using our AI-powered chatbot, providing seamless communication and support.'
  },
  {
    id: '3',
    question: 'Can SaaSify qualify leads automatically?',
    answer: 'Yes, SaaSify uses AI to automatically qualify leads. It identifies potential prospects, gathers key information, and routes qualified leads to your sales team, improving conversion rates and focusing efforts on high-priority prospects.'
  },
  {
    id: '4',
    question: 'What CRM systems does SaaSify integrate with?',
    answer: 'SaaSify integrates with popular CRM systems such as Salesforce, HubSpot, and Zoho. Our platform ensures that customer interactions and data are synced in real-time, enabling personalized customer experiences and better tracking.'
  },
  {
    id: '5',
    question: 'How does SaaSify handle multiple languages?',
    answer: 'SaaSify supports multilingual interactions through advanced natural language processing. This allows businesses to communicate with customers in multiple languages, catering to diverse customer bases and expanding global reach.'
  },
];

export default function TopCustomerQuestions({ businessId }: TopCustomerQuestionsProps) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuestions = questions.filter(q => 
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Customer Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        <Accordion type="single" collapsible className="w-full">
          {filteredQuestions.map((q) => (
            <AccordionItem key={q.id} value={q.id}>
              <AccordionTrigger>{q.question}</AccordionTrigger>
              <AccordionContent>{q.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}