"use client";

import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import TimeZoneDisplay from "./Timezone";

type Props = {
	messages: AbstractIntlMessages; // Specify messages as a record of string key-value pairs
	locale: string;
};

export default function TimeZoneWrapper({ messages, locale }: Props) {
	return (
		<NextIntlClientProvider messages={messages} locale={locale}>
			<TimeZoneDisplay />
		</NextIntlClientProvider>
	);
}
