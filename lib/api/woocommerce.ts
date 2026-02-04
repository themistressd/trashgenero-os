import apiClient, { makeAuthenticatedRequest } from './client';
import type { Product, Cart, CartItem, Order, CheckoutData } from '@/types/woocommerce';

/**
 * WooCommerce API client
 */

// Get products
export const getProducts = async (params?: {
  per_page?: number;
  page?: number;
  category?: number;
  tag?: number;
  search?: string;
  featured?: boolean;
  on_sale?: boolean;
  min_price?: number;
  max_price?: number;
}): Promise<Product[]> => {
  return makeAuthenticatedRequest<Product[]>({
    method: 'GET',
    url: '/wc/v3/products',
    params,
  });
};

// Get product by ID
export const getProductById = async (productId: number): Promise<Product> => {
  return makeAuthenticatedRequest<Product>({
    method: 'GET',
    url: `/wc/v3/products/${productId}`,
  });
};

// Get cart
export const getCart = async (): Promise<Cart> => {
  return makeAuthenticatedRequest<Cart>({
    method: 'GET',
    url: '/wc/store/v1/cart',
  });
};

// Add item to cart
export const addToCart = async (productId: number, quantity: number = 1): Promise<Cart> => {
  return makeAuthenticatedRequest<Cart>({
    method: 'POST',
    url: '/wc/store/v1/cart/add-item',
    data: {
      id: productId,
      quantity,
    },
  });
};

// Update cart item
export const updateCartItem = async (
  itemKey: string,
  quantity: number
): Promise<Cart> => {
  return makeAuthenticatedRequest<Cart>({
    method: 'POST',
    url: `/wc/store/v1/cart/items/${itemKey}`,
    data: {
      quantity,
    },
  });
};

// Remove cart item
export const removeCartItem = async (itemKey: string): Promise<Cart> => {
  return makeAuthenticatedRequest<Cart>({
    method: 'DELETE',
    url: `/wc/store/v1/cart/items/${itemKey}`,
  });
};

// Clear cart
export const clearCart = async (): Promise<Cart> => {
  return makeAuthenticatedRequest<Cart>({
    method: 'DELETE',
    url: '/wc/store/v1/cart/items',
  });
};

// Create order
export const createOrder = async (checkoutData: CheckoutData): Promise<Order> => {
  return makeAuthenticatedRequest<Order>({
    method: 'POST',
    url: '/wc/v3/orders',
    data: checkoutData,
  });
};

// Get order by ID
export const getOrderById = async (orderId: number): Promise<Order> => {
  return makeAuthenticatedRequest<Order>({
    method: 'GET',
    url: `/wc/v3/orders/${orderId}`,
  });
};

// Get user orders
export const getUserOrders = async (params?: {
  per_page?: number;
  page?: number;
}): Promise<Order[]> => {
  return makeAuthenticatedRequest<Order[]>({
    method: 'GET',
    url: '/wc/v3/orders',
    params: {
      ...params,
      customer: 'me',
    },
  });
};
