'use client';

/**
 * Componente ContactForm
 * 
 * Este componente renderiza un formulario de contacto para la web de Baruch S.L.
 * Incluye campos para nombre, teléfono (con validación internacional), email, ciudad,
 * momento preferido de contacto, mensaje y aceptación de la política de privacidad.
 * 
 * Características principales:
 * - Traducción de textos mediante el hook useTranslation.
 * - Manejo de estado para los datos del formulario, estado de envío y validación.
 * - Integración con la librería intl-tel-input para el campo de teléfono internacional.
 * - Envío de los datos a la API interna /api/contact mediante POST.
 * - Mensajes de éxito o error tras el envío.
 * - Botón alternativo para contactar vía WhatsApp.
 * 
 * Hooks y referencias:
 * - useState: para manejar los datos del formulario y el estado de envío.
 * - useRef: para referenciar el input de teléfono y la instancia de intl-tel-input.
 * - useEffect: para inicializar y limpiar intl-tel-input.
 */

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '@/utils/i18n-simple';

export default function ContactForm() {
  // Hook de traducción
  const { t } = useTranslation('common');

  // Estado del formulario
  const [formData, setFormData] = useState({
    client_name: '',
    phone: '',
    email_address: '',
    // El campo interested_in se fija manualmente a "Concat general"
    interested_in: 'Concat general',
    city: '',
    preferred_contact_moment: '',
    message: ''
  });
  // Estado de envío y resultado
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');

  // Referencias para el input de teléfono y la instancia de intl-tel-input
  const phoneInputRef = useRef(null);
  const itiRef = useRef(null);

  /**
   * Actualiza el estado del formulario cuando cambia un campo.
   * @param {string} field - Nombre del campo a actualizar.
   * @param {string} value - Nuevo valor del campo.
   */
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  /**
   * Envía el formulario a la API interna.
   * Intenta obtener el teléfono en formato internacional E.164 usando intl-tel-input.
   * Muestra mensajes de éxito o error según la respuesta.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      // Obtiene el teléfono en formato internacional si es posible
      const phoneFull = (() => {
        try {
          if (itiRef.current && typeof (itiRef.current).getNumber === 'function') {
            const w = typeof window !== 'undefined' ? (window) : undefined;
            const utils = w?.intlTelInputUtils;
            const num = utils
              ? (itiRef.current).getNumber(utils.numberFormat?.E164 ?? 0)
              : (itiRef.current).getNumber();
            return num || '';
          }
        } catch (_) { }
        return '';
      })();

      // Envío de datos a la API, asegurando que interested_in siempre sea "Concat general"
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone: phoneFull || formData.phone,
          interested_in: 'Concat general'
        })
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitStatus('success');
      setFormData({
        client_name: '',
        phone: '',
        email_address: '',
        interested_in: 'Concat general',
        city: '',
        preferred_contact_moment: '',
        message: ''
      });
      try { if (phoneInputRef.current) phoneInputRef.current.value = ''; } catch (_) { }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Actualiza el campo de teléfono en el estado del formulario usando intl-tel-input.
   * Si no se puede obtener el formato internacional, intenta construir uno básico.
   */
  const updatePhoneFromIti = () => {
    try {
      const inputEl = phoneInputRef.current;
      if (!itiRef.current || !inputEl) return;
      const w = typeof window !== 'undefined' ? (window) : undefined;
      const utils = w?.intlTelInputUtils;
      const e164 = utils
        ? (itiRef.current).getNumber(utils.numberFormat?.E164 ?? 0) || ''
        : (itiRef.current).getNumber() || '';
      if (e164) {
        setFormData(prev => ({ ...prev, phone: e164 }));
        return;
      }
      const raw = inputEl.value || '';
      const digits = raw.replace(/\D/g, '');
      const data = (itiRef.current).getSelectedCountryData?.();
      const dial = data?.dialCode ? `+${data.dialCode}` : '';
      const fallback = dial && digits ? `${dial}${digits}` : (digits ? `+${digits}` : '');
      setFormData(prev => ({ ...prev, phone: fallback }));
    } catch (_) { }
  };

  /**
   * useEffect para inicializar intl-tel-input en el input de teléfono.
   * Configura opciones como país inicial, separación de código de país, etc.
   * Añade y limpia los event listeners necesarios.
   */
  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (!phoneInputRef.current) return;
      const mod = await import('intl-tel-input');
      if (!isMounted || !phoneInputRef.current) return;
      const options = {
        initialCountry: 'auto',
        geoIpLookup: (callback) => {
          fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
              const code = (data && data.country_code ? String(data.country_code).toLowerCase() : 'us');
              callback(code);
            })
            .catch(() => callback('us'));
        },
        separateDialCode: true,
        nationalMode: false,
        autoPlaceholder: 'polite',
        formatOnDisplay: true,
        utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js',
      };
      itiRef.current = (mod).default(phoneInputRef.current, options);

      updatePhoneFromIti();
      const inputEl = phoneInputRef.current;
      const handler = () => updatePhoneFromIti();
      inputEl?.addEventListener('input', handler);
      inputEl?.addEventListener('change', handler);
      inputEl?.addEventListener('keyup', handler);
      inputEl?.addEventListener('countrychange', handler);

      return () => {
        inputEl?.removeEventListener('input', handler);
        inputEl?.removeEventListener('change', handler);
        inputEl?.removeEventListener('keyup', handler);
        inputEl?.removeEventListener('countrychange', handler);
      };
    })();
    return () => {
      isMounted = false;
      try { itiRef.current?.destroy(); } catch (_) { }
    };
  }, []);

  // Renderizado del formulario
  return (
    <div className="" id="contact" >

      {/* Mensajes de éxito o error tras el envío */}
      {submitStatus === 'success' && (
        <div className="alert alert-success mb-3">{t('contact-form.success-message')}</div>
      )}
      {submitStatus === 'error' && (
        <div className="alert alert-danger mb-3">{t('contact-form.error-message')}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="row g-2">
          {/* Nombre */}
          <div className="col-lg-12">
            <div className="row g-2">
              {/* Campo hidden para interested_in */}
              <input
                type="hidden"
                name="interested_in"
                value="Concat general"
                readOnly
              />
            </div>
            <div className="input-area">
              <input
                type="text"
                placeholder={t('contact-form.input-name')}
                value={formData.client_name}
                onChange={(e) => handleInputChange('client_name', e.target.value)}
                required
              />
            </div>
          </div>
          {/* Email */}
          <div className="col-lg-12">
            <div className="input-area">
              <input
                type="email"
                placeholder={t('contact-form.input-email')}
                value={formData.email_address}
                onChange={(e) => handleInputChange('email_address', e.target.value)}
                required
              />
            </div>
          </div>
          {/* Teléfono */}
          <div className="col-lg-12">
            <div className="input-area">
              <input
                type="tel"
                placeholder={t('contact-form.input-phone')}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                ref={phoneInputRef}
                autoComplete="tel"
                required
              />
              <input type="hidden" name="phone" value={formData.phone} />
            </div>
          </div>

          <div className="row g-2">
            {/* Ciudad */}
            <div className="col-lg-6 auto-col-12 min-col-12 mobile-col-12 tablet-col-12">
              <div className="input-area">
                <input
                  type="text"
                  placeholder={t('contact-form.input-city')}
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required
                />
              </div>
            </div>
            {/* Momento preferido de contacto */}
            <div className="col-lg-6 auto-col-12 tablet-col-12 min-col-12 mobile-col-12">
              <div className="input-area">
                <input
                  type="text"
                  placeholder={t('contact-form.input-preferred_contact_moment')}
                  value={formData.preferred_contact_moment}
                  onChange={(e) => handleInputChange('preferred_contact_moment', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Mensaje */}
          <div className="col-lg-12">
            <div className="input-area">
              <textarea
                placeholder={t('contact-form.input-message')}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                required
              />
            </div>
          </div>
          {/* Declaración de privacidad */}
          <div className="col-lg-12">
            <div className="space16" />
            <div className=" row d-flex justify-content-between align-items-center">
              <div className="col-lg-6">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" required />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    {t('contact-form.privacy-statement')}
                  </label>
                </div>
              </div>

              {/* Botón de envío */}

              <div className="col-lg-6 d-flex justify-content-end">
                <button type="submit" className="vl-btn1" disabled={isSubmitting}>
                  {isSubmitting ? (t('contact-form.submitting') || 'Enviando...') : t('contact-form.input-submit-now')}
                  <span className="arrow1 ms-2"><i className="fa-solid fa-arrow-right" /></span>
                  <span className="arrow2 ms-2"><i className="fa-solid fa-arrow-right" /></span>

                </button>
              </div>

            </div>
            <div className="space16" />
            <div style={{ borderTop: '1px solid #000' }}></div>
            <div className="space16" />
            <div className="d-flex flex-column justify-content-center align-items-center">
              <p className="text-color-black size-16">{t('contact-form.separator')}</p>
              <div className="space16" />
              <button className="vl-btn1" style={{ width: '100%', backgroundColor: '#25D366', color: '#fff' }} onClick={() => window.open('https://wa.me/34951651123', '_blank')}>
                <i className="fa-brands fa-whatsapp" style={{ marginRight: '10px' }} />
                {t('contact-form.input-click-to-whatsapp')}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
