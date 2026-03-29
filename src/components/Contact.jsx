import { useState } from 'react';
import { BOOKING_URL } from '../utils/booking';
import '../assets/styles/Contact.css';

const initialFormState = {
  from_name: '',
  from_email: '',
  phone_number: '',
  service: '',
  message: '',
};

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const Contact = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [activeTab, setActiveTab] = useState('contacto');
  const [submitStatus, setSubmitStatus] = useState('idle');



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(initialFormState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('sending');

    const submissionData = {
      access_key: WEB3FORMS_ACCESS_KEY,
      name: formData.from_name,
      email: formData.from_email,
      phone: formData.phone_number,
      service: formData.service,
      message: formData.message,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('idle');
        alert('Message sent successfully!');
        resetForm();
      } else {
        setSubmitStatus('idle');
        console.error('Web3Forms error:', result);
        alert(`Could not send the message. Details: ${result.message}`);
      }
    } catch (error) {
      setSubmitStatus('idle');
      console.error('Submission error:', error);
      alert('An error occurred submitting the form. Please try again later.');
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-info">
        <h1>Your ideas with us come <span>TRUE.</span></h1>
        <br />
        <p>Do you already know how we can collaborate?</p>
        <p>Use the form to contact us.</p>
        <p>You can also send us an email or call us.</p>
        <p>We are waiting!</p>
        <br />
        <hr className="separator" />
        <br />
        <div className="contact-details">
          <p> 📲 +353 83 487 9683</p>
          <p> am.softwaresolutions4@gmail.com</p>
        </div>
      </div>
      <div className="contact-form">
        <div className="form-switch">
          <button
            type="button"
            className={`contact-button ${activeTab === 'contacto' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacto')}
          >
            Contact us
          </button>
          <button
            type="button"
            className={`contact-button ${activeTab === 'llamada' ? 'active' : ''}`}
            onClick={() => setActiveTab('llamada')}
          >
            Book a meeting
          </button>
        </div>
        {activeTab === 'contacto' ? (
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="from_name"
                placeholder="Name"
                value={formData.from_name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="from_email"
                placeholder="Email"
                value={formData.from_email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                name="phone_number"
                placeholder="Phone"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="">Select services</option>
                <option value="Web and App development">Web and App development</option>
                <option value="Support">Support</option>
                <option value="Consultancy">Consultancy</option>
              </select>
            </div>
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <div className="schedule-call">
              <button
                className="schedule-button"
                type="submit"
                disabled={submitStatus === 'sending'}
              >
                {submitStatus === 'sending' ? 'Sending…' : 'Send message'}
              </button>
            </div>
          </form>
        ) : (
          <div className="schedule-call">
            <br />
            <h2>Now you can schedule a call with our team<span> immediately!!</span></h2>
            <br />
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="schedule-button schedule-button--link"
            >
              Schedule a call 📅
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
