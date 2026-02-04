import apiClient, { makeAuthenticatedRequest } from './client';
import type {
  UserGamification,
  Rank,
  PointHistory,
  GamificationResponse,
  RanksResponse,
  PointHistoryResponse,
  Achievement,
  AchievementsResponse,
  UserStats,
  StatsResponse,
  ActivityLog,
  ActivityLogsResponse,
} from '@/types/gamification';

const namespace = process.env.NEXT_PUBLIC_GAMIPRESS_API_NAMESPACE || 'trashgenero/v1';

/**
 * GamiPress API client
 */

// Get user gamification data
export const getUserGamification = async (): Promise<UserGamification> => {
  try {
    const response = await makeAuthenticatedRequest<GamificationResponse>({
      method: 'GET',
      url: `/${namespace}/user/gamification`,
    });
    return response.data;
  } catch {
    // Return mock data if API fails
    return {
      points: {
        pesetrash: 0,
        estampitas: 0,
        reliquias: 0,
      },
      rank: null,
      next_rank: null,
      can_rank_up: false,
      progress_to_next: 0,
    };
  }
};

// Get all ranks
export const getRanks = async (): Promise<Rank[]> => {
  try {
    const response = await makeAuthenticatedRequest<RanksResponse>({
      method: 'GET',
      url: `/${namespace}/ranks`,
    });
    return response.data;
  } catch {
    // Return empty array if API fails
    return [];
  }
};

// Get rank by ID
export const getRankById = async (rankId: number): Promise<Rank> => {
  return makeAuthenticatedRequest<Rank>({
    method: 'GET',
    url: `/${namespace}/ranks/${rankId}`,
  });
};

// Get points history
export const getPointsHistory = async (
  pointType: 'pesetrash' | 'estampitas' | 'reliquias',
  params?: {
    per_page?: number;
    page?: number;
  }
): Promise<PointHistory[]> => {
  try {
    const response = await makeAuthenticatedRequest<PointHistoryResponse>({
      method: 'GET',
      url: `/${namespace}/points/${pointType}/history`,
      params,
    });
    return response.data;
  } catch {
    // Return empty array if API fails
    return [];
  }
};

// Award points (admin only)
export const awardPoints = async (
  userId: number,
  pointType: string,
  points: number,
  description: string
): Promise<{ success: boolean }> => {
  return makeAuthenticatedRequest<{ success: boolean }>({
    method: 'POST',
    url: `/${namespace}/points/award`,
    data: {
      user_id: userId,
      points_type: pointType,
      points,
      description,
    },
  });
};

// Deduct points (admin only)
export const deductPoints = async (
  userId: number,
  pointType: string,
  points: number,
  description: string
): Promise<{ success: boolean }> => {
  return makeAuthenticatedRequest<{ success: boolean }>({
    method: 'POST',
    url: `/${namespace}/points/deduct`,
    data: {
      user_id: userId,
      points_type: pointType,
      points,
      description,
    },
  });
};

// Check if user can rank up
export const canUserRankUp = async (): Promise<boolean> => {
  try {
    const gamification = await getUserGamification();
    return gamification.can_rank_up;
  } catch {
    return false;
  }
};

// Rank up user
export const rankUpUser = async (): Promise<{ success: boolean; new_rank: Rank }> => {
  return makeAuthenticatedRequest<{ success: boolean; new_rank: Rank }>({
    method: 'POST',
    url: `/${namespace}/rank/up`,
  });
};

// Get user achievements
export const getUserAchievements = async (): Promise<Achievement[]> => {
  try {
    const response = await makeAuthenticatedRequest<AchievementsResponse>({
      method: 'GET',
      url: `/${namespace}/user/achievements`,
    });
    return response.data;
  } catch {
    // Return mock data if API fails
    return [
      {
        id: 1,
        title: 'Primera Bruja',
        description: 'Completa tu primer ritual',
        icon: '👑',
        unlocked: true,
        unlocked_at: '2025-01-15T10:30:00Z',
        points_awarded: 50,
      },
      {
        id: 2,
        title: 'Glam Máximo',
        description: 'Alcanza 1000 puntos de estilo',
        icon: '💀',
        unlocked: true,
        unlocked_at: '2025-01-20T14:20:00Z',
        points_awarded: 100,
      },
      {
        id: 3,
        title: 'Trash Queen',
        description: 'Completa 10 rituales',
        icon: '✨',
        unlocked: true,
        unlocked_at: '2025-02-01T09:15:00Z',
        points_awarded: 150,
      },
      {
        id: 4,
        title: 'Rituales Mágicos',
        description: 'Participa en un evento especial',
        icon: '🔮',
        unlocked: false,
        points_awarded: 200,
      },
      {
        id: 5,
        title: 'Shopper Supreme',
        description: 'Realiza 5 compras',
        icon: '🛍️',
        unlocked: false,
        points_awarded: 100,
      },
    ];
  }
};

// Get user stats
export const getUserStats = async (): Promise<UserStats> => {
  try {
    const response = await makeAuthenticatedRequest<StatsResponse>({
      method: 'GET',
      url: `/${namespace}/user/stats`,
    });
    return response.data;
  } catch {
    // Return mock data if API fails
    return {
      total_points_earned: 5420,
      challenges_completed: 28,
      achievements_unlocked: 15,
      days_active: 47,
      current_streak: 7,
      total_purchases: 3,
      total_spent: 89.99,
    };
  }
};

// Get recent activity
export const getRecentActivity = async (limit: number = 10): Promise<ActivityLog[]> => {
  try {
    const response = await makeAuthenticatedRequest<ActivityLogsResponse>({
      method: 'GET',
      url: `/${namespace}/user/activity`,
      params: { limit },
    });
    return response.data;
  } catch {
    // Return mock data if API fails
    return [
      {
        id: 1,
        type: 'points',
        title: 'Compra completada',
        description: 'Has ganado Pesetrash',
        amount: 50,
        currency: 'pesetrash',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        icon: '🪙',
      },
      {
        id: 2,
        type: 'challenge',
        title: 'Challenge "Glam Witch"',
        description: 'Has completado un desafío',
        amount: 10,
        currency: 'estampitas',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        icon: '🃏',
      },
      {
        id: 3,
        type: 'achievement',
        title: 'Logro: "Primera Bruja"',
        description: 'Has desbloqueado un logro',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        icon: '🏆',
      },
      {
        id: 4,
        type: 'points',
        title: 'Comentario en blog',
        description: 'Has ganado Pesetrash',
        amount: 25,
        currency: 'pesetrash',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        icon: '🪙',
      },
    ];
  }
};

// Prevent unused import warning
void apiClient;
