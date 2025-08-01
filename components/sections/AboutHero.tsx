'use client';
import Link from "next/link";
import { useTranslation } from "@/utils/i18n-simple";
import { useEffect } from 'react';
import Image1 from '@/public/assets/img/all-images/about/img-about-1.png'

export default function AboutHero() {
    const { t, i18n } = useTranslation('common');

    useEffect(() => {
        // Activar animaciones
        const elements = document.querySelectorAll('.fade-in-up');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate');
            }, index * 200);
        });
    }, []);

    return (
        <>
            <div className="about-hero-section">
                <div className="padding-global">
                    <div className="container-large"> 
                        <div className="wrapper-about-hero-content">                 
                            <div className="about-hero-content">
                                <div className="subtitle fade-in-up">
                                    <h5 className="text-color-blue">{t('about.company')}</h5>
                                </div>
                                
                                <div className="main-title fade-in-up">
                                    <h1 className="heading-style-h2 text-align-center">
                                        {t('about.hero.title')}
                                    </h1>
                                </div>
                                
                                <div className="description fade-in-up">
                                    <p className="size-16 text-align-center">
                                        {t('about.hero.description')}
                                    </p>
                                </div>
                                <div className="space20" />
                                <div className="btn-area1 mt-0">
                                    <Link href="/contact" className="vl-btn1 mt-0">
                                        {t('about.hero.btn_text')}
                                        <span className="arrow1 ms-2">
                                            <i className="fa-solid fa-arrow-right" />
                                        </span>
                                        <span className="arrow2 ms-2">
                                            <i className="fa-solid fa-arrow-right" />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="about-hero-image fade-in-up">
                                <div className="image-container">
                                    <img 
                                        src={Image1.src} 
                                        alt="Modern Costa del Sol Property" 
                                        className="img-fluid"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 