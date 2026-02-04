import apiClient, { makeAuthenticatedRequest } from './client';
import type { WPUser, WPPost, WPMedia, WPPage, WPCustomPost, WPTerm } from '@/types/wordpress';

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

// Get page by slug
export const getPageBySlug = async (slug: string): Promise<WPPage | null> => {
  const pages = await makeAuthenticatedRequest<WPPage[]>({
    method: 'GET',
    url: '/wp/v2/pages',
    params: { slug },
  });
  return pages[0] || null;
};

// Get divas (custom post type)
export const getDivas = async (params?: {
  per_page?: number;
  page?: number;
  tipo_diva?: number;
}): Promise<WPCustomPost[]> => {
  return makeAuthenticatedRequest<WPCustomPost[]>({
    method: 'GET',
    url: '/wp/v2/divas',
    params: { _embed: true, ...params },
  });
};

// Get diva types (taxonomy)
export const getDivaTypes = async (): Promise<WPTerm[]> => {
  return makeAuthenticatedRequest<WPTerm[]>({
    method: 'GET',
    url: '/wp/v2/tipo-diva',
  });
};

// Get lookbooks (custom post type)
export const getLookbooks = async (params?: {
  per_page?: number;
  page?: number;
}): Promise<WPCustomPost[]> => {
  return makeAuthenticatedRequest<WPCustomPost[]>({
    method: 'GET',
    url: '/wp/v2/lookbook',
    params: { _embed: true, ...params },
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
