"use client";

import { useTranslation } from "@/utils/i18n-simple";

interface LegalContentProps {
    policyType: 'terms' | 'privacy' | 'cookies';
    title?: string;
    updatedAt?: string;
    intro?: string;
}

export default function LegalContent({ policyType, title, updatedAt, intro }: LegalContentProps) {
    const { t } = useTranslation('legal');
    
    // Si no se pasan props, intenta obtenerlas de las traducciones
    const finalTitle = title || t(`${policyType}.title`);
    const finalUpdatedAt = updatedAt || t(`${policyType}.updatedAt`);
    const finalIntro = intro || t(`${policyType}.intro`);

    // Verificar si existe contenido para este tipo de política
    const hasContent = finalTitle !== `${policyType}.title`;

    return (
        <div className="policy-details">
            <div className="heading1">
                <h2>
                    {policyType === 'terms' && 'Terms & Conditions'}
                    {policyType === 'privacy' && 'Privacy Policy'}
                    {policyType === 'cookies' && 'Cookie Policy'}
                </h2>
                <div className="space24" />
                <h4>Effective Date: {hasContent ? finalUpdatedAt : ''}</h4>
                <div className="space16" />
                <p>{hasContent ? finalIntro : ''}</p>
                <div className="space32" />
                {Array.from({ length: 20 }).map((_, idx) => {
                    const headingKey = `${policyType}.sections.${idx}.heading`;
                    const heading = t(headingKey);
                    
                    // Si la traducción retorna la misma key, significa que no existe
                    if (heading === headingKey) return null;
                    
                    return (
                        <div key={idx}>
                            <h4>{heading}</h4>
                            <div className="space12" />
                            {Array.from({ length: 10 }).map((_, jdx) => {
                                const bodyKey = `${policyType}.sections.${idx}.body.${jdx}`;
                                const text = t(bodyKey);
                                
                                // Si la traducción retorna la misma key, significa que no existe
                                if (text === bodyKey) return null;
                                
                                return <p key={jdx} style={{ marginTop: 8 }}>{text}</p>
                            })}
                            <div className="space24" />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
