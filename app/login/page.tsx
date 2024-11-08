import { Metadata } from 'next';
import LoginForm from '@/components/LoginForm';

export const metadata: Metadata = {
  title: 'Login - SaaSify',
  description: 'Log in to your SaaSify account',
};

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Log in to SaaSify</h1>
      <LoginForm />
    </div>
  );
}