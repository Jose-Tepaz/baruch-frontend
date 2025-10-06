'use client';
import TestimonialsContactForm from "./TestimonialsContactForm";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useTranslation } from "@/utils/i18n-simple";
import ContactForm from "./contactForm";

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