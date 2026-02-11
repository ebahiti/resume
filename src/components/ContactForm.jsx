import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_CONTACT_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:3002');
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';

// Resume-appropriate topics (backend must accept these or use a resume contact API)
const validTopics = ['General Inquiry', 'Hiring / Job Opportunity', 'Other'];

function loadRecaptchaScript(siteKey) {
  return new Promise((resolve, reject) => {
    if (typeof window.grecaptcha !== 'undefined' && window.grecaptcha.execute) {
      if (window.grecaptcha.ready) {
        window.grecaptcha.ready(() => resolve());
      } else {
        resolve();
      }
      return;
    }
    const id = 'recaptcha-api-script';
    if (document.getElementById(id)) {
      const check = () => {
        if (window.grecaptcha && window.grecaptcha.execute) {
          if (window.grecaptcha.ready) {
            window.grecaptcha.ready(() => resolve());
          } else {
            resolve();
          }
          return;
        }
        requestAnimationFrame(check);
      };
      check();
      return;
    }
    const script = document.createElement('script');
    script.id = id;
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.onload = () => {
      if (window.grecaptcha && window.grecaptcha.ready) {
        window.grecaptcha.ready(() => resolve());
      } else {
        resolve();
      }
    };
    script.onerror = () => reject(new Error('reCAPTCHA script failed to load'));
    document.head.appendChild(script);
  });
}

export default function ContactForm() {
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) {
      setRecaptchaReady(true); // no captcha configured
      return;
    }
    loadRecaptchaScript(RECAPTCHA_SITE_KEY)
      .then(() => setRecaptchaReady(true))
      .catch(() => setRecaptchaReady(true)); // allow submit without token if script blocked (backend may still validate)
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    topic: '',
    message: '',
    website: '', // honeypot - hidden field
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [submitMessage, setSubmitMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length > 200) {
      newErrors.name = 'Name must be less than 200 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.topic) {
      newErrors.topic = 'Please select a topic';
    } else if (!validTopics.includes(formData.topic)) {
      newErrors.topic = 'Please select a valid topic';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length > 5000) {
      newErrors.message = 'Message must be less than 5000 characters';
    }

    if (formData.organization && formData.organization.length > 200) {
      newErrors.general = 'Organization must be less than 200 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.website) {
      setSubmitStatus('success');
      setSubmitMessage('Thank you for your message.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      let recaptchaToken = null;
      if (RECAPTCHA_SITE_KEY && window.grecaptcha && window.grecaptcha.execute) {
        try {
          recaptchaToken = await new Promise((resolve, reject) => {
            window.grecaptcha.ready(async () => {
              try {
                const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'contact' });
                resolve(token);
              } catch (e) {
                reject(e);
              }
            });
          });
        } catch (captchaErr) {
          console.error('reCAPTCHA error:', captchaErr);
          setSubmitStatus('error');
          setSubmitMessage('Captcha could not be loaded. Check that the site key is correct and try again. If you use an ad blocker, disable it for this site.');
          setIsSubmitting(false);
          return;
        }
      }

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        organization: formData.organization.trim() || undefined,
        topic: formData.topic,
        message: formData.message.trim(),
      };
      if (recaptchaToken) payload.recaptchaToken = recaptchaToken;

      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get('content-type');
      const isJson = contentType?.includes('application/json');
      const data = isJson ? await response.json() : {};

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setSubmitMessage(data.message || 'Thank you for your message. I will get back to you soon.');

        setFormData({
          name: '',
          email: '',
          organization: '',
          topic: '',
          message: '',
          website: '',
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.error || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
      setSubmitMessage('An error occurred while sending your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="contact-field">
        <label htmlFor="name">
          Name <span className="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="contact-field">
        <label htmlFor="email">
          Email <span className="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="contact-field">
        <label htmlFor="organization">Organization (optional)</label>
        <input
          type="text"
          id="organization"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      <div className="contact-field">
        <label htmlFor="topic">
          Topic <span className="required">*</span>
        </label>
        <select
          id="topic"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          className={errors.topic ? 'error' : ''}
        >
          <option value="">Select a topic</option>
          {validTopics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
        {errors.topic && <span className="error-message">{errors.topic}</span>}
      </div>

      <div className="contact-field">
        <label htmlFor="message">
          Message <span className="required">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          disabled={isSubmitting}
          className={errors.message ? 'error' : ''}
        />
        {errors.message && <span className="error-message">{errors.message}</span>}
      </div>

      {errors.general && <div className="error-alert">{errors.general}</div>}

      {submitStatus === 'success' && (
        <div className="success-alert">{submitMessage}</div>
      )}

      {submitStatus === 'error' && (
        <div className="error-alert">{submitMessage}</div>
      )}

      <div className="contact-actions">
        <button
          type="submit"
          className="contact-submit"
          disabled={isSubmitting || (RECAPTCHA_SITE_KEY && !recaptchaReady)}
        >
          {isSubmitting ? 'Sending...' : RECAPTCHA_SITE_KEY && !recaptchaReady ? 'Loading...' : 'Send message'}
        </button>
      </div>
    </form>
  );
}
