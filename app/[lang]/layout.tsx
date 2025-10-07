import { ReactNode } from 'react';
import WhatsAppButton from '@/components/elements/WhatsAppButton';
import { WHATSAPP_CONFIG } from '@/config/whatsapp';

interface Props {
  children: ReactNode;
  params: Promise<{
    lang: string;
  }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { lang } = await params;
  return (
    <>
      {children}
      <WhatsAppButton 
        phoneNumber={WHATSAPP_CONFIG.phoneNumber}
      />
    </>
  );
} 