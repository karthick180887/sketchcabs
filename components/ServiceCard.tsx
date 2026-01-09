import React from 'react';
import styles from './ServiceCard.module.css';
import Button from './Button';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    href?: string;
    ctaText?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
    title,
    description,
    icon: Icon,
    href = '/contact',
    ctaText = 'Book Now'
}) => {
    return (
        <div className={styles.card}>
            <div className={styles.iconWrapper}>
                <Icon size={24} />
            </div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
            <Button href={href} variant="outline" size="sm">
                {ctaText}
            </Button>
        </div>
    );
};

export default ServiceCard;
