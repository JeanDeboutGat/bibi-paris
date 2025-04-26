import { mockProductProvider } from './mockProductProvider';
import { mockOrderProvider } from './mockOrderProvider';
import { realProductProvider } from './realProductProvider';
import { realOrderProvider } from './realOrderProvider';

const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export const productProvider = useMock ? mockProductProvider : realProductProvider;
export const orderProvider = useMock ? mockOrderProvider : realOrderProvider; 