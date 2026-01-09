'use client';

import React from 'react';
import styles from './Hero.module.css';
import BookingWidget from './BookingWidget';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.background} />

            <div className={styles.container}>
                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className={styles.title}>
                        Sketch Cabs <br />
                        <span>Oneway Drop Taxi</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Discover the versatile and affordable cab services designed to make your journeys seamless and enjoyable.
                        Transparent Pricing. Diverse Fleet Options.
                    </p>

                    <div className={styles.actions}>
                        <BookingWidget />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
