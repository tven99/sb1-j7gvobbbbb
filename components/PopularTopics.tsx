"use client"

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface PopularTopicsProps {
  businessId: string;
}

const data = [
  { topic: 'Pricing', count: 120 },
  { topic: 'Features', count: 98 },
  { topic: 'Integration', count: 86 },
  { topic: 'Support', count: 75 },
  { topic: 'Security', count: 65 },
];

export default function PopularTopics({ businessId }: PopularTopicsProps) {
  const maxCount = Math.max(...data.map(d => d.count));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Topics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.topic} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{item.topic}</span>
                <span className="text-muted-foreground">{item.count} queries</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all"
                  style={{ width: `${(item.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}