/**
 * Navigation and routes type definitions
 */

export type RouteType = 'page' | 'category' | 'collection' | 'external';

export type NavigationItem = {
  label: string;
  path: string;
  type: RouteType;
  children?: NavigationItem[];
  isNew?: boolean;
  isFeatured?: boolean;
};

export type FooterLinkGroup = {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
};

export type SocialMedia = {
  platform: 'instagram' | 'facebook' | 'twitter' | 'pinterest' | 'youtube' | 'tiktok';
  url: string;
  icon: string;
};

export type DataFetchingRoute = '/products' | '/cart' | '/checkout' | '/account' | '/orders' | '/product/' | '/search' | '/categories' | '/collection';

export type StaticContentRoute = '/about' | '/contact' | '/privacy' | '/terms' | '/faq' | '/shipping' | '/returns' | '/track'; 