'use client';

import { useRouter } from 'next/navigation';
import GlitchLogo from '@/components/boot/GlitchLogo';

export default function GlitchPage() {
  const router = useRouter();

  const handleComplete = () => {
    router.push('/login');
  };

  return <GlitchLogo onComplete={handleComplete} />;
}
