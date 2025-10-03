'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '@/utils/i18n-simple';

export default function ContactForm() {
  const { t } = useTranslation('common'); 

  const [formData, setFormData] = useState({
    client_name: '',    
    phone: '',
    email_address: '',
    interested_in: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');

  const phoneInputRef = useRef(null);
  const itiRef = useRef(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
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
        } catch (_) {}
        return '';
      })();

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone: phoneFull || formData.phone,
        })
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitStatus('success');
      setFormData({ client_name: '', phone: '', email_address: '', interested_in: '', message: '' });
      try { if (phoneInputRef.current) phoneInputRef.current.value = ''; } catch (_) {}
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
    } catch (_) {}
  };

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
      try { itiRef.current?.destroy(); } catch (_) {}
    };
  }, []);

  return (
    <div className="" id="contact" >
      
      {submitStatus === 'success' && (
        <div className="alert alert-success mb-3">{t('testimonials.success-message')}</div>
      )}
      {submitStatus === 'error' && (
        <div className="alert alert-danger mb-3">{t('testimonials.error-message')}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="row g-2">
          <div className="col-lg-12">
            <div className="input-area">
              <input
                type="text"
                placeholder={t('testimonials.your-name')}
                value={formData.client_name}
                onChange={(e) => handleInputChange('client_name', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="input-area">
              <input
                type="tel"
                placeholder={t('testimonials.phone-number')}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                ref={phoneInputRef}
                autoComplete="tel"
                required
              />
              <input type="hidden" name="phone" value={formData.phone} />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="input-area">
              <input
                type="email"
                placeholder={t('testimonials.email-address')}
                value={formData.email_address}
                onChange={(e) => handleInputChange('email_address', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-lg-12">
            <select
              name="interested_in"
              id="interested_in"
              className="form-select"
              value={formData.interested_in}
              onChange={(e) => handleInputChange('interested_in', e.target.value)}
              required
            >
              <option value="">{t('testimonials.service-type')}</option>
              <option value="sell">{t('testimonials.service-type-1')}</option>
              <option value="buy">{t('testimonials.service-type-2')}</option>
              <option value="rent">{t('testimonials.service-type-3')}</option>
            </select>
          </div>
          <div className="col-lg-12">
            <div className="input-area">
              <textarea
                placeholder={t('testimonials.message')}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="space16" />
            <div className=" row d-flex justify-content-between align-items-center">
                <div className="col-lg-6">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" required/>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                        I agree with the privacy statement of Baruch S.L.
                        </label>
                    </div>
                </div>
                
            
                <div className="col-lg-6 d-flex justify-content-end">
                    <button type="submit" className="vl-btn1" disabled={isSubmitting}>
                    {isSubmitting ? (t('testimonials.submitting') || 'Enviando...') : t('testimonials.submit-now')}
                    <span className="arrow1 ms-2"><i className="fa-solid fa-arrow-right" /></span>
                    <span className="arrow2 ms-2"><i className="fa-solid fa-arrow-right" /></span>
                    
                    </button>
                </div>
                
            </div>
            <div className="space16" />
            <div style={{borderTop: '1px solid #000'}}></div>
            <div className="space16" />
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h2 className="text-color-black size-16">OR</h2>
                <div className="space16" />
                <button className="vl-btn1" style={{width: '100%', backgroundColor: '#25D366', color: '#fff'}}  onClick={() => window.open('https://wa.me/34600000000', '_blank')}>
                    <i className="fa-brands fa-whatsapp" style={{marginRight: '10px'}} />
                    Click to WhatsApp
                </button> 
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}


