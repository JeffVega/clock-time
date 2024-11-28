import Link from "next/link";

const Footer = () => (
	<footer className="bg-white dark:bg-gray-900">
		<div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
			<div className="sm:flex sm:items-center sm:justify-between">
				<div className="text-teal-600 dark:text-teal-300 text-3xl">
					Time Sync World
				</div>
			</div>

			<nav className="grid grid-cols-1 gap-8 border-t border-gray-100 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16 dark:border-gray-800">
				<div>
					<p className="font-medium text-gray-900 dark:text-white">
						Time Sync World
					</p>

					<ul className="mt-6 space-y-4 text-sm">
						<li className="text-white">
							Welcome to Timesync World, your global time management solution.
							We help travelers and professionals stay on time for meetings
							anywhere in the world with accurate time zone info. Connect
							seamlessly and never miss a moment!
						</li>
						<li>
							<Link
								href="/"
								className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
							>
								Home
							</Link>
						</li>
					</ul>
				</div>

				<div>
					<p className="font-medium text-gray-900 dark:text-white">
						Helpful Links
					</p>

					<ul className="mt-6 space-y-4 text-sm">
						<li>
							<Link
								href="/timezones"
								className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
							>
								Supported Timezones
							</Link>
						</li>
						<li>
							<Link
								href="/sitemap.xml"
								className="text-gray-700 transition hover:opacity-75 dark:text-gray-200 italic"
							>
								Sitemap.xml
							</Link>
						</li>
						<li>
							<Link
								href="/privacy/"
								className="text-gray-700 transition hover:opacity-75 dark:text-gray-200 italic"
							>
								Privacy
							</Link>
						</li>
						{/* <li>
							<Link
								href="/about"
								className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
							>
								About
							</Link>
						</li>
						<li>
							<Link
								href="/contact"
								className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
							>
								Contact
							</Link>
						</li>
						<li>
							<Link
								href="/faq"
								className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
							>
								FAQs
							</Link>
						</li> */}
					</ul>
				</div>
			</nav>

			<p className="text-xs text-gray-500 dark:text-gray-400 text-center">
				&copy; {new Date().getFullYear()}. Time Sync World. All rights reserved.
			</p>
		</div>
	</footer>
);

export default Footer;
