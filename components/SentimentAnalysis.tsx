"use client"

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface SentimentAnalysisProps {
  businessId: string;
}

const data = [
  { name: 'Positive', value: 60, color: 'bg-green-500' },
  { name: 'Neutral', value: 30, color: 'bg-blue-500' },
  { name: 'Negative', value: 10, color: 'bg-red-500' },
];

export default function SentimentAnalysis({ businessId }: SentimentAnalysisProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {data.map((item) => (
            <div key={item.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{item.name}</span>
                <span className="text-muted-foreground">{item.value}%</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full ${item.color} transition-all`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}