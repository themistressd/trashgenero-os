'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBootStore } from '@/lib/store/bootStore';

export default function Home() {
  const router = useRouter();
  const { hasBooted, skipBoot } = useBootStore();

  useEffect(() => {
    const enableBootSequence = process.env.NEXT_PUBLIC_ENABLE_BOOT_SEQUENCE === 'true';
    
    if (enableBootSequence && !hasBooted && !skipBoot) {
      // Show boot sequence
      router.push('/bios');
    } else {
      // Go directly to desktop
      router.push('/desktop');
    }
  }, [hasBooted, skipBoot, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-void-black">
      <div className="animate-spin text-4xl">⚡</div>
    </div>
  );
}
