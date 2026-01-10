import React from 'react';
import styles from './FAQ.module.css';
import { HelpCircle } from 'lucide-react';

const questions = [
    {
        q: 'Does the fare include toll and parking charges?',
        a: 'No, toll fees, parking charges, and permit fees (for interstate travel) are extra and must be paid by the customer directly as per actuals.',
    },
    {
        q: 'Do you provide cabs for one-way drops?',
        a: 'Yes! We specialize in one-way taxi services. You only pay for the distance traveled from pickup to drop, without any return fare liability.',
    },
    {
        q: 'Is there a night driving charge?',
        a: 'Night charges may apply if the vehicle is used between 10 PM and 5 AM. Please confirm with our booking agent for specific route policies.',
    },
    {
        q: 'How can I book a cab?',
        a: 'You can book easily by calling us, sending a WhatsApp message, or filling out the enquiry form on our website. We will confirm your booking instantly.',
    },
];

const FAQ: React.FC = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Frequently Asked Questions</h2>
                    <p className={styles.subtitle}>Everything you need to know about our services and billing.</p>
                </div>

                <div className={styles.list}>
                    {questions.map((item, index) => (
                        <div key={index} className={styles.item}>
                            <h3 className={styles.question}>
                                <HelpCircle size={20} className="text-primary" style={{ color: 'hsl(var(--primary))' }} />
                                {item.q}
                            </h3>
                            <p className={styles.answer}>{item.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
