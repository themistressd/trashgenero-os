import { useEffect } from 'react';
import { useBootStore } from '@/lib/store/bootStore';
import { useRouter } from 'next/navigation';

/**
 * Hook to manage boot sequence
 */
export const useBootSequence = () => {
  const router = useRouter();
  const {
    currentStage,
    hasBooted,
    skipBoot,
    isLoading,
    error,
    setStage,
    nextStage,
    setHasBooted,
    setSkipBoot,
    setLoading,
    setError,
    reset,
  } = useBootStore();

  // Check if should skip boot on mount
  useEffect(() => {
    const enableBootSequence = process.env.NEXT_PUBLIC_ENABLE_BOOT_SEQUENCE === 'true';
    
    if (!enableBootSequence || (hasBooted && skipBoot)) {
      // Skip boot and go directly to desktop
      setStage('desktop');
    }
  }, []);

  // Auto-advance through boot stages
  const startBootSequence = (autoAdvance: boolean = true) => {
    setStage('bios');
    setLoading(true);

    if (autoAdvance) {
      // BIOS stage - 2 seconds
      setTimeout(() => {
        setStage('glitch');
      }, 2000);

      // Glitch stage - 1.5 seconds
      setTimeout(() => {
        setStage('login');
      }, 3500);

      // Login stage - 1.5 seconds
      setTimeout(() => {
        setStage('desktop');
        setLoading(false);
        setHasBooted(true);
        setSkipBoot(true);
      }, 5000);
    }
  };

  // Manual stage advancement
  const advanceStage = () => {
    if (currentStage === 'desktop') {
      setHasBooted(true);
      setSkipBoot(true);
      return;
    }
    nextStage();
  };

  // Complete boot sequence
  const completeBoot = () => {
    setStage('desktop');
    setHasBooted(true);
    setSkipBoot(true);
    setLoading(false);
  };

  // Reset boot sequence (for testing)
  const resetBoot = () => {
    reset();
  };

  return {
    currentStage,
    hasBooted,
    skipBoot,
    isLoading,
    error,
    startBootSequence,
    advanceStage,
    completeBoot,
    resetBoot,
    setError,
  };
};
