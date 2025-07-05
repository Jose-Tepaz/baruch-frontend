'use client'
import PropertyListSlide from '@/components/sections/PropertyListSlide'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function PropertyList1({ properties }: { properties: any[] }) {
  return (
    <section className="py-5">
        <div className="row">
            <div className="col-lg-7 m-auto d-flex justify-content-center align-items-center">
                <div className="heading1">
                  <p className='text-align-center'>Nuestras Propiedades</p>
                  <h3 className='text-align-center'>Descubre Nuestras Últimas Propiedades</h3>
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
            {properties.map(property => (
              <SwiperSlide key={property.id}>
                <PropertyListSlide
                  title={property.title}
                  address={property.address}
                  price={property.price}
                  imageUrl={property.image}
                  isNew={true}
                  isForRent={true}
                  documentId={property.documentId}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
    </section>
  )
}
