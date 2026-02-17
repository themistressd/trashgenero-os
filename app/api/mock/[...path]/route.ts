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
];

const MOCK_CATEGORIES = [
  { id: 1, name: 'Ropa', slug: 'ropa', count: 1 },
];

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

  if (joinedPath === 'wp/v2/posts') return NextResponse.json(MOCK_POSTS);
  if (/^wp\/v2\/posts\/\d+$/.test(joinedPath)) {
    const id = Number(path[path.length - 1]);
    const post = MOCK_POSTS.find((item) => item.id === id);
    return post
      ? NextResponse.json(post)
      : NextResponse.json({ message: `Post ${id} not found` }, { status: 404 });
  }

  if (joinedPath === 'wp/v2/divas') return NextResponse.json(MOCK_DIVAS);
  if (joinedPath === 'wp/v2/lookbook') return NextResponse.json(MOCK_LOOKBOOKS);
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

  if (joinedPath === 'wc/v3/products') return NextResponse.json(MOCK_PRODUCTS);
  if (joinedPath === 'wc/v3/products/categories') return NextResponse.json(MOCK_CATEGORIES);
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
