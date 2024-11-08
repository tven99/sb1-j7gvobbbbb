import { redirect } from 'next/navigation';

export default function BotSettingsPage({ params }: { params: { businessId: string } }) {
  redirect(`/business/${params.businessId}/settings`);
}