// src/app/[lang]/services/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { Language, useTranslation, translations } from "@/utils/i18n-simple";
import { useMemo, useState } from "react";
import Image from "next/image";
import ContactForm from "@/components/sections/contactForm";

export default function ServiceDetailPage() {
  const params = useParams();
  const lang = (params.lang as Language) || "en";
  const id = params.id as string;
  const { t, i18n } = useTranslation("common");

  // Estado para el accordion (solo uno abierto a la vez)
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [closingIdx, setClosingIdx] = useState<number | null>(null);

  // Obtener el servicio actual desde las traducciones
  const service = useMemo(() => {
    const currentLang = lang || i18n.language || "en";
    const servicesList =
      (translations[currentLang]?.common as any)?.["services-page"]?.[
        "services-list"
      ] || [];
    return servicesList.find((s: any) => s.id === id);
  }, [lang, id, i18n.language]);

  // Helper para toggle del accordion
  const handleToggle = (idx: number) => {
    if (openIdx === idx) {
      // Animate closing
      setOpenIdx(null);
      setClosingIdx(idx);
      setTimeout(() => setClosingIdx(null), 350);
    } else {
      // If already closing another, reset
      if (closingIdx !== null) setClosingIdx(null);
      setOpenIdx(idx);
    }
  };

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
                {/* Dropdown/Accordion FAQ style for service.details */}
                <div className="faq-dropdown space-y-4 mb-8">
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
                        const isOpen = openIdx === idx;
                        const isClosing = closingIdx === idx;

                        return (
                          <div
                            key={idx}
                            className="border rounded-md overflow-hidden transition-colors mb-2 w-full"
                          >
                            <div
                              className="flex items-center bg-transparent border-none justify-between py-3 font-medium text-gray-800 focus:outline-none hover:bg-gray-50 transition-colors relative select-none text-left"
                              aria-expanded={isOpen}
                              aria-controls={`faq-desc-${idx}`}
                              onClick={() => handleToggle(idx)}
                              style={{
                                cursor: "pointer",
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <span>{detailObj.title}</span>
                              <span className="w-4 h-4 mr-2 flex items-center justify-center">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  aria-hidden="true"
                                >
                                  <line x1="3" y1="8" x2="13" y2="8" />
                                  <line
                                    x1="8"
                                    y1="3"
                                    x2="8"
                                    y2="13"
                                    style={{
                                      opacity: isOpen ? 0 : 1,
                                      transform: `scaleY(${isOpen ? 0.5 : 1})`,
                                      transition:
                                        "opacity 0.2s, transform 0.2s",
                                    }}
                                  />
                                </svg>
                              </span>
                            </div>
                            {detailObj.description && (
                              <div
                                id={`faq-desc-${idx}`}
                                className={`px-6 text-gray-700 text-base transition-all duration-300 ease-in-out faq-dropdown-content
                                  ${isOpen ? "open" : ""} ${
                                  isClosing ? "closing" : ""
                                }
                                `}
                                style={{
                                  opacity: isOpen || isClosing ? 1 : 0,
                                  maxHeight: isOpen ? 500 : isClosing ? 0 : 0,
                                  overflow: "hidden",
                                  paddingTop:
                                    isOpen || isClosing ? "0.5rem" : 0,
                                  paddingBottom:
                                    isOpen || isClosing ? "1rem" : 0,
                                  pointerEvents:
                                    isOpen || isClosing ? "auto" : "none",
                                  transition:
                                    "max-height 0.3s cubic-bezier(.4,0,.2,1), opacity 0.25s, padding 0.3s",
                                }}
                              >
                                {detailObj.description}
                              </div>
                            )}
                          </div>
                        );
                      }
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
