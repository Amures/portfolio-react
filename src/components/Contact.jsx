import { useState } from 'react';
import { BOOKING_URL } from '../utils/booking';
import { useReveal } from '../hooks/useReveal';
import '../assets/styles/Contact.css';

const EMAIL = 'am.softwaresolutions4@gmail.com';
const PHONE_DISPLAY = '+353 83 487 9683';
const PHONE_HREF = '+353834879683';

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
};

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name', required: true },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', required: true },
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel', required: false },
];

const SERVICES = ['Web and app development', 'Support', 'Consultancy'];

const Contact = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [activeTab, setActiveTab] = useState('form');
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const revealRef = useReveal();

  const isSending = status.state === 'sending';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot: bots fill every field they find, humans never see this one.
    if (e.target.company?.value) return;

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus({
        state: 'error',
        message: `The form is not configured right now. Please email me at ${EMAIL}.`,
      });
      return;
    }

    setStatus({ state: 'sending', message: '' });

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio contact from ${formData.name}`,
          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({
          state: 'success',
          message: 'Thanks! Your message is on its way. I usually reply within a day.',
        });
        setFormData(initialFormState);
      } else {
        setStatus({
          state: 'error',
          message: result.message || `Could not send the message. You can email me at ${EMAIL}.`,
        });
      }
    } catch {
      setStatus({
        state: 'error',
        message: `Something went wrong sending the form. You can email me at ${EMAIL}.`,
      });
    }
  };

  return (
    <section id="contact" className="section contact" ref={revealRef}>
      <div className="container contact__inner">
        <div className="contact__intro reveal">
          <p className="section-eyebrow">Contact</p>
          <h2 className="section-title">
            Let&apos;s build something <span className="contact__accent">real</span>.
          </h2>
          <p className="contact__lead">
            Have a product in mind, a team that needs an extra pair of hands, or just a question?
            Send a message or grab a slot in my calendar directly.
          </p>

          <ul className="contact__details">
            <li>
              <span className="contact__detail-label">Email</span>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </li>
            <li>
              <span className="contact__detail-label">Phone</span>
              <a href={`tel:${PHONE_HREF}`}>{PHONE_DISPLAY}</a>
            </li>
          </ul>
        </div>

        <div className="contact__panel lit-edge reveal">
          <div className="contact__tabs" role="tablist" aria-label="How to get in touch">
            <button
              type="button"
              role="tab"
              id="tab-form"
              aria-selected={activeTab === 'form'}
              aria-controls="panel-form"
              className={`contact__tab ${activeTab === 'form' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('form')}
            >
              Send a message
            </button>
            <button
              type="button"
              role="tab"
              id="tab-call"
              aria-selected={activeTab === 'call'}
              aria-controls="panel-call"
              className={`contact__tab ${activeTab === 'call' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('call')}
            >
              Book a call
            </button>
          </div>

          {activeTab === 'form' ? (
            <form
              id="panel-form"
              role="tabpanel"
              aria-labelledby="tab-form"
              className="contact__form"
              onSubmit={handleSubmit}
            >
              <div className="contact__row">
                {FIELDS.map((field) => (
                  <div key={field.name} className="contact__field">
                    <label htmlFor={`contact-${field.name}`}>
                      {field.label}
                      {!field.required && <span className="contact__optional"> (optional)</span>}
                    </label>
                    <input
                      id={`contact-${field.name}`}
                      name={field.name}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                    />
                  </div>
                ))}

                <div className="contact__field">
                  <label htmlFor="contact-service">What do you need?</label>
                  <select
                    id="contact-service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose one…</option>
                    {SERVICES.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="contact__field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Honeypot: hidden from people, irresistible to bots. */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                className="visually-hidden"
                aria-hidden="true"
              />

              <button type="submit" className="btn btn--primary btn--block" disabled={isSending}>
                {isSending ? 'Sending…' : 'Send message'}
              </button>

              <p
                className={`contact__status is-${status.state}`}
                role="status"
                aria-live="polite"
              >
                {status.message}
              </p>
            </form>
          ) : (
            <div
              id="panel-call"
              role="tabpanel"
              aria-labelledby="tab-call"
              className="contact__call"
            >
              <h3>Pick a time that works for you</h3>
              <p>
                A 30-minute call, no preparation needed. Tell me what you are building and I will
                tell you honestly whether I am the right person for it.
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary btn--block"
              >
                Open my calendar
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
