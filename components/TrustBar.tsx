import React from 'react';
import styles from './TrustBar.module.css';
import { Star, ShieldCheck, Clock, Award } from 'lucide-react';

const TrustBar: React.FC = () => {
    return (
        <div className={styles.bar}>
            <div className={styles.container}>
                <div className={styles.item}>
                    <Star size={18} fill="#fbbf24" stroke="none" />
                    <span>4.9 Google Rating</span>
                </div>

                <div className={styles.item}>
                    <ShieldCheck size={18} />
                    <span>Verified Drivers</span>
                </div>

                <div className={styles.item}>
                    <Clock size={18} />
                    <span>On-Time Pickup</span>
                </div>

                <div className={styles.item}>
                    <Award size={18} />
                    <span>Top Rated Service</span>
                </div>
            </div>
        </div>
    );
};

export default TrustBar;
