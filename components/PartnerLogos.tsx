import React from 'react';
import styles from './PartnerLogos.module.css';
import { ShieldCheck, Award, Star, BadgeCheck, Clock } from 'lucide-react';

const partners = [
    { icon: Star, label: 'Google Rated' },
    { icon: ShieldCheck, label: 'Verified Business' },
    { icon: Award, label: 'Top Rated 2024' },
    { icon: BadgeCheck, label: 'Trusted Partner' },
    { icon: Clock, label: '24/7 Support' },
];

const PartnerLogos: React.FC = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <p className={styles.title}>Trusted By Thousands</p>
                <div className={styles.logos}>
                    {partners.map((partner, index) => (
                        <div key={index} className={styles.logo}>
                            <div className={styles.logoIcon}>
                                <partner.icon size={32} />
                            </div>
                            <span className={styles.logoText}>{partner.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnerLogos;
