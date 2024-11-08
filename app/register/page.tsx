import { Metadata } from 'next';
import RegisterForm from '@/components/RegisterForm';

export const metadata: Metadata = {
  title: 'Register - SaaSify',
  description: 'Create your account on SaaSify',
};

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Your SaaSify Account</h1>
      <RegisterForm />
    </div>
  );
}