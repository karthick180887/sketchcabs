import React from 'react';
import type { Metadata } from 'next';
import styles from './page.module.css';
import ServiceCard from '@/components/ServiceCard';
import FleetCard from '@/components/FleetCard';
import { ArrowRight, Repeat, Map, Plane, ShieldCheck, Wallet } from 'lucide-react';

const oneWayTermText = 'Minimum 130 km per day. Toll fees, inter-state permit, waiting charges, parking charges, pet charges, hill station charges (if any) are extra.';
const roundTripTermText = 'Minimum 250 km per day. Toll fees, inter-state permit, waiting charges, parking charges, pet charges, hill station charges (if any) are extra.';

const oneWayFleet = [
    {
        name: 'Mini',
        type: 'Mini (3+1)',
        fuel: 'Petrol',
        seats: 4,
        luggage: 0,
        price: '₹12',
        description: oneWayTermText
    },
    {
        name: 'Sedan',
        type: 'Sedan (4+1)',
        fuel: 'Petrol',
        seats: 4,
        luggage: 3,
        price: '₹13',
        description: oneWayTermText
    },
    {
        name: 'Etios',
        type: 'Etios (4+1)',
        fuel: 'Petrol',
        seats: 5,
        luggage: 3,
        price: '₹14',
        description: oneWayTermText
    },
    {
        name: 'Sedan (Non-CNG)',
        type: 'Sedan (4+1)',
        fuel: 'Petrol',
        seats: 5,
        luggage: 0,
        price: '₹14',
        description: oneWayTermText
    },
    {
        name: 'SUV',
        type: 'SUV (7+1)',
        fuel: 'Petrol',
        seats: 8,
        luggage: 4,
        price: '₹18',
        description: oneWayTermText
    },
    {
        name: 'Innova',
        type: 'Innova (6+1)',
        fuel: 'Petrol',
        seats: 7,
        luggage: 4,
        price: '₹19',
        description: oneWayTermText
    },
    {
        name: 'Innova Crysta',
        type: 'Innova Crysta',
        fuel: 'Diesel',
        seats: 7,
        luggage: 4,
        price: '₹25',
        description: oneWayTermText
    },
];

const roundTripFleet = [
    {
        name: 'Mini',
        type: 'Mini (3+1)',
        fuel: 'Petrol',
        seats: 4,
        luggage: 0,
        price: '₹11',
        description: roundTripTermText
    },
    {
        name: 'Sedan',
        type: 'Sedan (4+1)',
        fuel: 'Petrol',
        seats: 4,
        luggage: 3,
        price: '₹12',
        description: roundTripTermText
    },
    {
        name: 'Etios',
        type: 'Etios (4+1)',
        fuel: 'Petrol',
        seats: 5,
        luggage: 3,
        price: '₹13',
        description: roundTripTermText
    },
    {
        name: 'Sedan (Non-CNG)',
        type: 'Sedan (4+1)',
        fuel: 'Petrol',
        seats: 5,
        luggage: 0,
        price: '₹13',
        description: roundTripTermText
    },
    {
        name: 'SUV',
        type: 'SUV (7+1)',
        fuel: 'Petrol',
        seats: 8,
        luggage: 4,
        price: '₹16',
        description: roundTripTermText
    },
    {
        name: 'Innova',
        type: 'Innova (6+1)',
        fuel: 'Petrol',
        seats: 7,
        luggage: 4,
        price: '₹17',
        description: roundTripTermText
    },
    {
        name: 'Innova Crysta',
        type: 'Innova Crysta',
        fuel: 'Diesel',
        seats: 7,
        luggage: 4,
        price: '₹20',
        description: roundTripTermText
    },
];

export const metadata: Metadata = {
    title: 'Our Offerings | Sketch Cabs',
    description: 'Explore our key services including One-Way Cabs, Round-Trip Cabs, Temple Tours, and Airport Transfers.',
};

const services = [
    {
        title: 'One-Way Cabs',
        description: 'Get Started with our efficient one-way drop services. Pay only for one way.',
        icon: ArrowRight,
    },
    {
        title: 'Round-Trip Cabs',
        description: 'Comprehensive round-trip services for your outstation needs. Affordable and comfortable.',
        icon: Repeat,
    },
    {
        title: 'Temple Tours',
        description: 'Visit divine destinations with our specialized temple tour packages.',
        icon: Map,
    },
    {
        title: 'Airport Transfers',
        description: 'Seamless airport pickups and drops to ensure you never miss a flight.',
        icon: Plane,
    },
];

export default function OfferingsPage() {
    return (
        <main className={styles.section} style={{ paddingTop: '100px' }}>
            <div className={styles.container}>
                <div className={styles.titleSection}>
                    <h1 className={styles.title}>Our Offerings</h1>
                    <p className={styles.subtitle}>
                        Discover the versatile and affordable cab services designed to make your journeys seamless and enjoyable.
                    </p>
                </div>

                <div className={styles.grid}>
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            title={service.title}
                            description={service.description}
                            icon={service.icon}
                        />
                    ))}
                </div>

                <div className={styles.features}>
                    <div className={styles.container}>
                        <div className={styles.titleSection}>
                            <h2 className={styles.title}>Tariff Rates</h2>
                            <p className={styles.subtitle}>
                                Select the tariff type that matches your journey.
                            </p>
                        </div>

                        <div className={styles.tariffGroup}>
                            <h3 className={styles.tariffTitle}>One-Way Tariff</h3>
                            <p className={styles.tariffSubtitle}>Ideal for point-to-point drops across cities.</p>
                            <div className={styles.grid}>
                                {oneWayFleet.map((item, index) => (
                                    <FleetCard key={`oneway-${index}`} {...item} />
                                ))}
                            </div>
                        </div>

                        <div className={styles.tariffGroup}>
                            <h3 className={styles.tariffTitle}>Round-Trip Tariff</h3>
                            <p className={styles.tariffSubtitle}>Best for multi-day travel and return journeys.</p>
                            <div className={styles.grid}>
                                {roundTripFleet.map((item, index) => (
                                    <FleetCard key={`roundtrip-${index}`} {...item} />
                                ))}
                            </div>
                        </div>

                        <div className={styles.titleSection}>
                            <h2 className={styles.title}>Why Choose Us?</h2>
                            <p className={styles.subtitle}>
                                Experience unparalleled service with transparent pricing and a diverse fleet.
                            </p>
                        </div>

                        <div className={styles.featureGrid}>
                            <div className={styles.featureItem}>
                                <Wallet size={48} className="text-secondary mb-4 mx-auto" style={{ color: 'hsl(var(--primary))' }} />
                                <h3>Transparent Pricing</h3>
                                <p>No hidden charges. Clear billing with toll and parking details explicitly mentioned.</p>
                            </div>
                            <div className={styles.featureItem}>
                                <ShieldCheck size={48} className="text-secondary mb-4 mx-auto" style={{ color: 'hsl(var(--primary))' }} />
                                <h3>Safe & Secure</h3>
                                <p>Verified drivers, tracked journeys, and 24/7 support for your safety.</p>
                            </div>
                            <div className={styles.featureItem}>
                                <Wallet size={48} className="text-secondary mb-4 mx-auto" style={{ color: 'hsl(var(--primary))' }} />
                                <h3>Corporate Fleet</h3>
                                <p>Premium Sedans and SUVs available for business delegates with monthly billing options.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
