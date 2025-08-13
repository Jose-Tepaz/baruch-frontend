'use client';
import TestimonialsContactForm from "./TestimonialsContactForm";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useTranslation } from "@/utils/i18n-simple";

export default function TestimonialList({ testimonials }: { testimonials: any[] }) {
    const { t } = useTranslation('common');
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
                {testimonials.map((t, idx) => (
                  <div key={idx} className="testimonial-card">
                    <div className="testimonial-content">
                      <BlocksRenderer content={t.testimonial_content}/>
                      
                      <div className="testimonial-author">
                        <span className="author-name">{t.name_of_client}</span>
                        <span className="author-location">, {t.position_of_client} (Client)</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Derecha: formulario + tarjetas */}
            <div className="col-lg-4 left-column-testimonials">
              <TestimonialsContactForm />

              <div className="space30"></div>

            
            </div>
          </div>
        </div>
        </div>
      </section>    
    )
}