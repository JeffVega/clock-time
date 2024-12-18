import { getTranslations } from "next-intl/server";

export default async function PrivacyPolicy() {
	const t = await getTranslations("Privacy");

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">{t("title")}</h1>

			<section className="mb-8">
				<h2 className="text-2xl font-semibold mb-4">
					{t("introduction.title")}
				</h2>
				<p className="mb-4">{t("introduction.content")}</p>
			</section>

			<section className="mb-8">
				<h2 className="text-2xl font-semibold mb-4">
					{t("information.title")}
				</h2>
				<ul className="list-disc pl-6 mb-4">
					{t.raw("information.items").map((item: string, index: number) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-2xl font-semibold mb-4">{t("usage.title")}</h2>
				<ul className="list-disc pl-6 mb-4">
					{t.raw("usage.items").map((item: string, index: number) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-2xl font-semibold mb-4">{t("rights.title")}</h2>
				<ul className="list-disc pl-6 mb-4">
					{t.raw("rights.items").map((item: string, index: number) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-2xl font-semibold mb-4">{t("storage.title")}</h2>
				<p className="mb-4">{t("storage.content")}</p>
			</section>

			<section className="mb-8">
				<h2 className="text-2xl font-semibold mb-4">{t("contact.title")}</h2>
				<p className="mb-4">{t("contact.content")}</p>
			</section>

			<p className="text-sm text-gray-600">
				{t("lastUpdated", { date: "11/27/2024" })}
			</p>
		</div>
	);
}
