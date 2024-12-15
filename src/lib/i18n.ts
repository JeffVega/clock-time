import {getRequestConfig, GetRequestConfigParams} from 'next-intl/server';
import {notFound} from 'next/navigation';

// Can be imported from a shared config
const locales = ['en', 'es', 'fr', 'de'];

export default getRequestConfig(async ({ locale }: GetRequestConfigParams) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as 'en' | 'es' | 'fr' | 'de')) notFound();

  return {
    messages: (await import(`../../messages/${locale}.json`)).default
  };
}); 