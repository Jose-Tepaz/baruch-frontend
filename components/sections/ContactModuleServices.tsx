'use client';
import { useTranslation } from "@/utils/i18n-simple";
import ContactSectionServices from "./ContactSectionServices";


export default function ContactModuleServices() {
    const { t } = useTranslation('common');
    return (
        <div className="padding-global" id="contact-form">
            <div className="container-large">
              <div className="row gap-4 align-items-start justify-content-between">
                <div className="col-lg-6  justify-content-center  align-items-start d-flex flex-column">
                  <div className="space30"></div>
                  <img src="/assets/img/all-images/service/entrance.webp" className="img-from-services" alt="Property services entrance" />
                  <div className="space30"></div>
                  <h2 className="text-color-black text-size-32">{t('services.property-services')}</h2>
                  <div className="space16"></div>
                  <p className="text-color-black text-size-medium" dangerouslySetInnerHTML={{ __html: t('services.property-services-description') }} style={{ whiteSpace: 'pre-line' }} />
                  <div className="space30"></div>
                </div>
                <div className="col-lg-5 m-auto d-flex" style={{ marginLeft: 'auto' }}>
                  <ContactSectionServices />
                </div>
              </div>
            </div>
          </div>
    );
}