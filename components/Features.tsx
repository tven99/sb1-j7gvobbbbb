import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, BarChart, Users, Zap, MessageCircle, Phone, List } from 'lucide-react';

const features = [
  {
    title: 'AI-Powered Chatbot',
    description: 'Leverage OpenAI\'s advanced language model for natural conversations.',
    icon: Bot,
  },
  {
    title: 'Lead Qualification',
    description: 'Automatically qualify leads based on predefined criteria.',
    icon: BarChart,
  },
  {
    title: 'CRM Integration',
    description: 'Seamlessly integrate with your existing CRM system.',
    icon: Users,
  },
  {
    title: 'Quick Setup',
    description: 'Get started in minutes with our easy-to-use platform.',
    icon: Zap,
  },
  {
    title: 'Multi-Channel Integration',
    description: 'Connect with WhatsApp, Instagram, and other popular messaging platforms.',
    icon: MessageCircle,
  },
  {
    title: 'Top Customer Questions',
    description: 'Instantly address common queries for new and existing customers.',
    icon: List,
  },
  {
    title: 'Contact Capture',
    description: 'Smartly collect contact information during conversations.',
    icon: Phone,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="w-10 h-10 mb-4 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}