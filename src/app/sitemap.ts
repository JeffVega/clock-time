import type { MetadataRoute } from "next";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
// You'll need to implement this function to fetch all available cities
async function getAllCities(): Promise<string[]> {
	// fetch all cities from your API
    const response = await fetch(`${baseUrl}/api/timezone`);
    const data = await response.json();
    return data.map((city: { cityName: string }) => city.cityName.replace(/\s+/g, ''));
    // only return the city names and country
}
async function getAllCountries(): Promise<string[]> {
    // fetch all cities from your API
    const response = await fetch(`${baseUrl}/api/timezone`);
    const data = await response.json();
    return data.map((city: { countryLocation: string }) => city.countryLocation.replace(/\s+/g, ''));
    // only return the city names and country
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// Get all cities
	const cities = await getAllCities();
    const countries = await getAllCountries();
	// Create sitemap entries for each city
	const cityEntries = cities.map((city) => ({
		url: `${baseUrl}/timezones/${city}`,
		lastModified: new Date(),
		changeFrequency: "daily" as const,
		priority: 0.7,
	}));

    const CountryEntries = countries.map((city) => ({
        url: `${baseUrl}/timezones/${city}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.7,
    }));
	// Add the homepage and any other static pages
	const staticPages = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "daily" as const,
			priority: 1,
		},
		// Add other static pages here if needed
	];

	return [...staticPages,...cityEntries, ...CountryEntries];
}
