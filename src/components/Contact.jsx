import { useState } from 'react';
import emailjs from 'emailjs-com';
import '../assets/styles/Contact.css';


const initialFormState = {
    from_name: '',
    from_email: '',
    phone_number: '',
    service: '',
    message: ''
  };    

const Contact = () => {
    const [formData, setFormData] = useState(initialFormState);
    const [activeTab, setActiveTab] = useState('contacto');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const resetForm = () => {
        setFormData(initialFormState);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_ac6ekzf', 'template_p6uwtqk', e.target, 'qNR_KxKatZqN_B3W0')
            .then(() => {
                alert('Message sent successfully!!');
                resetForm();
            }, (error) => {
                console.log('Error submitting data:', error.text);
                alert('There was an error submitting the form. Try again.');
            });
    };

    const handleScheduleMeeting = () => {
        const calendlyUrl = "https://calendly.com/am-softwaresolutions4/30min";
        window.open(calendlyUrl, '_blank');
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
                    <p> 📲 +598 95 254 671</p>
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
                            <button className="schedule-button" type="submit">Send message</button>
                        </div>
                    </form>
                ) : (
                    <div className="schedule-call">
                        <br />
                        <h2>Now you can schedule a call with our team<span> immediately!!</span></h2>
                        <br />
                        <button onClick={handleScheduleMeeting} className="schedule-button">Schedule a call 📅</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Contact;
