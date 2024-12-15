'use client';

import { NextIntlClientProvider } from 'next-intl';
import TimeZoneDisplay from './Timezone';

type Props = {
  messages: any;
  locale: string;
}

export default function TimeZoneWrapper({ messages, locale }: Props) {
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <TimeZoneDisplay />
    </NextIntlClientProvider>
  );
} 