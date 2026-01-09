'use client';

import React, { useState, useEffect } from 'react';
import styles from './StickyCTA.module.css';
import { Phone, MessageCircle } from 'lucide-react';

const StickyCTA: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling 500px
            setIsVisible(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`${styles.bar} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.container}>
                <p className={styles.text}>
                    🚕 Ready to travel? <span className={styles.highlight}>Book your one-way cab now!</span>
                </p>
                <div className={styles.actions}>
                    <a href="tel:+919500889142" className={styles.button}>
                        <Phone size={18} />
                        Call Now
                    </a>
                    <a
                        href="https://wa.me/919500889142"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.button} ${styles.buttonSecondary}`}
                    >
                        <MessageCircle size={18} />
                        WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
};

export default StickyCTA;
