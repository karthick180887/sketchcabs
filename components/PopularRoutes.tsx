'use client';

import React from 'react';
import styles from './PopularRoutes.module.css';
import { MapPin, ArrowRight } from 'lucide-react';

const routes = [
    { from: 'Salem', to: 'Chennai', distance: '340 km', price: '₹4,420' },
    { from: 'Bangalore', to: 'Salem', distance: '200 km', price: '₹2,600' },
    { from: 'Chennai', to: 'Bangalore', distance: '350 km', price: '₹4,550' },
    { from: 'Coimbatore', to: 'Chennai', distance: '500 km', price: '₹6,500' },
    { from: 'Salem', to: 'Tirupati', distance: '280 km', price: '₹3,640' },
    { from: 'Chennai', to: 'Ooty', distance: '560 km', price: '₹7,280' },
];

const PopularRoutes: React.FC = () => {
    const handleBookRoute = (from: string, to: string) => {
        const message = `Hello, I want to book a cab from ${from} to ${to}`;
        window.open(`https://wa.me/919500889142?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Popular Routes</h2>
                    <p className={styles.subtitle}>Most booked one-way drop routes. Click to book instantly.</p>
                </div>

                <div className={styles.grid}>
                    {routes.map((route, index) => (
                        <div
                            key={index}
                            className={styles.card}
                            onClick={() => handleBookRoute(route.from, route.to)}
                        >
                            <div className={styles.routeInfo}>
                                <div className={styles.routeIcon}>
                                    <MapPin size={24} />
                                </div>
                                <div className={styles.routeText}>
                                    <span className={styles.routeName}>{route.from} → {route.to}</span>
                                    <span className={styles.routeDistance}>{route.distance}</span>
                                </div>
                            </div>

                            <div className={styles.routePrice}>
                                <span className={styles.priceFrom}>Starting from</span>
                                <div className={styles.price}>{route.price}</div>
                            </div>

                            <ArrowRight className={styles.arrow} size={20} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularRoutes;
