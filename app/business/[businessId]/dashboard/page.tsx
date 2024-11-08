import { Metadata } from 'next';
import DashboardLayout from '@/components/DashboardLayout';
import BusinessInfoForm from '@/components/BusinessInfoForm';

export const metadata: Metadata = {
  title: 'Business Dashboard - SaaSify',
  description: 'Manage your business settings and information',
};

// This is required for static site generation with dynamic routes
export async function generateStaticParams() {
  // In a real app, you would fetch this from your API/database
  return [{ businessId: '1' }];
}

export default function BusinessDashboard({ params }: { params: { businessId: string } }) {
  return (
    <DashboardLayout businessId={params.businessId}>
      <h1 className="text-3xl font-bold mb-6">Business Dashboard</h1>
      <BusinessInfoForm businessId={params.businessId} />
    </DashboardLayout>
  );
}