import DashboardLayout from '@/components/DashboardLayout';
import ChatConnections from '@/components/ChatConnections';
import CRMConnections from '@/components/CRMConnections';

export default function BusinessBotConnections({ params }: { params: { businessId: string } }) {
  return (
    <DashboardLayout businessId={params.businessId}>
      <h1 className="text-3xl font-bold mb-6">Bot Connections</h1>
      <div className="space-y-6">
        <ChatConnections businessId={params.businessId} />
        <CRMConnections businessId={params.businessId} />
      </div>
    </DashboardLayout>
  );
}