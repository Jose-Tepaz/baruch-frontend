'use client';

import { useState } from 'react';
import { useTranslation } from '@/utils/i18n-simple';

export default function TestimonialsContactForm() {
  const { t } = useTranslation('common'); 

  const [formData, setFormData] = useState({
    client_name: '',
    phone: '',
    email_address: '',
    interested_in: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitStatus('success');
      setFormData({ client_name: '', phone: '', email_address: '', interested_in: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-container-testimonials">
      <h3 className="form-title">{t('testimonials.contact-title')}</h3>
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
                type="number"
                placeholder={t('testimonials.phone-number')}
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
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
            <div className="input-area text-end">
              <button type="submit" className="vl-btn1" disabled={isSubmitting}>
                {isSubmitting ? (t('testimonials.submitting') || 'Enviando...') : t('testimonials.submit-now')}
                <span className="arrow1 ms-2"><i className="fa-solid fa-arrow-right" /></span>
                <span className="arrow2 ms-2"><i className="fa-solid fa-arrow-right" /></span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}


