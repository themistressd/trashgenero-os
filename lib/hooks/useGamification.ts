import useSWR from 'swr';
import {
  getUserGamification,
  getRanks,
  getPointsHistory,
} from '@/lib/api/gamification';
import type { UserGamification, Rank, PointHistory } from '@/types/gamification';

/**
 * Hook to fetch user gamification data
 */
export const useGamification = () => {
  const { data, error, isLoading, mutate } = useSWR<UserGamification>(
    'user-gamification',
    getUserGamification,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 30000, // 30 seconds cache
    }
  );

  return {
    gamification: data,
    isLoading,
    isError: error,
    refresh: mutate,
  };
};

/**
 * Hook to fetch all ranks
 */
export const useRanks = () => {
  const { data, error, isLoading, mutate } = useSWR<Rank[]>(
    'ranks',
    getRanks,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute cache
    }
  );

  return {
    ranks: data || [],
    isLoading,
    isError: error,
    refresh: mutate,
  };
};

/**
 * Hook to fetch points history
 */
export const usePointsHistory = (
  pointType: 'pesetrash' | 'estampitas' | 'reliquias',
  page: number = 1,
  perPage: number = 20
) => {
  const { data, error, isLoading, mutate } = useSWR<PointHistory[]>(
    ['points-history', pointType, page, perPage],
    () => getPointsHistory(pointType, { page, per_page: perPage }),
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    }
  );

  return {
    history: data || [],
    isLoading,
    isError: error,
    refresh: mutate,
  };
};
