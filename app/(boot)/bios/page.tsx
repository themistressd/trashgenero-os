'use client';

import { useRouter } from 'next/navigation';
import BIOSScreen from '@/components/boot/BIOSScreen';

export default function BIOSPage() {
  const router = useRouter();

  const handleComplete = () => {
    router.push('/glitch');
  };

  return <BIOSScreen onComplete={handleComplete} />;
}
