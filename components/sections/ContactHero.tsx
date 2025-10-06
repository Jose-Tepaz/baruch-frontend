'use client';
import Link from "next/link";
import { useTranslation } from "@/utils/i18n-simple";
import { useEffect } from 'react';
import Image1 from '@/public/assets/img/all-images/contact/contact-1.webp'

export default function ContactHero() {
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
            <div className="about-hero-section" style={{backgroundImage: `url(${Image1.src})`}}>
                <div className="overlay-contact-hero" >
                <div className="padding-global">
                    <div className="container-large"> 
                        <div className="wrapper-about-hero-content">                 
                            <div className="about-hero-content">
                                
                                
                                <div className="main-title fade-in-up">
                                    <h3 className="text-white text-align-center size-32">{t('contact.hero.title')}</h3>
                                </div>      
                                
                                <div className="description fade-in-up">
                                    <p className="size-16 text-align-center text-white">
                                        {t('contact.hero.description')}
                                    </p>
                                </div>
                                <div className="space20" />
                                <div className="space20" />
                                
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
                    </div>  
                
            </div>
        </>
    );
} 