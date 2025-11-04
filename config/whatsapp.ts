// Configuración de WhatsApp
export const WHATSAPP_CONFIG = {
  // Número de teléfono de WhatsApp (sin espacios ni caracteres especiales)
  phoneNumber: '+34951651123', // Número real de la empresa
  
  // Nota: Los mensajes ahora se manejan a través del sistema de traducciones
  // en los archivos de idiomas (/public/locales/{idioma}/common.json)
  // bajo la sección "whatsapp.messages"
};

// Función para obtener el mensaje según la página actual
// Esta función ahora es manejada directamente en el componente WhatsAppButton
// usando el sistema de traducciones de i18next
export const getWhatsAppMessage = (page?: string): string => {
  // Esta función se mantiene por compatibilidad, pero ahora el componente
  // maneja las traducciones directamente usando useTranslation
  return 'Mensaje por defecto - usar sistema de traducciones';
};
