'use client'
import PropertyListFeatured from '@/components/sections/PropertyListFeatured'  
import { useLanguage } from '@/hooks/useLanguage'
import { useTranslation } from '@/utils/i18n-simple'

export default function PropertyList1({ properties }: { properties: any[] }) {
  const { currentLanguage } = useLanguage()
  const { t } = useTranslation('common')

  // Debug: Log properties data ANTES del filtro
  if (process.env.NODE_ENV === 'development') {
    properties?.forEach((property, index) => {
      console.log(`Property ${index}:`, {
        title: property.title,
        is_private: property.is_private,
        isPrivate: property.isPrivate,
        typeof_is_private: typeof property.is_private,
        typeof_isPrivate: typeof property.isPrivate
      });
    });
  }

  // Filtrar solo propiedades públicas (robusto)
  const publicProperties = properties.filter(
    (property) => {
      const isPrivate = property.is_private === true || property.isPrivate === true;
      if (process.env.NODE_ENV === 'development') {
        console.log(`Filtering property "${property.title}": is_private=${property.is_private}, isPrivate=${property.isPrivate}, shouldFilter=${isPrivate}`);
      }
      return !isPrivate;
    }
  );

  // Verificar si properties es válido
  if (!publicProperties || publicProperties.length === 0) {
    return (
      <section className="py-5">
        <div className="row">
          <div className="col-lg-7 m-auto d-flex justify-content-center align-items-center">
            <div className="heading1">
              <p className='text-align-center'>{t('properties.title')}</p>
              <h3 className='text-align-center'>
                {t('properties.no_properties')}
              </h3>
            </div>  
          </div>
        </div>
      </section>
    );
  }

  // Mostrar solo las primeras 3 propiedades públicas
  const firstThreeProperties = publicProperties.slice(0, 6);

  return (
    <section className="wrapp-properties-list">
      <div className="row">
        <div className="col-lg-7 m-auto d-flex justify-content-center align-items-center">
          <div className="heading1">
            <p className='text-align-center'>{t('home.subtitle-list-properties')}</p>
            <h3 className='text-align-center'>
              {t('home.title-list-properties')}
            </h3>
          </div>  
        </div>
      </div>
      <div className="space30"></div>
      <div className="container">
        <div className="row g-4">
          {firstThreeProperties.map(property => (
            <div className="col-12 col-md-6 col-lg-4" key={property.id}>
              <PropertyListFeatured
                title={property.title}
                address={property.address}
                price={property.price}
                imageUrl={property.image}
                isNew={property.is_new}
                propertyStatus={property.propertyStatus}
                documentId={property.documentId}
                category={property.category}
                locale={currentLanguage}
                isPrivate={property.is_private || false}
                location={property.location}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
