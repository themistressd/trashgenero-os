import useSWR from 'swr';
import {
  getUserGamification,
  getRanks,
  getPointsHistory,
  getUserAchievements,
  getUserStats,
  getRecentActivity,
} from '@/lib/api/gamification';
import type { 
  UserGamification, 
  Rank, 
  PointHistory,
  Achievement,
  UserStats,
  ActivityLog,
} from '@/types/gamification';

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

/**
 * Hook to fetch user achievements
 */
export const useAchievements = () => {
  const { data, error, isLoading, mutate } = useSWR<Achievement[]>(
    'user-achievements',
    getUserAchievements,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute cache
    }
  );

  const unlocked = data?.filter((a) => a.unlocked) || [];
  const locked = data?.filter((a) => !a.unlocked) || [];

  return {
    achievements: data || [],
    unlocked,
    locked,
    isLoading,
    isError: error,
    refresh: mutate,
  };
};

/**
 * Hook to fetch user stats
 */
export const useUserStats = () => {
  const { data, error, isLoading, mutate } = useSWR<UserStats>(
    'user-stats',
    getUserStats,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000, // 30 seconds cache
    }
  );

  return {
    stats: data,
    isLoading,
    isError: error,
    refresh: mutate,
  };
};

/**
 * Hook to fetch recent activity
 */
export const useRecentActivity = (limit: number = 10) => {
  const { data, error, isLoading, mutate } = useSWR<ActivityLog[]>(
    ['recent-activity', limit],
    () => getRecentActivity(limit),
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000, // 30 seconds cache
    }
  );

  return {
    activities: data || [],
    isLoading,
    isError: error,
    refresh: mutate,
  };
};
