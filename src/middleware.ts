import createIntlMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

export default async function middleware(req: NextRequest) {
	const handleI18nRouting = createIntlMiddleware(routing);
	const res = handleI18nRouting(req);


	return res;
}

export const config = {
	// Match only internationalized pathnames
	matcher: ["/((?!api|_next|.*\\..*).*)"],
};