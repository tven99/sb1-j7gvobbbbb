import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import ChatbotDemo from '@/components/ChatbotDemo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <ChatbotDemo />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}