// GamiPress Types
export interface PointType {
  id: string;
  name: string;
  singular_name: string;
  plural_name: string;
  amount: number;
  icon?: string;
  color?: string;
}

export interface Rank {
  id: number;
  title: string;
  slug: string;
  description: string;
  order: number;
  image?: string;
  requirements: RankRequirement[];
}

export interface RankRequirement {
  id: number;
  type: string;
  count: number;
  achievement_type?: string;
  points_type?: string;
  points_required?: number;
}

export interface UserGamification {
  points: {
    pesetrash: number;
    estampitas: number;
    reliquias: number;
  };
  rank: Rank | null;
  next_rank: Rank | null;
  can_rank_up: boolean;
  progress_to_next: number;
}

export interface PointHistory {
  id: number;
  user_id: number;
  points: number;
  points_type: string;
  date: string;
  description: string;
  log_type: string;
}

export interface GamificationResponse {
  success: boolean;
  data: UserGamification;
}

export interface RanksResponse {
  success: boolean;
  data: Rank[];
}

export interface PointHistoryResponse {
  success: boolean;
  data: PointHistory[];
}
