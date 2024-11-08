import { Metadata } from 'next';
import DashboardLayout from '@/components/DashboardLayout';
import TopCustomerQuestions from '@/components/TopCustomerQuestions';
import PopularTopics from '@/components/PopularTopics';
import SentimentAnalysis from '@/components/SentimentAnalysis';
import ConversionRates from '@/components/ConversionRates';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Insights - SaaSify',
  description: 'View insights, analytics, and top customer questions',
};

export default function InsightsPage() {
  // Redirect to the first business's insights page
  redirect('/business/1/insights');
}