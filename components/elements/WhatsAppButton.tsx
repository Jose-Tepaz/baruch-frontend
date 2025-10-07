'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from '@/utils/i18n-simple';
import { usePathname } from 'next/navigation';
    

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '+1234567890', // Número por defecto, debería ser configurado
  message,
  className = ''
}) => {
  const { t } = useTranslation('common');
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Asegurar que el botón permanezca visible
    const ensureButtonVisible = () => {
      const button = document.getElementById('whatsapp-button-main');
      if (button) {
        button.style.display = 'flex';
        button.style.visibility = 'visible';
        button.style.opacity = '1';
        button.style.zIndex = '99999';
      }
    };

    // Verificar cada segundo que el botón esté visible
    const interval = setInterval(ensureButtonVisible, 1000);

    // También verificar cuando se hace scroll o resize
    window.addEventListener('scroll', ensureButtonVisible);
    window.addEventListener('resize', ensureButtonVisible);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', ensureButtonVisible);
      window.removeEventListener('resize', ensureButtonVisible);
    };
  }, []);

  // Determinar el mensaje basado en la página actual
  const getMessageForCurrentPage = () => {
    if (message) return message; // Si se pasa un mensaje específico, usarlo
    
    // Detectar la página actual basada en la ruta
    if (pathname.includes('/properties')) {
      return t('whatsapp.messages.properties');
    } else if (pathname.includes('/contact')) {
      return t('whatsapp.messages.contact');
    } else if (pathname.includes('/about')) {
      return t('whatsapp.messages.about');
    } else if (pathname.includes('/services')) {
      return t('whatsapp.messages.services');
    } else if (pathname === '/' || pathname.includes('/home')) {
      return t('whatsapp.messages.home');
    }
    
    // Mensaje por defecto
    return t('whatsapp.messages.default');
  };

  const handleWhatsAppClick = () => {
    const finalMessage = getMessageForCurrentPage();
    const encodedMessage = encodeURIComponent(finalMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^\d]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // No renderizar hasta que esté montado para evitar problemas de hidratación
  if (!mounted) {
    return null;
  }

  return (
    <div 
      id="whatsapp-button-main"
      className={className}
      onClick={handleWhatsAppClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleWhatsAppClick();
        }
      }}
      aria-label={t('whatsapp.tooltip')}
    >
      <div className="whatsapp-icon-inner">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      </div>
      <div className="whatsapp-tooltip-inner">
        {t('whatsapp.tooltip')}
      </div>
    </div>
  );
};

export default WhatsAppButton;
