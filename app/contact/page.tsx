import React from 'react';
import type { Metadata } from 'next';
import styles from './page.module.css';
import { Phone, Mail, MapPin } from 'lucide-react';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
    title: 'Contact Us | Sketch Cabs',
    description: 'Book your ride or get in touch with us. We are available 24/7.',
};

export default function ContactPage() {
    return (
        <main className={styles.section} style={{ paddingTop: '100px' }}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Info Side */}
                    <div className={styles.infoSection}>
                        <h1>Get in Touch</h1>
                        <p>
                            Smart Taxi, Smooth Travel. Contact us for bookings, inquiries, or support.
                        </p>

                        <div className={styles.details}>
                            <div className={styles.detailItem}>
                                <Phone />
                                <div className={styles.detailContent}>
                                    <h3>Phone</h3>
                                    <p><a href="tel:+919500889142">+91 95008 89142</a></p>
                                </div>
                            </div>
                            <div className={styles.detailItem}>
                                <Mail />
                                <div className={styles.detailContent}>
                                    <h3>Email</h3>
                                    <p><a href="mailto:giridhar1910@gmail.com">giridhar1910@gmail.com</a></p>
                                </div>
                            </div>
                            <div className={styles.detailItem}>
                                <MapPin />
                                <div className={styles.detailContent}>
                                    <h3>Address</h3>
                                    <p>389, Tharamangalam Main Road,<br />Suramanaglam, Salem-636005.</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Embed */}
                        <div style={{ width: '100%', height: '300px', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.369796076156!2d78.1128!3d11.6666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDQwJzAwLjAiTiA3OMKwMDYnNDYuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                title="Google Maps"
                            ></iframe>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className={styles.formSection}>
                        <h2 className={styles.formTitle}>Book Your Journey</h2>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </main>
    );
}
