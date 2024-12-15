import Clock from "@/components/TimeZone/Clock";
import { baseUrl } from "@/app/lib/constant";
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from 'next-intl/server';

type Props = {
  params: { slug: string; locale: string };
};

export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const api = await fetchTimeZone(params.slug);
  const t = await getTranslations('TimeZones.meta');

  return {
    title: t('title', { city: api.cityName }),
    description: t('description', { city: api.cityName, timezone: api.timezone }),
    openGraph: {
      title: t('title', { city: api.city }),
      description: t('description', { city: api.city, timezone: api.timezone }),
    },
  };
}

async function fetchTimeZone(city: string) {
  const apiUrl = `${baseUrl}/api/timezone`;
  const formattedCity = city.replace(/-/g, " ");
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city: formattedCity }),
      next: { revalidate: 3600 },
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
    const response = await fetch(apiUrl, {
      next: { revalidate: 86400 },
    });
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
  const t = await getTranslations('TimeZones');
  const api = await fetchTimeZone(params.slug);

  if (!api) {
    return <div>{t('errorLoading')}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-center md:text-4xl">
        {t('currentTimeIn')} {api.city}
      </h1>
      <Clock timezone={api.timezone} />
      <Link
        className="border border-black bg-black text-white transition-all hover:bg-white hover:text-black hover:animate-pulse rounded p-2"
        href="/"
      >
        {t('visitFullApp')}
      </Link>
    </div>
  );
}
