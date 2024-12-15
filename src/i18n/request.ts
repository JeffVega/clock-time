import { getRequestConfig } from "next-intl/server";
import { routing } from "@/i18n/routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  // Check if locale is provided and valid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  if (!locale || !routing.locales.includes(locale as never)) {
    locale = routing.defaultLocale;
  }

  try {
    return {
      locale,
      messages: (await import(`@/app/messages/${locale}.json`)).default,
    };
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}`, error);
    return {
      locale,
      messages: (await import(`@/app/messages/${routing.defaultLocale}.json`))
        .default,
    };
  }
});
