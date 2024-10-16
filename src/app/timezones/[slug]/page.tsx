import Clock from "@/_components/TimeZone/Clock";
import { baseUrl } from "@/app/lib/constant";
import type { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const api = await fetchTimeZone(params.slug);

  return {
    title: `Current Time in ${api.cityName} Using Time Sync World `,
    description: `Check the current time in ${api.cityName}, timezone: ${api.timezone} Using Time Sync World`,
    openGraph: {
      title: `Current Time in ${api.city} Using Time Sync World`,
      description: `Check the current time in ${api.city}, timezone: ${api.timezone} Using Time Sync World`,
    },
  };
}

async function fetchTimeZone(city: string) {
  const apiUrl = `${baseUrl}/api/timezone`;

  try {
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
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function generateStaticParams() {
  const apiUrl = `${baseUrl}/api/timezone`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error fetching cities: ${response.statusText}`);
    }

    const cities = await response.json();

    return cities.map((city: { slug: string }) => ({
      slug: city.slug,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Page({ params }: Props) {
  const api = await fetchTimeZone(params.slug);

  if (!api) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-center md:text-4xl">
        Current Time in: {api.city}
      </h1>
      <Clock timezone={api.timezone} />
    </div>
  );
}