import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="py-20 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-6">AI-Powered Customer Service &amp; Lead Qualification</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Streamline your customer interactions and qualify leads effortlessly with our intelligent chatbot platform.
        </p>
        <Button size="lg" className="mr-4" asChild>
          <Link href="/register">Get Started</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/login">Schedule Demo</Link>
        </Button>
      </div>
    </section>
  );
}