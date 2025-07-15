import { getProperties } from "@/services/get-properties";
import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import CategoryContent from "@/components/pages/CategoryContent";

export default async function CategoryPage(
    { params }: { params: { categoryId: string } }
) { 
    const { categoryId } = await params;
    
    // Cargar datos iniciales en el servidor
    let initialProperties = [];
    try {
        const { properties } = await getProperties({ categoryId, locale: 'en' }); // Usar inglés como por defecto del servidor
        initialProperties = properties || [];
        
        if (process.env.NODE_ENV === 'development') {
            console.log('=== CategoryPage Server DEBUG ===');
            console.log('Category ID:', categoryId);
            console.log('Initial properties loaded:', initialProperties.length);
        }
    } catch (error) {
        console.error('Error loading initial properties:', error);
        initialProperties = [];
    }
    
    return (
        <Layout>
            <InnerHeader title="Our Properties" currentpage="Our Properties" />
            <CategoryContent 
                categoryId={categoryId}
                initialProperties={initialProperties}
            />
        </Layout>
    );
}




