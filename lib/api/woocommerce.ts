import { makeAuthenticatedRequest } from './client';
import { resolveFallback } from '@/lib/config/apiFallback';
import type { Product, Cart, Order, CheckoutData } from '@/types/woocommerce';

/**
 * WooCommerce API client
 */

// Mock products for fallback
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Camiseta Trash Couture',
    slug: 'camiseta-trash-couture',
    permalink: '#',
    date_created: '2024-01-01',
    date_modified: '2024-01-01',
    type: 'simple',
    status: 'publish',
    featured: true,
    description: 'Camiseta exclusiva con diseño Trash Couture. 100% algodón orgánico. Edición limitada.',
    short_description: 'Camiseta exclusiva Trash Couture',
    sku: 'TRASH-001',
    price: '35.00',
    regular_price: '35.00',
    sale_price: '',
    on_sale: false,
    purchasable: true,
    total_sales: 42,
    virtual: false,
    downloadable: false,
    categories: [{ id: 1, name: 'Ropa', slug: 'ropa' }],
    tags: [{ id: 1, name: 'Nuevo', slug: 'nuevo' }],
    images: [
      { 
        id: 1, 
        src: 'https://via.placeholder.com/800x800/FF00FF/FFFFFF?text=Trash+Couture+Tee', 
        name: 'Camiseta Trash', 
        alt: 'Camiseta Trash Couture' 
      }
    ],
    attributes: [],
    stock_status: 'instock',
    stock_quantity: 50,
  },
  {
    id: 2,
    name: 'Sudadera Suprema Trashtornada',
    slug: 'sudadera-suprema',
    permalink: '#',
    date_created: '2024-01-02',
    date_modified: '2024-01-02',
    type: 'simple',
    status: 'publish',
    featured: true,
    description: 'Sudadera oversized con el logo Suprema Trashtornada. Perfecta para rituales nocturnos.',
    short_description: 'Sudadera oversized premium',
    sku: 'TRASH-002',
    price: '65.00',
    regular_price: '75.00',
    sale_price: '65.00',
    on_sale: true,
    purchasable: true,
    total_sales: 28,
    virtual: false,
    downloadable: false,
    categories: [{ id: 1, name: 'Ropa', slug: 'ropa' }],
    tags: [{ id: 2, name: 'Descuento', slug: 'descuento' }],
    images: [
      { 
        id: 2, 
        src: 'https://via.placeholder.com/800x800/9333EA/FFFFFF?text=Suprema+Hoodie', 
        name: 'Sudadera Suprema', 
        alt: 'Sudadera Suprema Trashtornada' 
      }
    ],
    attributes: [],
    stock_status: 'instock',
    stock_quantity: 30,
  },
  {
    id: 3,
    name: 'Accesorio Látex Místico',
    slug: 'accesorio-latex',
    permalink: '#',
    date_created: '2024-01-03',
    date_modified: '2024-01-03',
    type: 'simple',
    status: 'publish',
    featured: false,
    description: 'Accesorio de látex hecho a mano. Perfecto para ceremonias especiales.',
    short_description: 'Accesorio látex artesanal',
    sku: 'TRASH-003',
    price: '28.00',
    regular_price: '28.00',
    sale_price: '',
    on_sale: false,
    purchasable: true,
    total_sales: 15,
    virtual: false,
    downloadable: false,
    categories: [{ id: 2, name: 'Accesorios', slug: 'accesorios' }],
    tags: [],
    images: [
      { 
        id: 3, 
        src: 'https://via.placeholder.com/800x800/000000/FF00FF?text=Latex+Mystic', 
        name: 'Accesorio Látex', 
        alt: 'Accesorio Látex Místico' 
      }
    ],
    attributes: [],
    stock_status: 'instock',
    stock_quantity: 20,
  },
  {
    id: 4,
    name: 'Poster Manifiesto Trash',
    slug: 'poster-manifiesto',
    permalink: '#',
    date_created: '2024-01-04',
    date_modified: '2024-01-04',
    type: 'simple',
    status: 'publish',
    featured: false,
    description: 'Poster del manifiesto oficial TrashGènero. 50x70cm, impresión de alta calidad.',
    short_description: 'Poster manifiesto 50x70cm',
    sku: 'TRASH-004',
    price: '15.00',
    regular_price: '15.00',
    sale_price: '',
    on_sale: false,
    purchasable: true,
    total_sales: 67,
    virtual: false,
    downloadable: false,
    categories: [{ id: 3, name: 'Arte', slug: 'arte' }],
    tags: [],
    images: [
      { 
        id: 4, 
        src: 'https://via.placeholder.com/800x800/FF00FF/000000?text=Manifiesto', 
        name: 'Poster Manifiesto', 
        alt: 'Poster Manifiesto Trash' 
      }
    ],
    attributes: [],
    stock_status: 'instock',
    stock_quantity: 100,
  },
  {
    id: 5,
    name: 'Pack 3 Estampitas Sagradas',
    slug: 'pack-estampitas',
    permalink: '#',
    date_created: '2024-01-05',
    date_modified: '2024-01-05',
    type: 'simple',
    status: 'publish',
    featured: false,
    description: 'Pack de 3 estampitas coleccionables con diseños exclusivos de santos trash.',
    short_description: 'Pack 3 estampitas coleccionables',
    sku: 'TRASH-005',
    price: '8.00',
    regular_price: '8.00',
    sale_price: '',
    on_sale: false,
    purchasable: true,
    total_sales: 93,
    virtual: false,
    downloadable: false,
    categories: [{ id: 4, name: 'Coleccionables', slug: 'coleccionables' }],
    tags: [{ id: 1, name: 'Nuevo', slug: 'nuevo' }],
    images: [
      { 
        id: 5, 
        src: 'https://via.placeholder.com/800x800/9333EA/FFFFFF?text=Estampitas', 
        name: 'Pack Estampitas', 
        alt: 'Pack Estampitas Sagradas' 
      }
    ],
    attributes: [],
    stock_status: 'instock',
    stock_quantity: 150,
  },
  {
    id: 6,
    name: 'Tote Bag Rastro Divino',
    slug: 'tote-bag-rastro',
    permalink: '#',
    date_created: '2024-01-06',
    date_modified: '2024-01-06',
    type: 'simple',
    status: 'publish',
    featured: false,
    description: 'Tote bag de algodón orgánico con serigrafía del logo Rastro Divino.',
    short_description: 'Tote bag algodón orgánico',
    sku: 'TRASH-006',
    price: '18.00',
    regular_price: '22.00',
    sale_price: '18.00',
    on_sale: true,
    purchasable: true,
    total_sales: 55,
    virtual: false,
    downloadable: false,
    categories: [{ id: 2, name: 'Accesorios', slug: 'accesorios' }],
    tags: [{ id: 2, name: 'Descuento', slug: 'descuento' }],
    images: [
      { 
        id: 6, 
        src: 'https://via.placeholder.com/800x800/000000/00FF00?text=Tote+Bag', 
        name: 'Tote Bag', 
        alt: 'Tote Bag Rastro Divino' 
      }
    ],
    attributes: [],
    stock_status: 'instock',
    stock_quantity: 75,
  },
];


const createEmptyCart = (): Cart => ({
  items: [],
  items_count: 0,
  items_weight: 0,
  needs_payment: false,
  needs_shipping: false,
  subtotal: '0',
  subtotal_tax: '0',
  total: '0',
  total_tax: '0',
  shipping_total: '0',
  shipping_tax: '0',
  discount_total: '0',
  discount_tax: '0',
});

const createMockOrder = (checkoutData: CheckoutData, orderId?: number): Order => {
  const now = new Date().toISOString();
  const line_items = checkoutData.line_items.map((item, index) => {
    const product = MOCK_PRODUCTS.find((p) => p.id === item.product_id);
    const price = parseFloat(product?.price || '0');
    const subtotal = (price * item.quantity).toFixed(2);

    return {
      id: index + 1,
      name: product?.name || `Producto ${item.product_id}`,
      product_id: item.product_id,
      quantity: item.quantity,
      subtotal,
      total: subtotal,
      price,
    };
  });

  const subtotalValue = line_items.reduce((acc, item) => acc + Number(item.total), 0).toFixed(2);

  return {
    id: orderId ?? Date.now(),
    parent_id: 0,
    status: 'pending',
    currency: 'EUR',
    date_created: now,
    date_modified: now,
    total: subtotalValue,
    subtotal: subtotalValue,
    total_tax: '0.00',
    line_items,
    billing: checkoutData.billing,
    shipping: checkoutData.shipping,
  };
};

const MOCK_CATEGORIES = [
  { id: 1, name: 'Ropa', slug: 'ropa', count: 2 },
  { id: 2, name: 'Accesorios', slug: 'accesorios', count: 2 },
  { id: 3, name: 'Arte', slug: 'arte', count: 1 },
  { id: 4, name: 'Coleccionables', slug: 'coleccionables', count: 1 },
];

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
  try {
    return await makeAuthenticatedRequest<Product[]>({
      method: 'GET',
      url: '/wc/v3/products',
      params,
    });
  } catch (error) {
    console.warn('WooCommerce API unavailable, using mock data', error);
    
    // Filter mock products based on params
    let filtered = [...MOCK_PRODUCTS];
    
    if (params?.category) {
      filtered = filtered.filter(p => 
        p.categories.some(c => c.id === params.category)
      );
    }
    
    if (params?.search) {
      const search = params.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
      );
    }
    
    if (params?.featured) {
      filtered = filtered.filter(p => p.featured);
    }
    
    if (params?.on_sale) {
      filtered = filtered.filter(p => p.on_sale);
    }
    
    return resolveFallback(filtered, 'WooCommerce');
  }
};

// Get product by ID
export const getProductById = async (productId: number): Promise<Product> => {
  try {
    return await makeAuthenticatedRequest<Product>({
      method: 'GET',
      url: `/wc/v3/products/${productId}`,
    });
  } catch (error) {
    console.warn('WooCommerce API unavailable, using mock data', error);
    const product = MOCK_PRODUCTS.find(p => p.id === productId);
    if (!product) {
      throw new Error(`Product ${productId} not found`);
    }
    return resolveFallback(product, 'WooCommerce');
  }
};

// Get categories
export const getCategories = async (): Promise<Array<{ id: number; name: string; slug: string; count: number }>> => {
  try {
    return await makeAuthenticatedRequest<Array<{ id: number; name: string; slug: string; count: number }>>({
      method: 'GET',
      url: '/wc/v3/products/categories',
    });
  } catch (error) {
    console.warn('WooCommerce API unavailable, using mock data', error);
    return resolveFallback(MOCK_CATEGORIES, 'WooCommerce');
  }
};

// Get cart
export const getCart = async (): Promise<Cart> => {
  try {
    return await makeAuthenticatedRequest<Cart>({
      method: 'GET',
      url: '/wc/store/v1/cart',
    });
  } catch (error) {
    console.warn('WooCommerce cart API unavailable, using empty cart', error);
    return resolveFallback(createEmptyCart(), 'WooCommerce');
  }
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
  try {
    return await makeAuthenticatedRequest<Order>({
      method: 'POST',
      url: '/wc/v3/orders',
      data: checkoutData,
    });
  } catch (error) {
    console.warn('WooCommerce order API unavailable, using mock order', error);
    return resolveFallback(createMockOrder(checkoutData), 'WooCommerce');
  }
};

// Get order by ID
export const getOrderById = async (orderId: number): Promise<Order> => {
  try {
    return await makeAuthenticatedRequest<Order>({
      method: 'GET',
      url: `/wc/v3/orders/${orderId}`,
    });
  } catch (error) {
    console.warn('WooCommerce order API unavailable, returning synthetic order', error);
    return resolveFallback(createMockOrder({
      billing: {
        first_name: 'Invitada',
        last_name: 'Trash',
        email: 'mock@trashgenero.local',
        phone: '',
        address_1: '',
        address_2: '',
        city: '',
        state: '',
        postcode: '',
        country: 'ES',
      },
      shipping: {
        first_name: 'Invitada',
        last_name: 'Trash',
        address_1: '',
        address_2: '',
        city: '',
        state: '',
        postcode: '',
        country: 'ES',
      },
      payment_method: 'mock',
      payment_method_title: 'Mock',
      set_paid: false,
      line_items: [],
    }, orderId), 'WooCommerce');
  }
};

// Get user orders
export const getUserOrders = async (params?: {
  per_page?: number;
  page?: number;
}): Promise<Order[]> => {
  try {
    return await makeAuthenticatedRequest<Order[]>({
      method: 'GET',
      url: '/wc/v3/orders',
      params: {
        ...params,
        customer: 'me',
      },
    });
  } catch (error) {
    console.warn('WooCommerce orders API unavailable, returning empty history', error);
    return resolveFallback([], 'WooCommerce');
  }
};
