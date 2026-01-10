import React from 'react';
import styles from './Features.module.css';
import { Clock, Shield, IndianRupee } from 'lucide-react';

const features = [
    {
        icon: IndianRupee,
        title: 'Transparent Pricing',
        description: 'No hidden costs. Pay only for one way drops. Toll and parking charges are billed separately and transparently.',
    },
    {
        icon: Shield,
        title: 'Safe & Secure',
        description: 'Verified drivers and GPS-tracked vehicles ensure your journey is safe, whether day or night.',
    },
    {
        icon: Clock,
        title: 'On-Time Pickup',
        description: 'Punctuality is our promise. Our drivers arrive before time to ensure you never miss a schedule.',
    },
];

const Features: React.FC = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Why Choose Sketch Cabs?</h2>
                    <p className={styles.subtitle}>
                        We redefine intercity travel with focus on customer satisfaction and value for money.
                    </p>
                </div>

                <div className={styles.grid}>
                    {features.map((feature, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.icon}>
                                <feature.icon size={24} />
                            </div>
                            <h3 className={styles.cardTitle}>{feature.title}</h3>
                            <p className={styles.cardText}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
