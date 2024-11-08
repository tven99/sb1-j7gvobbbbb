import { Metadata } from 'next';
import DashboardLayout from '@/components/DashboardLayout';
import NegativeWords from '@/components/BotSettings/NegativeWords';
import WebsiteContent from '@/components/BotSettings/WebsiteContent';
import FAQManager from '@/components/BotSettings/FAQManager';
import ChatConnections from '@/components/ChatConnections';
import CRMConnections from '@/components/CRMConnections';

export const metadata: Metadata = {
  title: 'Settings - SaaSify',
  description: 'Configure your chatbot and integration settings',
};

export default function SettingsPage({ params }: { params: { businessId: string } }) {
  return (
    <DashboardLayout businessId={params.businessId}>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Bot Configuration</h2>
          <div className="space-y-6">
            <NegativeWords businessId={params.businessId} />
            <WebsiteContent businessId={params.businessId} />
            <FAQManager businessId={params.businessId} />
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Integrations</h2>
          <div className="space-y-6">
            <ChatConnections businessId={params.businessId} />
            <CRMConnections businessId={params.businessId} />
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}