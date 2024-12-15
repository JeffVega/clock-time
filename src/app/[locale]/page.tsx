import TimeZoneWrapper from '@/components/TimeZone/TimeZoneWrapper';
import Script from "next/script";
import type { WebPage } from "schema-dts";
import DOMPurify from "isomorphic-dompurify";
import { useMessages } from 'next-intl';

const schema: WebPage = {
  "@type": "WebPage",
  name: "Time Sync World",
  url: "https://timesync.world",
  description:
    "Time Sync World is a global time management solution that helps travelers and professionals stay on time for meetings anywhere in the world with accurate time zone info. Connect seamlessly and never miss a moment!",
};

type Props = {
  params: { locale: string }
}

export default function Home({ params: { locale } }: Props) {
  const messages = useMessages();
  
  return (
    <main>
      <TimeZoneWrapper messages={messages} locale={locale} />
      <Script
        id="schema-script"
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(JSON.stringify(schema)),
        }}
      />
    </main>
  );
}
