// Configuración para verificar variables de entorno
export const config = {
    STRAPI_HOST: process.env.STRAPI_HOST,
    STRAPI_TOKEN: process.env.STRAPI_TOKEN,
    hasStrapiHost: !!process.env.STRAPI_HOST,
    hasStrapiToken: !!process.env.STRAPI_TOKEN,
};

// Función para verificar la configuración
export function checkStrapiConfig() {
    if (!config.STRAPI_HOST) {
        return false;
    }

    if (!config.STRAPI_TOKEN) {
        return false;
    }

    return true;
}

// Verificar configuración al importar (silencioso en producción)
checkStrapiConfig(); 