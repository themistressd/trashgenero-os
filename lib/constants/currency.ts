/**
 * Currency configuration for the gamification system
 */

export interface CurrencyConfig {
  id: string;
  name: string;
  singular_name: string;
  plural_name: string;
  icon: string;
  description: string;
  color: string;
}

export const CURRENCY: Record<string, CurrencyConfig> = {
  pesetrash: {
    id: 'pesetrash',
    name: 'Pesetrash',
    singular_name: 'Pesetrash',
    plural_name: 'Pesetrash',
    icon: '🪙',
    description: 'La moneda universal de La Secta. Úsala para comprar en la Trashtienda.',
    color: '#FFD700',
  },
  estampitas: {
    id: 'estampitas',
    name: 'Estampitas',
    singular_name: 'Estampita',
    plural_name: 'Estampitas',
    icon: '🃏',
    description: 'Badges coleccionables que desbloqueas completando misiones.',
    color: '#FF00FF',
  },
  reliquias: {
    id: 'reliquias',
    name: 'Reliquias',
    singular_name: 'Reliquia',
    plural_name: 'Reliquias',
    icon: '💎',
    description: 'Objetos sagrados del culto. Solo para los más devotos.',
    color: '#00FFFF',
  },
};

/**
 * Get currency config by ID
 */
export const getCurrencyById = (id: string): CurrencyConfig | undefined => {
  return CURRENCY[id];
};

/**
 * Get all currencies
 */
export const getAllCurrencies = (): CurrencyConfig[] => {
  return Object.values(CURRENCY);
};

/**
 * Format currency amount
 */
export const formatCurrency = (
  amount: number,
  currencyId: string,
  options?: {
    showIcon?: boolean;
    showName?: boolean;
  }
): string => {
  const currency = getCurrencyById(currencyId);
  if (!currency) return amount.toString();

  const { showIcon = true, showName = true } = options || {};

  const parts = [];
  if (showIcon) parts.push(currency.icon);
  parts.push(amount.toLocaleString());
  if (showName) parts.push(currency.name);

  return parts.join(' ');
};
