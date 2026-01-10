import React from 'react';
import styles from './FleetCard.module.css';
import Button from './Button';
import { Users, Briefcase, Fuel } from 'lucide-react';

interface FleetProps {
    name: string;
    type: string;
    fuel: string;
    seats: number;
    luggage: number;
    price: string;
    description: string;
}

const FleetCard: React.FC<FleetProps> = ({ name, type, fuel, seats, luggage, price, description }) => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3 className={styles.title}>{name}</h3>
                <span className={styles.type}>{type}</span>
            </div>

            <div className={styles.body}>
                <div className={styles.priceSection}>
                    <div className={styles.priceItem}>
                        <span className={styles.priceLabel}>Rate (per km)</span>
                        <span className={styles.priceValue}>{price}</span>
                    </div>
                </div>

                <div className={styles.specs}>
                    <div className={styles.specItem} title="Passengers">
                        <Users size={18} />
                        <span>{seats} Seats</span>
                    </div>
                    <div className={styles.specItem} title="Luggage Bags">
                        <Briefcase size={18} />
                        <span>{luggage} Bags</span>
                    </div>
                    <div className={styles.specItem} title="Fuel Type">
                        <Fuel size={18} />
                        <span>{fuel}</span>
                    </div>
                </div>

                <p className={styles.note}>{description}</p>
            </div>

            <div className={styles.footer}>
                <Button href="/contact" size="sm" style={{ width: '100%' }}>
                    Book This Cab
                </Button>
            </div>
        </div>
    );
};

export default FleetCard;
