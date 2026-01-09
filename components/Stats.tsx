'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './Stats.module.css';

const stats = [
    { label: 'Happy Customers', endValue: 15000, suffix: '+', displayValue: '15,000+' },
    { label: 'Kilometers Driven', endValue: 2, suffix: 'M+', displayValue: '2M+' },
    { label: 'Professional Drivers', endValue: 250, suffix: '+', displayValue: '250+' },
    { label: 'Google Rating', endValue: 4.9, suffix: '/5', displayValue: '4.9/5', isDecimal: true },
];

const AnimatedNumber: React.FC<{ end: number; suffix: string; isDecimal?: boolean }> = ({ end, suffix, isDecimal }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    const duration = 2000;
                    const steps = 60;
                    const increment = end / steps;
                    let current = 0;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= end) {
                            setCount(end);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(current));
                        }
                    }, duration / steps);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [end, hasAnimated]);

    const formatNumber = (num: number) => {
        if (isDecimal) return num.toFixed(1);
        if (num >= 1000) return num.toLocaleString();
        return num.toString();
    };

    return (
        <span ref={ref} className={styles.number}>
            {formatNumber(count)}{suffix}
        </span>
    );
};

const Stats: React.FC = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {stats.map((stat, index) => (
                        <div key={index} className={styles.statItem}>
                            <AnimatedNumber end={stat.endValue} suffix={stat.suffix} isDecimal={stat.isDecimal} />
                            <span className={styles.label}>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
