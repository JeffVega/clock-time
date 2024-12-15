import { NextIntlClientProvider, useMessages } from "next-intl";
import Footer from "./Footer";

type Props = {
  locale: string;
};

export default function FooterWrapper({ locale }: Props) {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Footer />
    </NextIntlClientProvider>
  );
}
