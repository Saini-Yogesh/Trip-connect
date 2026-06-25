import React, { useState } from "react";
import { ChevronDown, HelpCircle, Mail, Send } from "lucide-react";
import styles from "./HelpCenterPage.module.css";
import Button from "../../components/Button/Button.jsx";

const HelpCenterPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      q: "How does matching work on TripConnect?",
      a: "Hosts list their trips with destinations, dates, descriptions, and budgets. Other members browse and send Join Requests. The host reviews their profile (bio, interests, rating, age, gender) and can either accept or reject the request. If accepted, the member is added to the private group chat room.",
    },
    {
      q: "Is TripConnect free to use?",
      a: "Yes! TripConnect is completely free to create profiles, host trips, request to join groups, and chat. We do not charge service fees or handle trip payments. All expenses are divided and settled independently among members.",
    },
    {
      q: "Can I request to join multiple trips?",
      a: "Absolutely. You can request to join multiple trips. Once a host approves your request, you'll be added to the trip group. Be sure to withdraw requests or communicate in the chat if you decide not to join, so hosts can free up spots for other travelers.",
    },
    {
      q: "What happens if a co-traveler cancels?",
      a: "Because TripConnect is a community matching service, cancellations are managed directly between users. We advise groups to confirm final details, accommodation bookings, and transport reservations closer to the date. If a member drops out, hosts can accept pending join requests to fill the empty spot.",
    },
    {
      q: "How do reviews and ratings work?",
      a: "Once a trip ends, members can leave a peer review (1 to 5 stars + a comment) for other members in that trip. This feedback calculates the member's average rating shown on their profile, ensuring a transparent and trusted community.",
    },
  ];

  const handleToggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className="container">
        <div className={styles.titleSection}>
          <h1>Help Center</h1>
          <p>Find answers to common questions or reach out to our traveler support team.</p>
        </div>

        <div className={styles.layoutGrid}>
          {/* FAQ Column */}
          <div className={styles.faqCol}>
            <h2>Frequently Asked Questions</h2>
            <div className={styles.faqList}>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`${styles.faqItem} glass-panel`}
                  onClick={() => handleToggleFaq(i)}
                >
                  <div className={styles.faqHeader}>
                    <h3>{faq.q}</h3>
                    <ChevronDown
                      size={18}
                      className={`${styles.chevronIcon} ${activeFaq === i ? styles.chevronActive : ""}`}
                    />
                  </div>
                  {activeFaq === i && (
                    <div className={styles.faqAnswer}>
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support Column */}
          <div className={styles.contactCol}>
            <h2>Submit a Support Ticket</h2>
            <div className={`${styles.contactCard} glass-panel`}>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    required
                    placeholder="Your Name"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    required
                    placeholder="you@example.com"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="How can we help?"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Message Details</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={styles.formTextarea}
                    required
                    placeholder="Describe your issue or feedback in detail..."
                  />
                </div>

                <Button type="submit" variant="primary" style={{ width: "100%", justifyContent: "center" }}>
                  <Send size={16} style={{ marginRight: 8 }} /> Send Message
                </Button>

                {submitted && (
                  <div className={styles.successMsg}>
                    Thank you! Your ticket has been submitted. Our team will get back to you within 24 hours.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;
