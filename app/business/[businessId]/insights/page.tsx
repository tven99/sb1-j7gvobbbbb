import DashboardLayout from '@/components/DashboardLayout';
import TopCustomerQuestions from '@/components/TopCustomerQuestions';
import PopularTopics from '@/components/PopularTopics';
import SentimentAnalysis from '@/components/SentimentAnalysis';
import ConversionRates from '@/components/ConversionRates';

export default function BusinessInsights({ params }: { params: { businessId: string } }) {
  return (
    <DashboardLayout businessId={params.businessId}>
      <h1 className="text-3xl font-bold mb-6">Business Insights</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PopularTopics businessId={params.businessId} />
        <SentimentAnalysis businessId={params.businessId} />
        <ConversionRates businessId={params.businessId} />
        <TopCustomerQuestions businessId={params.businessId} />
      </div>
    </DashboardLayout>
  );
}