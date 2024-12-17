import { baseUrl } from "../../lib/constant";
import Link from "next/link";
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('TimeZones.list');
  const apiUrl = `${baseUrl}/api/timezone`;
  let data = [];
  
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    data = await response.json();
  } catch (error) {
    console.error("Failed to fetch timezones:", error);
  }

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex flex-col md:flex-row space-x-2 items-center justify-center mb-4">
        <h1 className="text-2xl font-bold text-center">
          {t('title')}
        </h1>
        <Link className="border border-black text-black rounded p-2" href="/">
          {t('goBack')}
        </Link>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.map((timezone: {
          id: string;
          city: string;
          cityName: string;
          timezone: string;
        }) => (
          <li key={timezone.id} className="mb-2 w-full">
            <Link
              href={`/timezones/${timezone.cityName
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\p{Diacritic}]/gu, "")// Remove diacritics
              .replace(/\s+/g, "-") // Replace spaces with hyphens
              .replace(/\./g, "")}` // Remove periods
              .replace(/'/g, "")}
            >
              <div className="border p-4 rounded-lg h-24 flex items-center">
              <span className="font-semibold">{timezone.city}</span> -{" "}
              {timezone.timezone}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
