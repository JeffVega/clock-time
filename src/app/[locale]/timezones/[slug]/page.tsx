import React from "react";
import Clock from "@/components/TimeZone/Clock";
import { baseUrl } from "@/app/lib/constant";
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = {
	params: {
		slug: string;
		locale: string;
	};
};

type TimeZoneData = {
	city: string;
	cityName: string;
	timezone: string;
	slug: string;
};

// Cache the fetch results
const fetchTimeZoneData = async (city: string): Promise<TimeZoneData> => {
	const apiUrl = `${baseUrl}/api/timezone`;
	const formattedCity = city.replace(/-/g, " ");

	try {
		const response = await fetch(apiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ city: formattedCity }),
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch timezone data: ${response.statusText}`);
		}

		return response.json();
	} catch (error) {
		console.error("Error fetching timezone data:", error);
		throw error;
	}
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	try {
		const data = await fetchTimeZoneData(params.slug);
		const t = await getTranslations("TimeZones.meta");

		return {
			title: t("title", { city: data.cityName }),
			description: t("description", {
				city: data.cityName,
				timezone: data.timezone,
			}),
			openGraph: {
				title: t("title", { city: data.cityName }),
				description: t("description", {
					city: data.cityName,
					timezone: data.timezone,
				}),
			},
		};
	} catch {
		return {
			title: "Timezone Not Found",
			description: "The requested timezone information could not be found",
		};
	}
}

export default async function TimeZonePage({ params }: Props) {
	const t = await getTranslations("TimeZones");

	try {
		const data = await fetchTimeZoneData(params.slug);

		return (
			<div className="flex flex-col items-center justify-center min-h-screen p-4">
				<h1 className="text-3xl font-bold text-center md:text-4xl mb-8">
					{t("currentTimeIn")} {data.cityName}
				</h1>
				<div className="mb-8">
					<Clock timezone={data.timezone} />
				</div>
				<Link
					className="border border-black bg-black text-white transition-all hover:bg-white hover:text-black hover:animate-pulse rounded px-4 py-2"
					href="/"
				>
					{t("visitFullApp")}
				</Link>
			</div>
		);
	} catch {
		notFound();
	}
}
