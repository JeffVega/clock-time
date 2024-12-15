import type { MetadataRoute } from "next";
import { baseUrl } from "./lib/constant";
import { routing } from "@/i18n/routing";

const slugify = (text: string) => {
	return text
		.toLowerCase()
		.normalize("NFD")
		.replace(/\p{M}/gu, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
};

// Single API call to get all data
async function getTimezoneData() {
	try {
		const response = await fetch(`${baseUrl}/api/timezone`);
		if (!response.ok) {
			throw new Error(`Failed to fetch data: ${response.statusText}`);
		}
		return await response.json();
	} catch (error) {
		console.error("Error fetching data:", error);
		return [];
	}
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const data = await getTimezoneData();
	const now = new Date();
	const locales = routing.locales;

	const staticPages = locales.flatMap((locale) => [
		{
			url: `${baseUrl}/${locale}`,
			lastModified: now,
			changeFrequency: "daily" as const,
			priority: 1,
		},
		{
			url: `${baseUrl}/${locale}/timezones`,
			lastModified: now,
			changeFrequency: "daily" as const,
			priority: 0.9,
		},
	]);

	const dynamicEntries = [
		...new Set<string>(
			data.flatMap((item: { cityName: string; countryLocation: string }) =>
				locales.flatMap((locale) => [
					{
						url: `${baseUrl}/${locale}/timezones/${slugify(item.cityName)}`,
						lastModified: now,
						changeFrequency: "daily" as const,
						priority: 0.7,
					},
					{
						url: `${baseUrl}/${locale}/timezones/${slugify(item.countryLocation)}`,
						lastModified: now,
						changeFrequency: "daily" as const,
						priority: 0.7,
					},
				])
			).map((entry: { url: string; lastModified: Date; changeFrequency: "daily"; priority: number }) => JSON.stringify(entry))
		),
	].map((entry: string) => JSON.parse(entry));

	return [...staticPages, ...dynamicEntries];
}
