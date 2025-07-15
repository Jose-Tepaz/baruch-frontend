const { STRAPI_HOST, STRAPI_TOKEN } = process.env;

export function query(url: string) {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const fullUrl = `${STRAPI_HOST}/api/${url}`;
    
    if (isDevelopment) {
        console.log('=== Strapi Query DEBUG ===');
        console.log('URL:', url);
        console.log('Full URL:', fullUrl);
        console.log('STRAPI_HOST:', STRAPI_HOST);
        console.log('STRAPI_TOKEN:', STRAPI_TOKEN ? 'Present' : 'Missing');
    }
    
    return fetch(fullUrl, {
        headers: {
            Authorization: `Bearer ${STRAPI_TOKEN}`,
            'Content-Type': 'application/json',
            'Accept-Language': url.includes('locale=') ? url.split('locale=')[1].split('&')[0] : 'en',
        },
        cache: 'no-store', // Deshabilitar caché para asegurar contenido fresco
    }).then(res => {
        if (isDevelopment) {
            console.log('=== Strapi Response DEBUG ===');
            console.log('Status:', res.status);
            console.log('OK:', res.ok);
            console.log('Headers:', Object.fromEntries(res.headers.entries()));
            console.log('Accept-Language:', res.headers.get('Accept-Language'));
        }
        
        if (!res.ok) {
            console.error('=== Strapi HTTP Error ===');
            console.error('Status:', res.status);
            console.error('Status Text:', res.statusText);
            console.error('URL:', fullUrl);
            throw new Error(`HTTP error! status: ${res.status} - ${res.statusText}`);
        }
        
        return res.json();
    }).then(data => {
        if (isDevelopment) {
            console.log('=== Strapi Data DEBUG ===');
            console.log('Data type:', typeof data);
            console.log('Data:', data);
            console.log('Data.data length:', data?.data?.length || 0);
            console.log('Locale used:', url.includes('locale=') ? url.split('locale=')[1].split('&')[0] : 'en');
        }
        return data;
    }).catch(error => {
        console.error('=== Strapi Error ===');
        console.error('URL:', fullUrl);
        console.error('Error:', error);
        throw error;
    });
}
