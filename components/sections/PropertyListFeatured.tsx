// components/sections/PropertieCardV1.tsx
"use client";

import Link from 'next/link'
import { useTranslation } from "@/utils/i18n-simple";
type PropertyCardProps = {
    title: string
    address: string
    price: number
    imageUrl: string
    isNew?: boolean
    isForRent?: string
    documentId: string
    slug: string
    propertyStatus: string
    highlight?: string
    category: string
    locale: string
    isPrivate: boolean
    location?: string | { name: string; slug: string }
  }
  
  export default function PropertyListSlide({
    title,
    address,
    price,
    imageUrl,
    isNew = false,
    documentId,
    slug,
    propertyStatus,
    isForRent,
    category,
    locale,
    isPrivate,
    location,
    highlight
   
  }: PropertyCardProps) {
    const { t } = useTranslation('common')
    // Validación de seguridad para la URL
    //const sanitizedUrl = documentId && typeof documentId === 'string' ? documentId.replace(/[^a-zA-Z0-9-_]/g, '') : ''
    
    // Validación de precio
    const formattedPrice = typeof price === 'number' && !isNaN(price) ? price : 0
    
    // Validación de imagen
    const safeImageUrl = imageUrl && typeof imageUrl === 'string' ? imageUrl : ''

    return (
      <>
        <style jsx>{`
          .property-card-hover img {
            transition: transform 0.3s ease;
          }
          .property-card-hover:hover img {
            transform: scale(1.05);
          }
        `}</style>
         
        
        <Link href={`/property/${slug}`} className="text-decoration-none">
          <div className="property-card property-card-hover border-0 shadow-sm  overflow-hidden d-flex flex-column justify-content-between">
            <div className="position-absolute top-0 start-0 p-3 d-flex gap-2 z-3" style={{zIndex: 10}}>
                {highlight && <span className="badge bg-light text-dark px-3 py-2">{highlight}</span>}
                
            </div>
            <div className="wrapp-img-card-properties">
            {safeImageUrl ? (
              <img
                src={safeImageUrl}
                className="card-img-top h-100 w-100 object-fit-cover"
                alt={title || 'Property image'}
                style={{ 
                  height: '350px', 
                  objectFit: 'cover', 
                  borderRadius: '0px', 
                  border: '1px solid #eaeaea'
                }}
              />
            ) : (
              <div style={{ height: '100%', backgroundColor: '#eaeaea', borderRadius: '10px', border: '1px solid #eaeaea' }} />
            )}
            </div>
            <div className="card-body-property text-white h-100 z-3 h-auto p-4">
              
              <p className="card-text mb-2">
                <i className="bi bi-geo-alt-fill me-1 text-white"></i>
                {typeof location === 'string' ? location : location?.name || ''}
              </p>
              <h3 className="title-properties text-color-white size-20">{title || 'Property'}</h3>
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold fs-5">
                  € {formattedPrice.toLocaleString('es-ES')}
                
                </span>
                <span className="btn btn-outline-light rounded-circle p-0 border-0" style={{ width: '32px', height: '32px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" className="bi bi-arrow-up-right-circle" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.854 10.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707z"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>
                </Link>
      </>
    )
  }

