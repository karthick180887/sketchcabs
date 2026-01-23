import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import { Car, Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Brand Column */}
                    <div className={styles.column}>
                        <Link href="/" className={styles.logo}>
                            <Car size={28} className="text-primary" />
                            Sketch<span>Cabs</span>
                        </Link>
                        <p className={styles.description}>
                            Premium one-way drop taxi services across South India.
                            Safe, affordable, and comfortable journeys tailored to your needs.
                        </p>
                    </div>

                    {/* Links Column */}
                    <div className={styles.column}>
                        <h3>Quick Links</h3>
                        <ul className={styles.links}>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/offerings">Our Offerings</Link></li>
                            <li><Link href="/locations">Locations</Link></li>
                            <li><Link href="/blog">Blog</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Services Column - optional, kept simple */}
                    <div className={styles.column}>
                        <h3>Services</h3>
                        <ul className={styles.links}>
                            <li><Link href="/offerings">One-Way Drop</Link></li>
                            <li><Link href="/offerings">Round Trip</Link></li>
                            <li><Link href="/offerings">Airport Transfer</Link></li>
                            <li><Link href="/offerings">Temple Tour</Link></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className={styles.column}>
                        <div>
                            <h3 className={styles.columnTitle}>Accepted Payments</h3>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', color: '#cbd5e1' }}>
                                <div style={{ padding: '4px 8px', border: '1px solid currentColor', borderRadius: '4px', fontSize: '0.8rem' }}>Google Pay</div>
                                <div style={{ padding: '4px 8px', border: '1px solid currentColor', borderRadius: '4px', fontSize: '0.8rem' }}>PhonePe</div>
                                <div style={{ padding: '4px 8px', border: '1px solid currentColor', borderRadius: '4px', fontSize: '0.8rem' }}>UPI</div>
                                <div style={{ padding: '4px 8px', border: '1px solid currentColor', borderRadius: '4px', fontSize: '0.8rem' }}>Cash</div>
                            </div>
                        </div>

                        <div>
                            <h3 className={styles.columnTitle}>Contact Us</h3>
                            <ul className={styles.linkList}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Phone size={16} className={styles.icon} />
                                    <span>+91 95008 89142</span>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Mail size={16} className={styles.icon} />
                                    <span>giridhar1910@gmail.com</span>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                    <MapPin size={16} className={styles.icon} style={{ marginTop: '4px' }} />
                                    <span>389, Tharamangalam Main Road, Suramanaglam, Salem-636005</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; {currentYear} Sketch Cabs Oneway Taxi. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Link href="#" aria-label="Facebook"><Facebook size={20} /></Link>
                        <Link href="#" aria-label="Instagram"><Instagram size={20} /></Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
