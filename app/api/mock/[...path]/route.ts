import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_GAMIFICATION = {
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

const MOCK_POSTS = [
  {
    id: 1,
    date: '2024-02-01',
    date_gmt: '',
    guid: { rendered: '' },
    modified: '',
    modified_gmt: '',
    slug: 'manifiesto-trash',
    status: 'publish',
    type: 'post',
    link: '',
    title: { rendered: 'Manifiesto Trash' },
    content: { rendered: '<p>Un juramento de estética tóxica y belleza radical.</p>', protected: false },
    excerpt: { rendered: '<p>Un juramento de estética tóxica.</p>', protected: false },
    author: 0,
    featured_media: 0,
    comment_status: 'closed',
    ping_status: 'closed',
    sticky: false,
    template: '',
    format: 'standard',
    categories: [],
    tags: [],
  },
  {
    id: 2,
    date: '2024-02-10',
    date_gmt: '',
    guid: { rendered: '' },
    modified: '',
    modified_gmt: '',
    slug: 'manual-de-glitches',
    status: 'publish',
    type: 'post',
    link: '',
    title: { rendered: 'Manual de Glitches' },
    content: { rendered: '<p>Recetas para distorsionar la realidad con estilo.</p>', protected: false },
    excerpt: { rendered: '<p>Recetas para distorsionar la realidad.</p>', protected: false },
    author: 0,
    featured_media: 0,
    comment_status: 'closed',
    ping_status: 'closed',
    sticky: false,
    template: '',
    format: 'standard',
    categories: [],
    tags: [],
  },
];

const MOCK_DIVAS = [
  {
    id: 1,
    date: '',
    date_gmt: '',
    guid: { rendered: '' },
    modified: '',
    modified_gmt: '',
    slug: 'diva-fantasma',
    status: 'publish',
    type: 'divas',
    link: '',
    title: { rendered: 'Diva Fantasma' },
    content: {
      rendered: '<p>Una presencia etérea de la noche.</p>',
      protected: false,
    },
    excerpt: { rendered: '<p>Una presencia etérea.</p>', protected: false },
    author: 0,
    featured_media: 0,
    comment_status: 'closed',
    ping_status: 'closed',
    sticky: false,
    template: '',
    format: 'standard',
    categories: [],
    tags: [],
  },
  {
    id: 2,
    date: '',
    date_gmt: '',
    guid: { rendered: '' },
    modified: '',
    modified_gmt: '',
    slug: 'diva-analogica',
    status: 'publish',
    type: 'divas',
    link: '',
    title: { rendered: 'Diva Analógica' },
    content: {
      rendered: '<p>Reina de las cintas VHS y los secretos grabados.</p>',
      protected: false,
    },
    excerpt: { rendered: '<p>Reina de las cintas VHS.</p>', protected: false },
    author: 0,
    featured_media: 0,
    comment_status: 'closed',
    ping_status: 'closed',
    sticky: false,
    template: '',
    format: 'standard',
    categories: [],
    tags: [],
  },
];

const MOCK_LOOKBOOKS = [
  {
    id: 1,
    date: '',
    date_gmt: '',
    guid: { rendered: '' },
    modified: '',
    modified_gmt: '',
    slug: 'centerfold-neon',
    status: 'publish',
    type: 'lookbook',
    link: '',
    title: { rendered: 'Centerfold Neón' },
    content: { rendered: '<p>Editorial retrofuturista.</p>', protected: false },
    excerpt: { rendered: '<p>Editorial retrofuturista.</p>', protected: false },
    author: 0,
    featured_media: 0,
    comment_status: 'closed',
    ping_status: 'closed',
    sticky: false,
    template: '',
    format: 'standard',
    categories: [],
    tags: [],
  },
  {
    id: 2,
    date: '',
    date_gmt: '',
    guid: { rendered: '' },
    modified: '',
    modified_gmt: '',
    slug: 'centerfold-vcr',
    status: 'publish',
    type: 'lookbook',
    link: '',
    title: { rendered: 'Centerfold VCR' },
    content: { rendered: '<p>Un archivo perdido de cintas glam.</p>', protected: false },
    excerpt: { rendered: '<p>Archivo perdido de cintas glam.</p>', protected: false },
    author: 0,
    featured_media: 0,
    comment_status: 'closed',
    ping_status: 'closed',
    sticky: false,
    template: '',
    format: 'standard',
    categories: [],
    tags: [],
  },
];

const MOCK_DIVA_TYPES = [
  { id: 1, name: 'Rivales', slug: 'rivales', taxonomy: 'tipo-diva' },
  { id: 2, name: 'Aliadas', slug: 'aliadas', taxonomy: 'tipo-diva' },
];

const MOCK_PRODUCTS = [
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
    description: 'Camiseta exclusiva con diseño Trash Couture.',
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
    images: [{ id: 1, src: 'https://via.placeholder.com/800x800/FF00FF/FFFFFF?text=Trash+Couture+Tee', name: 'Camiseta Trash', alt: 'Camiseta Trash Couture' }],
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
    description: 'Sudadera oversized con el logo Suprema Trashtornada.',
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
    images: [{ id: 2, src: 'https://via.placeholder.com/800x800/9333EA/FFFFFF?text=Suprema+Hoodie', name: 'Sudadera Suprema', alt: 'Sudadera Suprema Trashtornada' }],
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
    description: 'Accesorio de látex hecho a mano.',
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
    images: [{ id: 3, src: 'https://via.placeholder.com/800x800/000000/FF00FF?text=Latex+Mystic', name: 'Accesorio Látex', alt: 'Accesorio Látex Místico' }],
    attributes: [],
    stock_status: 'instock',
    stock_quantity: 20,
  },
];

const MOCK_CATEGORIES = [
  { id: 1, name: 'Ropa', slug: 'ropa', count: 2 },
  { id: 2, name: 'Accesorios', slug: 'accesorios', count: 1 },
];

const EMPTY_CART = {
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
};

const toPositiveNumber = (value: string | null, fallback: number): number => {
  if (!value) return fallback;
  const parsed = Number(value);
  if (Number.isNaN(parsed) || parsed <= 0) return fallback;
  return parsed;
};

const paginate = <T>(items: T[], request: NextRequest): T[] => {
  const perPage = toPositiveNumber(request.nextUrl.searchParams.get('per_page'), items.length || 1);
  const page = toPositiveNumber(request.nextUrl.searchParams.get('page'), 1);
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
};

const parseBoolean = (value: string | null): boolean | null => {
  if (value === null) return null;
  if (value === 'true' || value === '1') return true;
  if (value === 'false' || value === '0') return false;
  return null;
};

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const joinedPath = path.join('/');

  if (joinedPath === 'trashgenero/v1/user/gamification') {
    return NextResponse.json({ success: true, data: DEFAULT_GAMIFICATION });
  }

  if (joinedPath === 'trashgenero/v1/ranks') {
    return NextResponse.json({ success: true, data: [] });
  }

  if (/^trashgenero\/v1\/points\/(pesetrash|estampitas|reliquias)\/history$/.test(joinedPath)) {
    return NextResponse.json({ success: true, data: [] });
  }

  if (joinedPath === 'wp/v2/posts') {
    return NextResponse.json(paginate(MOCK_POSTS, request));
  }

  if (/^wp\/v2\/posts\/\d+$/.test(joinedPath)) {
    const id = Number(path[path.length - 1]);
    const post = MOCK_POSTS.find((item) => item.id === id);
    return post
      ? NextResponse.json(post)
      : NextResponse.json({ message: `Post ${id} not found` }, { status: 404 });
  }

  if (joinedPath === 'wp/v2/divas') return NextResponse.json(paginate(MOCK_DIVAS, request));
  if (joinedPath === 'wp/v2/lookbook') return NextResponse.json(paginate(MOCK_LOOKBOOKS, request));
  if (joinedPath === 'wp/v2/tipo-diva') return NextResponse.json(MOCK_DIVA_TYPES);
  if (joinedPath === 'wp/v2/pages') {
    const slug = request.nextUrl.searchParams.get('slug');
    if (!slug) return NextResponse.json([]);
    return NextResponse.json([
      {
        id: 1,
        date: '',
        date_gmt: '',
        guid: { rendered: '' },
        modified: '',
        modified_gmt: '',
        slug,
        status: 'publish',
        type: 'page',
        link: '',
        title: { rendered: slug },
        content: { rendered: '<p>Página mock</p>', protected: false },
        excerpt: { rendered: '', protected: false },
        author: 0,
        featured_media: 0,
        comment_status: 'closed',
        ping_status: 'closed',
        sticky: false,
        template: '',
      },
    ]);
  }

  if (joinedPath === 'wc/v3/products') {
    let products = [...MOCK_PRODUCTS];
    const category = request.nextUrl.searchParams.get('category');
    const search = request.nextUrl.searchParams.get('search')?.toLowerCase();
    const featured = parseBoolean(request.nextUrl.searchParams.get('featured'));
    const onSale = parseBoolean(request.nextUrl.searchParams.get('on_sale'));

    if (category) {
      const categoryId = Number(category);
      if (!Number.isNaN(categoryId)) {
        products = products.filter((product) =>
          product.categories.some((productCategory) => productCategory.id === categoryId)
        );
      }
    }

    if (search) {
      products = products.filter((product) =>
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search)
      );
    }

    if (featured !== null) {
      products = products.filter((product) => product.featured === featured);
    }

    if (onSale !== null) {
      products = products.filter((product) => product.on_sale === onSale);
    }

    return NextResponse.json(paginate(products, request));
  }

  if (joinedPath === 'wc/v3/products/categories') return NextResponse.json(MOCK_CATEGORIES);
  if (joinedPath === 'wc/store/v1/cart') return NextResponse.json(EMPTY_CART);
  if (joinedPath === 'wc/v3/orders') return NextResponse.json([]);
  if (/^wc\/v3\/orders\/\d+$/.test(joinedPath)) {
    const id = Number(path[path.length - 1]);
    return NextResponse.json({
      id,
      parent_id: 0,
      status: 'pending',
      currency: 'EUR',
      date_created: new Date().toISOString(),
      date_modified: new Date().toISOString(),
      total: '0.00',
      subtotal: '0.00',
      total_tax: '0.00',
      line_items: [],
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
    });
  }
  if (/^wc\/v3\/products\/\d+$/.test(joinedPath)) {
    const id = Number(path[path.length - 1]);
    const product = MOCK_PRODUCTS.find((item) => item.id === id);
    return product
      ? NextResponse.json(product)
      : NextResponse.json({ message: `Product ${id} not found` }, { status: 404 });
  }

  return NextResponse.json(
    {
      success: false,
      message: `Mock endpoint not implemented: ${joinedPath}`,
    },
    { status: 404 }
  );
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const joinedPath = path.join('/');

  if (joinedPath === 'wc/v3/orders') {
    const body = await request.json().catch(() => ({}));
    const lineItems = Array.isArray(body?.line_items) ? body.line_items : [];

    return NextResponse.json({
      id: Date.now(),
      parent_id: 0,
      status: 'pending',
      currency: 'EUR',
      date_created: new Date().toISOString(),
      date_modified: new Date().toISOString(),
      total: '0.00',
      subtotal: '0.00',
      total_tax: '0.00',
      line_items: lineItems,
      billing: body?.billing ?? {
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
      shipping: body?.shipping ?? {
        first_name: 'Invitada',
        last_name: 'Trash',
        address_1: '',
        address_2: '',
        city: '',
        state: '',
        postcode: '',
        country: 'ES',
      },
    });
  }

  return NextResponse.json(
    {
      success: false,
      message: `Mock endpoint not implemented: ${joinedPath}`,
    },
    { status: 404 }
  );
}
