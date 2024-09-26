import dynamic from "next/dynamic";

const TimeZone = dynamic(() => import("@/_components/TimeZone/Timezone"), { ssr: false });
export default function Home() {
  return (
    <div>
      <TimeZone />
    </div>
  );
}
