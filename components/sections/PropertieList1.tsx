'use client'
import { useLanguageData } from '@/hooks/useLanguageData'
import { getProperties } from '@/services/get-properties'
import PropertyListSlide from '@/components/sections/PropertyListSlide'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useLanguage } from '@/hooks/useLanguage'
import { useTranslation } from '@/utils/i18n-simple'

export default function PropertyList1({ properties: initialProperties }: { properties: any[] }) {
  // Usar el hook personalizado para manejar cambios de idioma
  const { currentLanguage } = useLanguage()
  const { t } = useTranslation('common')
  const { data: propertiesData, loading, error } = useLanguageData(
    (locale: string) => {
      console.log('=== PropertyList1 useLanguageData: Fetching with locale:', locale);
      return getProperties({ locale });
    },
    { properties: initialProperties || [], pagination: {} },
    [currentLanguage]
  )
  
  // Extraer las propiedades del objeto de respuesta
  const properties = propertiesData?.properties || []
  
  // Debug: Log properties data (solo en desarrollo)
  if (process.env.NODE_ENV === 'development') {
    console.log('=== PropertyList1 Component DEBUG ===');
    console.log('Current language:', currentLanguage);
    console.log('Initial properties:', initialProperties?.length || 0);
    console.log('Current properties:', properties?.length || 0);
    console.log('First property title (initial):', initialProperties?.[0]?.title || 'None');
    console.log('First property title (current):', properties?.[0]?.title || 'None');
    console.log('Loading:', loading);
    console.log('Error:', error);
  }
  
  // Verificar si properties es válido
  if (!properties || !Array.isArray(properties) || properties.length === 0) {
    return (
      <section className="py-5">
        <div className="row">
          <div className="col-lg-7 m-auto d-flex justify-content-center align-items-center">
            <div className="heading1">
              <p className='text-align-center'>{t('properties.title')}</p>
              <h3 className='text-align-center'>
                {loading ? t('common.loading') : t('properties.no_properties')}
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
                  <p className='text-align-center'>{t('properties.title')}</p>

                  <h3 className='text-align-center'>
                    {t('properties.discover_latest')} ({properties.length})
                    {loading && ` - ${t('common.loading')}`}
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
            {properties.map(property => {
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
                   
                  />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
    </section>
  )
}
