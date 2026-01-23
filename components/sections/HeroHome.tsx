"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

type HeroProperty = {
    id: number | string;
    title: string;
    price?: number;
    image?: string;
    location?: any;
    is_featured?: boolean;
    documentId?: string;
    slug?: string;
};

interface HeroHomeProps {
    properties?: HeroProperty[];    
}

// Formatea el precio con símbolo Euro por defecto
function formatPrice(value?: number): string {
    if (typeof value !== "number") return "";
    try {
        return new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 0,
        }).format(value);
    } catch {
        return `€ ${value.toLocaleString()}`;
    }
}

export default function HeroHome({ properties = [] }: HeroHomeProps) {
    const getLocalizedPath = useLocalizedPath();
    
    const slides = useMemo(() => {
        const featured = properties.filter((p) => p.is_featured === true);
        return featured.slice(0, 10);
    }, [properties]);

    if (!slides || slides.length === 0) return null;

    return (
        <section className="hero-home-wrapper" style={{ position: "relative" }}>
            <Swiper
                modules={[EffectFade, Navigation]}
                effect="fade"
                loop
                navigation={{ nextEl: ".hero-home-next", prevEl: ".hero-home-prev" }}
                className="hero-home-swiper"
                style={{ width: "100%", height: "100%" }}
            >
                <h1 style={{ 
                    position: 'absolute', 
                    width: '1px', 
                    height: '1px', 
                    padding: '0', 
                    margin: '-1px', 
                    overflow: 'hidden', 
                    clip: 'rect(0, 0, 0, 0)', 
                    whiteSpace: 'nowrap', 
                    borderWidth: '0'
                }}>
                    Baruch Real Estate - Exclusive Properties
                </h1>
                {slides.map((property) => (
                    <SwiperSlide key={property.id}>
                        <div
                            style={{
                                width: "100%",
                                minHeight: "100svh",
                                backgroundImage: `url(${property.image || "/assets/img/all-images/hero/hero-img.webp"})`,
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                position: "relative",
                            }}
                        >
                            {/* Overlay oscuro para contraste del texto */}
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background:
                                        "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.75) 100%)",
                                }}
                            />

                            {/* Contenido inferior izquierdo */}
                            <div className="container" style={{ position: "relative", zIndex: 2, height: "100vh" }}>
                                <div style={{ position: "absolute", left: 0, right: 0, bottom: 40, width: "90%", margin: "0 auto" }}>
                                    <div style={{ maxWidth: 880 }}>
                                        
                                            <div
                                                className="subtitle-properties text-color-white mb-3"

                                            >
                                                {property.location?.name || property.location || ''}
                                                
                                            </div>
                                        
                                        <Link href={getLocalizedPath(`/property/${property.slug || ""}`)} className="text-decoration-none" style={{ color: "inherit" }}>
                                        <h3 className="title-properties text-color-white size-42">
                                                {property.title} 
                                        </h3>
                                        <div style={{ height: 18 }} />
                                        <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#fff", fontSize: 20 }}>
                                                € {property.price?.toLocaleString('es-ES')}
                                                <span aria-hidden style={{ color: "#fff", fontSize: 22 }}>→</span> 
                                        </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Flechas de navegación */}
                            <button
                                className="hero-home-prev"
                                aria-label="Anterior"
                                style={arrowStyle({ position: "left" })}
                            >
                                ←
                            </button>
                            <button
                                className="hero-home-next"
                                aria-label="Siguiente"
                                style={arrowStyle({ position: "right" })}
                            >
                                →
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

function arrowStyle({ position }: { position: "left" | "right" }) {
    return {
        position: "absolute" as const,
        top: "50%",
        transform: "translateY(-50%)",
        [position]: 12,
        zIndex: 3,
        width: 36,
        height: 36,
        borderRadius: 6,
        background: "rgba(0,0,0,0.45)",
        color: "#fff",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
    } as const;
}


