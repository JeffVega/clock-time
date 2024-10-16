import { baseUrl } from "../lib/constant";

export default async function Page() {
  const apiUrl = `${baseUrl}/api/timezone`;
	const response = await fetch(apiUrl, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await response.json();

	// const timezones = await data.json();
	return (
		<div className="flex flex-col items-center p-4">
			<h1 className="text-2xl font-bold mb-4 text-center">
				TimeZones We Support
			</h1>
			<ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{data.map(
					(timezone: { id: string; city: string; timezone: string }) => (
						<li key={timezone.id} className="mb-2 w-full">
							<div className="border p-4 rounded-lg h-24 flex items-center">
								<span className="font-semibold">{timezone.city}</span> -{" "}
								{timezone.timezone}
							</div>
						</li>
					),
				)}
			</ul>
		</div>
	);
}
