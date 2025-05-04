import { mockProductProvider } from './mockProductProvider';
import { mockOrderProvider } from './mockOrderProvider';
import { realProductProvider } from './realProductProvider';
import { realOrderProvider } from './realOrderProvider';
import { getMockHomepageData } from './mockHomepageProvider';
import { getRealHomepageData } from './realHomepageProvider';

const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export const productProvider = useMock ? mockProductProvider : realProductProvider;
export const orderProvider = useMock ? mockOrderProvider : realOrderProvider; 
export const getHomePageData = useMock ? getMockHomepageData : getRealHomepageData;