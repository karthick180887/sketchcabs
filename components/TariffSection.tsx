import React from 'react';
import styles from './TariffSection.module.css';
import { Users, Briefcase, Fuel } from 'lucide-react';

const tariffs = [
    { name: 'Mini', type: 'Mini (3+1)', fuel: 'Petrol', seats: 4, luggage: 0, price: '₹12', bata: '₹300' },
    { name: 'Sedan', type: 'Sedan (4+1)', fuel: 'Petrol', seats: 4, luggage: 3, price: '₹13', bata: '₹300' },
    { name: 'Etios', type: 'Etios (4+1)', fuel: 'Petrol', seats: 5, luggage: 3, price: '₹14', bata: '₹300' },
    { name: 'Sedan (Non-CNG)', type: 'Sedan (4+1)', fuel: 'Petrol', seats: 5, luggage: 0, price: '₹14', bata: '₹300' },
    { name: 'SUV', type: 'SUV (7+1)', fuel: 'Petrol', seats: 8, luggage: 4, price: '₹18', bata: '₹300' },
    { name: 'Innova', type: 'Innova (6+1)', fuel: 'Petrol', seats: 7, luggage: 4, price: '₹19', bata: '₹300' },
    { name: 'Innova Crysta', type: 'Crysta (6+1)', fuel: 'Diesel', seats: 7, luggage: 4, price: '₹25', bata: '₹300' },
];

const TariffSection: React.FC = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Our Tariff Rates</h2>
                    <p className={styles.subtitle}>
                        Transparent pricing for all vehicle types. No hidden charges. Pay only for what you travel.
                    </p>
                </div>

                <div className={styles.grid}>
                    {tariffs.map((item, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.vehicleInfo}>
                                <h3 className={styles.vehicleName}>{item.name}</h3>
                                <p className={styles.vehicleType}>{item.type}</p>
                                <div className={styles.specs}>
                                    <span className={styles.spec}>
                                        <Users size={14} /> {item.seats} Seats
                                    </span>
                                    <span className={styles.spec}>
                                        <Briefcase size={14} /> {item.luggage} Bags
                                    </span>
                                    <span className={styles.spec}>
                                        <Fuel size={14} /> {item.fuel}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.pricing}>
                                <div className={styles.price}>{item.price}</div>
                                <div className={styles.priceUnit}>per km</div>
                                <div className={styles.bata}>+ {item.bata} bata</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TariffSection;
