'use client'
import PropertyListSlide from '@/components/sections/PropertyListSlide'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useLanguage } from '@/hooks/useLanguage'
import { useTranslation } from '@/utils/i18n-simple'

export default function PropertyList1({ properties }: { properties: any[] }) {
  const { currentLanguage } = useLanguage()
  const { t } = useTranslation('common')
  console.log('=== DEBUG properties en PropertyList1 ===', properties)
  console.log(t('home.title-list-properties'))
  
  // Debug: Log properties data ANTES del filtro
  if (process.env.NODE_ENV === 'development') {
    console.log('=== PropertyList1 Component DEBUG - ANTES DEL FILTRO ===');
    console.log('Total properties received:', properties?.length || 0);
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
  
  // Debug: Log properties data DESPUÉS del filtro
  if (process.env.NODE_ENV === 'development') {
    console.log('=== PropertyList1 Component DEBUG - DESPUÉS DEL FILTRO ===');
    console.log('Current language:', currentLanguage);
    console.log('Public properties count:', publicProperties?.length || 0);
    console.log('First property title:', publicProperties?.[0]?.title || 'None');
  }
  
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

  return (
    <section className="py-5">
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
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {publicProperties.map(property => {
              if (process.env.NODE_ENV === 'development') {
                console.log('=== PropertieList1 DEBUG ===');
                console.log('Property data:', property);
                console.log('propertyStatus being passed:', property.propertyStatus);
              }
              
              return (
                <SwiperSlide key={property.id}>
                  <PropertyListSlide
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
                  />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
    </section>
  );
}
