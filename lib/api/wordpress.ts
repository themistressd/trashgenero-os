import apiClient, { makeAuthenticatedRequest } from './client';
import type { WPUser, WPPost, WPMedia } from '@/types/wordpress';

/**
 * WordPress API client
 */

// Get current user
export const getCurrentUser = async (): Promise<WPUser> => {
  return makeAuthenticatedRequest<WPUser>({
    method: 'GET',
    url: '/wp/v2/users/me',
  });
};

// Get user by ID
export const getUserById = async (userId: number): Promise<WPUser> => {
  return makeAuthenticatedRequest<WPUser>({
    method: 'GET',
    url: `/wp/v2/users/${userId}`,
  });
};

// Get posts
export const getPosts = async (params?: {
  per_page?: number;
  page?: number;
  categories?: number[];
  tags?: number[];
}): Promise<WPPost[]> => {
  return makeAuthenticatedRequest<WPPost[]>({
    method: 'GET',
    url: '/wp/v2/posts',
    params,
  });
};

// Get post by ID
export const getPostById = async (postId: number): Promise<WPPost> => {
  return makeAuthenticatedRequest<WPPost>({
    method: 'GET',
    url: `/wp/v2/posts/${postId}`,
  });
};

// Get media
export const getMedia = async (mediaId: number): Promise<WPMedia> => {
  return makeAuthenticatedRequest<WPMedia>({
    method: 'GET',
    url: `/wp/v2/media/${mediaId}`,
  });
};

// Login with JWT
export const loginWithJWT = async (username: string, password: string) => {
  const response = await apiClient.post('/jwt-auth/v1/token', {
    username,
    password,
  });
  return response.data;
};

// Validate JWT token
export const validateToken = async (token: string) => {
  const response = await apiClient.post(
    '/jwt-auth/v1/token/validate',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
