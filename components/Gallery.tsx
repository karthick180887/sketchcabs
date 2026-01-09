import React from 'react';
import Image from 'next/image';
import styles from './Gallery.module.css';

const galleryItems = [
    {
        image: '/happy-customers.png',
        title: 'Happy Families',
        description: 'Creating memorable journeys for families across South India',
    },
    {
        image: '/corporate-event.png',
        title: 'Corporate Travel',
        description: 'Professional transportation for business events and executives',
    },
];

const Gallery: React.FC = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Our Happy Journeys</h2>
                    <p className={styles.subtitle}>Capturing moments from our customer travels</p>
                </div>

                <div className={styles.grid}>
                    {galleryItems.map((item, index) => (
                        <div key={index} className={styles.card}>
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className={styles.image}
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className={styles.overlay}>
                                <h3 className={styles.cardTitle}>{item.title}</h3>
                                <p className={styles.cardText}>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
