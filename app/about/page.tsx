import React from 'react';
import type { Metadata } from 'next';
import styles from './page.module.css';
import { Eye, Shield, Armchair } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About Us | Sketch Cabs',
    description: 'Learn about our mission to simplify intercity travel with affordable one-way cab services.',
};

export default function AboutPage() {
    return (
        <main className={styles.section} style={{ paddingTop: '100px' }}>
            <div className={styles.container}>
                <div className={styles.hero}>
                    <h1 className={styles.title}>Driving the Future of Intercity Travel</h1>
                    <p className={styles.text}>
                        One Way Taxi specializes in one-way cab services, eliminating return fare charges and making travel more economical.
                        We focus on providing comfortable and efficient point-to-point solutions for our clients.
                        We have proudly served a wide range of clients, including families, business travelers, and pilgrims,
                        ensuring their travel needs are met with care and professionalism.
                    </p>
                </div>

                <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '2rem' }}>Our Core Values</h2>

                <div className={styles.values}>
                    <div className={styles.valueCard}>
                        <Eye size={40} className="text-primary mx-auto" style={{ color: 'hsl(var(--primary))' }} />
                        <h3>Transparency</h3>
                        <p>
                            Honest pricing with no hidden costs. We believe in building trust through clear communication.
                        </p>
                    </div>
                    <div className={styles.valueCard}>
                        <Shield size={40} className="text-primary mx-auto" style={{ color: 'hsl(var(--primary))' }} />
                        <h3>Safety</h3>
                        <p>
                            Your safety is our priority. Experienced drivers and well-maintained vehicles for a worry-free journey.
                        </p>
                    </div>
                    <div className={styles.valueCard}>
                        <Armchair size={40} className="text-primary mx-auto" style={{ color: 'hsl(var(--primary))' }} />
                        <h3>Comfort</h3>
                        <p>
                            Enjoy a relaxing ride with our premium fleet. Clean interiors and air-conditioned specialized vehicles.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
