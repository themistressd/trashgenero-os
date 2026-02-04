import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BootStage = 'bios' | 'glitch' | 'login' | 'desktop';

interface BootState {
  currentStage: BootStage;
  hasBooted: boolean;
  skipBoot: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setStage: (stage: BootStage) => void;
  nextStage: () => void;
  setHasBooted: (hasBooted: boolean) => void;
  setSkipBoot: (skip: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const stages: BootStage[] = ['bios', 'glitch', 'login', 'desktop'];

export const useBootStore = create<BootState>()(
  persist(
    (set, get) => ({
      currentStage: 'bios',
      hasBooted: false,
      skipBoot: false,
      isLoading: false,
      error: null,

      setStage: (stage) => set({ currentStage: stage }),

      nextStage: () => {
        const currentIndex = stages.indexOf(get().currentStage);
        if (currentIndex < stages.length - 1) {
          set({ currentStage: stages[currentIndex + 1] });
        }
      },

      setHasBooted: (hasBooted) => set({ hasBooted }),

      setSkipBoot: (skip) => set({ skipBoot: skip }),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      reset: () =>
        set({
          currentStage: 'bios',
          hasBooted: false,
          skipBoot: false,
          isLoading: false,
          error: null,
        }),
    }),
    {
      name: 'trash-os-boot',
      partialize: (state) => ({
        hasBooted: state.hasBooted,
        skipBoot: state.skipBoot,
      }),
    }
  )
);
