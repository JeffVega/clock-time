import dynamic from "next/dynamic";
import Script from "next/script";
import type {WebPage } from 'schema-dts'
import DOMPurify from "isomorphic-dompurify";
const TimeZone = dynamic(() => import("@/_components/TimeZone/Timezone"), { ssr: false });
const schema: WebPage = {
'@type': 'WebPage',
'name': 'Time Sync World',
'url': 'https://timesync.world',
'description': 'Time Sync World is a global time management solution that helps travelers and professionals stay on time for meetings anywhere in the world with accurate time zone info. Connect seamlessly and never miss a moment!',

}
export default function Home() {
  return (
    <div>
      <TimeZone />
      <Script
      id="schema-script"
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(JSON.stringify(schema)) }}
      />
    </div>
  );
}
