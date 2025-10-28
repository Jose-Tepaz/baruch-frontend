'use client';
import { useState, useEffect } from 'react';
import TestimonialsContactForm from "./TestimonialsContactForm";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useTranslation } from "@/utils/i18n-simple";
import ContactForm from "./contactForm";
import Pagination from "@/components/elements/Pagination";

interface TestimonialListProps {
    testimonials: any[];
    searchParams?: {
        page?: string;
    };
    pagination?: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
    lang?: string;
}

export default function TestimonialList({ 
    testimonials, 
    searchParams = {},
    pagination,
    lang = 'en'
}: TestimonialListProps) {
    const { t } = useTranslation('common');
    
    // Estado para testimonios paginados
    const [paginatedTestimonials, setPaginatedTestimonials] = useState<any[]>([]);
    const [currentPagination, setCurrentPagination] = useState({
        page: 1,
        pageSize: 5,
        pageCount: 1,
        total: testimonials.length
    });

    // Calcular paginación
    useEffect(() => {
        const pageSize = 5;
        const currentPage = parseInt(searchParams.page || '1');
        const total = testimonials.length;
        const pageCount = Math.ceil(total / pageSize);
        
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedData = testimonials.slice(startIndex, endIndex);
        
        setPaginatedTestimonials(paginatedData);
        setCurrentPagination({
            page: currentPage,
            pageSize,
            pageCount,
            total
        });
    }, [testimonials, searchParams.page]);
    return (
        <section className="testimonials-section">
        <div className='padding-global'>
        <div className="container-large">
          <div className="row">
            {/* Izquierda: testimonios */}
            <div className="col-lg-8">
              <div className="testimonials-container">
                <div className="testimonials-title">
                  <h3 >{t('testimonials.title')}</h3>
                </div>
                <div className='space20'></div>
                {paginatedTestimonials.map((t, idx) => (
                  <div key={idx} className="testimonial-card">
                    <div className="testimonial-content">
                      <BlocksRenderer content={t.testimonial_content}/>
                      
                      <div className="testimonial-author">
                        <span className="author-name">{t.name_of_client}</span>
                        <span className="author-location">{t.position_of_client}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Paginación */}
                {currentPagination.pageCount > 1 && (
                  <div className="mt-5 col-12 mt-4 d-flex justify-content-center">
                    <Pagination
                      page={currentPagination.page}
                      pageCount={currentPagination.pageCount}
                      searchParams={searchParams}
                      basePath={`/${lang}/testimonials`}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Derecha: formulario + tarjetas */}
            <div className="col-lg-4 left-column-testimonials">
              <div className="bg-color-white" style={{ padding: '20px' }}>
                <h3 className="text-color-black size-20 uppercase">{t('contact-form.subtitle')}</h3>
                <h3 className="text-color-black size-42 uppercase">{t('contact-form.title')}</h3>
                <p className="text-color-black size-16">{t('contact-form.description')}</p>
                <div className="space16"></div>
              <ContactForm />
              </div>
              
              <div className="space30"></div>

            
            </div>
          </div>
        </div>
        </div>
      </section>    
    )
}