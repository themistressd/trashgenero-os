'use client';

import { useRouter } from 'next/navigation';
import FakeLoginScreen from '@/components/boot/FakeLoginScreen';

export default function LoginPage() {
  const router = useRouter();

  const handleComplete = () => {
    router.push('/desktop');
  };

  return <FakeLoginScreen onComplete={handleComplete} />;
}
