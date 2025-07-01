// Configuración para verificar variables de entorno
export const config = {
    STRAPI_HOST: process.env.STRAPI_HOST,
    STRAPI_TOKEN: process.env.STRAPI_TOKEN,
    hasStrapiHost: !!process.env.STRAPI_HOST,
    hasStrapiToken: !!process.env.STRAPI_TOKEN,
};

// Función para verificar la configuración
export function checkStrapiConfig() {
    console.log('Strapi Configuration Check:', {
        STRAPI_HOST: config.STRAPI_HOST,
        hasStrapiHost: config.hasStrapiHost,
        hasStrapiToken: config.hasStrapiToken,
        isDevelopment: process.env.NODE_ENV === 'development',
    });

    if (!config.STRAPI_HOST) {
        console.error('❌ STRAPI_HOST no está configurado');
        return false;
    }

    if (!config.STRAPI_TOKEN) {
        console.error('❌ STRAPI_TOKEN no está configurado');
        return false;
    }

    console.log('✅ Configuración de Strapi válida');
    return true;
}

// Verificar configuración al importar
checkStrapiConfig(); 