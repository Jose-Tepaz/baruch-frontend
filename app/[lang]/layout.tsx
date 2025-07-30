import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  params: Promise<{
    lang: string;
  }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body>
        {children}
      </body>
    </html>
  );
} 