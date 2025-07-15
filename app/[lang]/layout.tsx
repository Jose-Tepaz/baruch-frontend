import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  params: {
    lang: string;
  };
}

export default function LocaleLayout({ children, params: { lang } }: Props) {
  return (
    <html lang={lang}>
      <body>
        {children}
      </body>
    </html>
  );
} 