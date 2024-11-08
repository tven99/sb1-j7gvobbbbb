import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BusinessSelector from '@/components/BusinessSelector';
import { Button } from '@/components/ui/button';
import { Settings, BarChart2, MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface DashboardLayoutProps {
  children: React.ReactNode;
  businessId: string;
}

export default function DashboardLayout({ children, businessId }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-grow flex">
        <aside className="w-64 bg-muted p-4">
          <BusinessSelector />
          <nav className="space-y-2 mt-4">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href={`/business/${businessId}/dashboard`}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href={`/business/${businessId}/insights`}>
                <BarChart2 className="mr-2 h-4 w-4" />
                Insights
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href={`/business/${businessId}/settings`}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
          </nav>
        </aside>
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}