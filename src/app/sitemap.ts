import type { MetadataRoute } from "next";
import { baseUrl } from "./lib/constant";
// You'll need to implement this function to fetch all available cities
async function getAllCities(): Promise<string[]> {
    try {
        // fetch all cities from your API
        const response = await fetch(`${baseUrl}/api/timezone`);
        if (!response.ok) {
            throw new Error(`Failed to fetch cities: ${response.statusText}`);
        }
        const data = await response.json();
        return data.map((city: { cityName: string }) => city.cityName.toLowerCase().replace(/\s+/g, '-'));
    } catch (error) {
        console.error('Error fetching cities:', error);
        return [];
    }
}

async function getAllCountries(): Promise<string[]> {
    try {
        // fetch all cities from your API
        const response = await fetch(`${baseUrl}/api/timezone`);
        if (!response.ok) {
            throw new Error(`Failed to fetch countries: ${response.statusText}`);
        }
        const data = await response.json();
        return data.map((city: { countryLocation: string }) => city.countryLocation.toLowerCase().replace(/\s+/g, '-'));
    } catch (error) {
        console.error('Error fetching countries:', error);
        return [];
    }
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
        {
            url: `${baseUrl}/timezones`,
            lastModified: new Date(),
            changeFrequency: "daily" as const,
            priority: 0.9,
        }
		// Add other static pages here if needed
	];

	return [...staticPages,...cityEntries, ...CountryEntries];
}
