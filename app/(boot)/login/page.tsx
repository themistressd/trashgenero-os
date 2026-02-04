'use client';

import { useRouter } from 'next/navigation';
import AutoLogin from '@/components/boot/AutoLogin';

export default function LoginPage() {
  const router = useRouter();

  const handleComplete = () => {
    router.push('/desktop');
  };

  return <AutoLogin onComplete={handleComplete} />;
}
