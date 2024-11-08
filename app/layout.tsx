import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from "@/components/theme-provider";
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'SaaSify - Your Ultimate SaaS Solution',
  description: 'Streamline your business with our powerful SaaS platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BusinessProvider>
            {children}
            <Toaster />
          </BusinessProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}