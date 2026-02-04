/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configuración para App Router
    // No necesitamos la configuración i18n aquí ya que usamos middleware
    async redirects() {
        return [
            {
                source: '/services/sell-your-house-in-costa-del-sol',
                destination: '/services/sell-your-house',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;