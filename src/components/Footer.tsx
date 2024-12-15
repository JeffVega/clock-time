'use client';

import Link from "next/link";
import { useTranslations } from 'next-intl';

const Footer = () => {
	const t = useTranslations('Footer');
	
	return (
		<footer className="">
			<div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
				<div className="sm:flex sm:items-center sm:justify-between">
					<div className=" text-3xl">
						{t('title')}
					</div>
				</div>

				<nav className="grid grid-cols-1 gap-8 border-t border-gray-100 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16 dark:border-gray-800">
					<div>
						<p className="font-medium ">
							{t('title')}
						</p>

						<ul className="mt-6 space-y-4 text-sm">
							<li className="">
								{t('welcome')}
							</li>
							<li>
								<Link
									href="/"
									className=" transition hover:opacity-75 "
								>
									{t('home')}
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<p className="font-medium ">
							{t('helpfulLinks')}
						</p>

						<ul className="mt-6 space-y-4 text-sm">
							<li>
								<Link
									href="/timezones"
									className=" transition hover:opacity-75"
								>
									{t('supportedTimezones')}
								</Link>
							</li>
							<li>
								<Link
									href="/sitemap.xml"
									className="transition hover:opacity-75 italic"
								>
									{t('sitemap')}
								</Link>
							</li>
							<li>
								<Link
									href="/privacy/"
									className="text-gray-700 transition hover:opacity-75 dark:text-gray-200 italic"
								>
									{t('privacy')}
								</Link>
							</li>
						</ul>
					</div>
				</nav>

				<p className="text-xs text-center">
					{t('copyright', { year: new Date().getFullYear() })}
				</p>
			</div>
		</footer>
	);
};

export default Footer;
