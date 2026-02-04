import apiClient, { makeAuthenticatedRequest } from './client';
import type {
  UserGamification,
  Rank,
  PointHistory,
  GamificationResponse,
  RanksResponse,
  PointHistoryResponse,
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

// Prevent unused import warning
void apiClient;
