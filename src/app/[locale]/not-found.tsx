"use client";
import { useEffect } from "react";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
export default function NotFound() {
	const t = useTranslations("notFound");
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="text-center">
				<h1 className="text-6xl font-bold mb-4">404</h1>
				<h2 className="text-2xl mb-6">{t("title")}</h2>
				<p className="text-lg mb-6">{t("message")}</p>
				<div>
					<Link passHref href="/">
						<Button className="mr-4">{t("homeButton")}</Button>
					</Link>
					<Link passHref href="/jobs">
						<Button>{t("browseButton")}</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}