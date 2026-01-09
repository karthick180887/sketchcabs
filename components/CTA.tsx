import React from 'react';
import styles from './CTA.module.css';
import Button from './Button';

const CTA: React.FC = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2 className={styles.title}>Ready to Ride?</h2>
                    <p className={styles.text}>
                        Schedule your one-way journey today and enjoy an unbeatable travel experience with Sketch Cabs!
                    </p>
                    <Button href="/contact" size="lg">
                        Book Your Taxi Now
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default CTA;
