// src/app/[lang]/services/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { Language, useTranslation, translations } from "@/utils/i18n-simple";
import { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import ContactForm from "@/components/sections/contactForm";

export default function ServiceDetailPage() {
  const params = useParams();
  const lang = (params.lang as Language) || "en";
  const id = params.id as string;
  const { t, i18n } = useTranslation("common");
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpandButton, setNeedsExpandButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Obtener el servicio actual desde las traducciones
  const service = useMemo(() => {
    const currentLang = lang || i18n.language || "en";
    const servicesList =
      (translations[currentLang]?.common as any)?.["services-page"]?.[
        "services-list"
      ] || [];
    return servicesList.find((s: any) => s.id === id);
  }, [lang, id, i18n.language]);

  // Verificar si el contenido necesita el botón de expandir
  useEffect(() => {
    // Esperar a que el contenido se renderice completamente
    const timer = setTimeout(() => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        setNeedsExpandButton(contentHeight > 600);
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [service]);

  // Si no se encuentra el servicio, mostrar mensaje de error
  if (!service) {
    return (
      <Layout>
        <div className="container mx-auto py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">
            {t("services-page.title")}
          </h1>
          <p className="text-gray-700 text-lg">Service not found</p>
          <Link
            href={`/${lang}/services`}
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            {t("services-page.btn-text")}
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className="about-hero-section"
        style={{
          backgroundImage: `url(${service.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="overlay-about-hero">
          <div className="padding-global">
            <div className="container-large">
              <div className="component-list-details">
                <div className="about-hero-content" style={{ textAlign: "center" , maxWidth: "800px", margin: "0 auto" }}>
                  <div className="main-title fade-in-up">
                    <h3 className="text-white text-align-center size-32">
                      {service.title}
                    </h3>
                  </div>

                  <div className="description fade-in-up">
                    <p className="size-16 text-align-center text-white">
                      {service.description.split("\n").map((line: string, index: number) => (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      ))}
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

      <div className="services-content-section">
        <div className="padding-global padding-section-medium">
          <div className="container-large">
            <div className="row gap-4 align-items-start">
              <div className="col-lg-6">
                <h3 className="heading-style-h4">
                  {service["title-list"]}
                </h3>
                {/* Lista simple de detalles */}
                <div style={{ position: 'relative' }}>
                  <div 
                    ref={contentRef}
                    className="service-details-list" 
                    style={{ 
                      marginTop: '24px',
                      maxHeight: !isExpanded && needsExpandButton ? '600px' : 'none',
                      overflow: !isExpanded && needsExpandButton ? 'hidden' : 'visible',
                      transition: 'max-height 0.5s ease-in-out',
                      position: 'relative'
                    }}
                  >
                    {service.details &&
                      service.details.map(
                        (
                          detail: { title: string; description: string } | string,
                          idx: number
                        ) => {
                          // Manejar tanto objetos como strings
                          const detailObj =
                            typeof detail === "string"
                              ? { title: detail, description: "" }
                              : detail;

                          return (
                            <div
                              key={idx}
                              style={{
                                height: 'fit-content',
                                marginBottom: '32px',
                                paddingBottom: '0px',
                                borderBottom: idx < service.details.length - 1 ? '1px solid #e5e7eb' : 'none'
                              }}
                            >
                              <h4
                                style={{
                                  fontSize: '18px',
                                  fontWeight: '600',
                                  color: '#1f2937',
                                  marginBottom: '12px',
                                  lineHeight: '1.5'
                                }}
                              >
                                {detailObj.title}
                              </h4>
                              {detailObj.description && (
                                <p
                                  style={{
                                    fontSize: '16px',
                                    color: '#4b5563',
                                    lineHeight: '1.6',
                                    margin: 0
                                  }}
                                >
                                  {detailObj.description.split("\n").map((line: string, index: number) => (
                                    <span key={index}>
                                      {line}
                                      <br />
                                    </span>
                                  ))}
                                </p>
                              )}
                            </div>
                          );
                        }
                      )}
                  </div>
                 
                  {needsExpandButton && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      style={{
                        marginTop: '24px',
                        padding: '12px 24px',
                        backgroundColor: 'transparent',
                        color: '#1f2937',
                        border: '1px solid #1f2937',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'color 0.3s ease',
                        display: 'inline-block'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#374151';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#1f2937';
                      }}
                    >
                      {isExpanded ? 'Read Less' : 'Read More'}
                      <span className="arrow1 ms-2"> {isExpanded ? <i className="fa-solid fa-minus" /> : <i className="fa-solid fa-plus" />}</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="col-lg-5">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
