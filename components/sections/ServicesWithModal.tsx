'use client';
import { useState } from 'react';
import { useTranslation } from "@/utils/i18n-simple";
import Image from 'next/image';
import Link from 'next/link';

interface ServiceModalData {
    id: string;
    title: string;
    description: string;
    details: string[];
    image: string;
}

export default function ServicesWithModal() {
    const { t } = useTranslation('common');
    const [selectedService, setSelectedService] = useState<ServiceModalData | null>(null);

    const services: ServiceModalData[] = [
        {
            id: 'nie-residency',
            title: t('services.modal.nie.title'),
            description: t('services.modal.nie.description'),
            details: [
                t('services.modal.nie.detail1'),
                t('services.modal.nie.detail2'),
                t('services.modal.nie.detail3'),
                t('services.modal.nie.detail4')
            ],
            image: '/assets/img/all-images/service/nie.webp'
        },
        {
            id: 'finance-mortgage',
            title: t('services.modal.finance.title'),
            description: t('services.modal.finance.description'),
            details: [
                t('services.modal.finance.detail1'),
                t('services.modal.finance.detail2'),
                t('services.modal.finance.detail3'),
                t('services.modal.finance.detail4')
            ],
            image: '/assets/img/all-images/service/sell.webp'
        },
        {
            id: 'insurance',
            title: t('services.modal.insurance.title'),
            description: t('services.modal.insurance.description'),
            details: [
                t('services.modal.insurance.detail1'),
                t('services.modal.insurance.detail2'),
                t('services.modal.insurance.detail3'),
                t('services.modal.insurance.detail4')
            ],
            image: '/assets/img/all-images/service/insurance.webp'
        },
        {
            id: 'tax-returns',
            title: t('services.modal.tax.title'),
            description: t('services.modal.tax.description'),
            details: [
                t('services.modal.tax.detail1'),
                t('services.modal.tax.detail2'),
                t('services.modal.tax.detail3'),
                t('services.modal.tax.detail4')
            ],
            image: '/assets/img/all-images/service/tax.webp'
        },
        {
            id: 'legal-services',
            title: t('services.modal.legal.title'),
            description: t('services.modal.legal.description'),
            details: [
                t('services.modal.legal.detail1'),
                t('services.modal.legal.detail2'),
                t('services.modal.legal.detail3'),
                t('services.modal.legal.detail4')
            ],
            image: '/assets/img/all-images/service/legal.webp'
        },
        {
            id: 'property-management',
            title: t('services.modal.management.title'),
            description: t('services.modal.management.description'),
            details: [
                t('services.modal.management.detail1'),
                t('services.modal.management.detail2'),
                t('services.modal.management.detail3'),
                t('services.modal.management.detail4')
            ],
            image: '/assets/img/all-images/service/management.webp'
        }
    ];

    const openModal = (service: ServiceModalData) => {
        setSelectedService(service);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedService(null);
        document.body.style.overflow = 'unset';
    };

    return (
        <>
            {/*===== SERVICES WITH MODAL AREA STARTS =======*/}
            <div className="services-modal-section bg-white">
                <div className="padding-global">
                    <div className="container-large">
                    <div className="row mt-5">
                    <div className="space60"></div>
                        <div className="col-lg-8 m-auto">
                            <div className="heading1 text-center space-margin60">
                            
                                <h2>{t('services.modal.main-title')}</h2>
                                <div className="space16" />
                                <p>{t('services.modal.subtitle')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row g-4">
                        {services.map((service) => (
                            <div key={service.id} className="col-lg-4 col-md-6">
                                <div 
                                    className="service-card-modal"
                                    onClick={() => openModal(service)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="service-image-wrapper">
                                        <Image 
                                            src={service.image} 
                                            alt={service.title}
                                            width={400}
                                            height={300}
                                            className="service-image"
                                        />
                                        <div className="service-overlay">
                                            <div className="service-label">
                                                <span>{service.title}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                        
                    </div>

                </div>
              
            </div>
            {/*===== SERVICES WITH MODAL AREA ENDS =======*/}

            {/*===== MODAL =======*/}
            {selectedService && (
                <div className="service-modal-overlay" onClick={closeModal}>
                    <div className="service-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="service-modal-close" onClick={closeModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        
                        <div className="modal-header">
                            <h3>{selectedService.title}</h3>
                        </div>
                        
                        <div className="modal-body">
                            <div className="modal-image-wrapper">
                                <Image 
                                    src={selectedService.image} 
                                    alt={selectedService.title}
                                    width={600}
                                    height={400}
                                    className="modal-image"
                                />
                            </div>
                            
                            <p className="modal-description">{selectedService.description}</p>
                            
                            <div className="modal-details">
                                <h4>{t('services.modal.what-we-offer')}</h4>
                                <ul>
                                    {selectedService.details.map((detail, index) => (
                                        <li key={index}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            <span>{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space30"></div>
                            <Link href="#contact-form" className="vl-btn1 is-primary" onClick={closeModal}>
                             {t('services.modal.btn-text')}
                              <span className="arrow1 ms-2">
                                <i className="fa-solid fa-arrow-right" />
                              </span>
                              <span className="arrow2 ms-2">
                                <i className="fa-solid fa-arrow-right" />
                              </span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            
        </>
    );
}
