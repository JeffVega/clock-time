import Clock from "@/_components/TimeZone/Clock";
import { baseUrl } from "@/app/lib/constant";
import type { Metadata } from 'next';

type Props = {
  params: { slug: string }
};

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const slug = params.slug;

  // Reuse the fetchTimeZone function here
  const api = await fetchTimeZone(slug);

  return {
    title: `Current Time in ${api.cityName} Using Time Sync World `,
    description: `Check the current time in ${api.cityName}, timezone: ${api.timezone} Using Time Sync World`,
    openGraph: {
      title: `Current Time in ${api.city} Using Time Sync World`,
      description: `Check the current time in ${api.city}, timezone: ${api.timezone} Using Time Sync World`,
      // You can add more OpenGraph metadata here
    },
    // You can add more metadata fields as needed
  };
}

async function fetchTimeZone(city: string) {
    ;
	const apiUrl = `${baseUrl}/api/timezone`;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ city }),
  });

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
    
  }

  return await response.json();
}

export default async function Page({ params }: Props) {
  const api = await fetchTimeZone(params.slug);

  return (
    <div className="flex flex-col items-center justify-center p-4">
    <h1 className="text-3xl font-bold text-center md:text-4xl">Current Time in: {api.city}</h1>
      <Clock timezone={api.timezone} />
    </div>
  );
}