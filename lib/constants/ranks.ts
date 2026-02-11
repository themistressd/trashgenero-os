/**
 * Rank discount configuration for Trashtienda
 */
export interface RankDiscount {
  name: string;
  emoji: string;
  discount: number;
}

export const RANK_DISCOUNTS: Record<string, RankDiscount> = {
  'novicia-normativa': { 
    name: 'Novicia Normativa', 
    emoji: '🐑', 
    discount: 0 
  },
  'monaguillo-del-rastro': { 
    name: 'Monaguillo del Rastro', 
    emoji: '🧺', 
    discount: 5 
  },
  'aprendiz-maricon': { 
    name: 'Aprendiz Maricón', 
    emoji: '💅', 
    discount: 10 
  },
  'sacerdote-del-patron': { 
    name: 'Sacerdote del Patrón', 
    emoji: '✂️', 
    discount: 15 
  },
  'martir-del-latex': { 
    name: 'Mártir del Látex', 
    emoji: '⛓️', 
    discount: 20 
  },
  'cardenal-trash-couture': { 
    name: 'Cardenal de la Trash Couture', 
    emoji: '💍', 
    discount: 25 
  },
  'suprema-trashtornada': { 
    name: 'Suprema Trashtornada', 
    emoji: '👑', 
    discount: 30 
  },
};

/**
 * Get rank discount data by slug
 */
export const getRankDiscount = (slug: string): RankDiscount => {
  return RANK_DISCOUNTS[slug] || RANK_DISCOUNTS['novicia-normativa'];
};


/**
 * Get rank data by slug without fallback
 */
export const getRankBySlug = (slug: string): RankDiscount | undefined => {
  return RANK_DISCOUNTS[slug];
};

/**
 * Get rank display name by slug
 */
export const getRankNameBySlug = (slug: string): string => {
  return getRankBySlug(slug)?.name || slug;
};
