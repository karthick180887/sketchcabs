'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './PromoCarousel.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    { src: '/promo-1-intro.png', alt: 'Sketch Cabs - Premium Travel Service' },
    { src: '/promo-2-booking.png', alt: 'Easy Booking' },
    { src: '/promo-3-fleet.png', alt: 'Premium Fleet' },
    { src: '/promo-4-driver.png', alt: 'Professional Drivers' },
    { src: '/promo-5-family.png', alt: 'Family Friendly Service' },
    { src: '/promo-6-cta.png', alt: 'Book Your Cab Today' },
];

const PromoCarousel: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, []);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    // Auto-advance every 4 seconds
    useEffect(() => {
        const timer = setInterval(nextSlide, 4000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Why Choose Sketch Cabs?</h2>
                </div>

                <div className={styles.carouselWrapper}>
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`${styles.slide} ${index === currentSlide ? styles.slideActive : ''}`}
                        >
                            <Image
                                src={slide.src}
                                alt={slide.alt}
                                fill
                                className={styles.slideImage}
                                priority={index === 0}
                            />
                        </div>
                    ))}

                    <div className={styles.controls}>
                        <button onClick={prevSlide} className={styles.navButton} aria-label="Previous">
                            <ChevronLeft size={24} />
                        </button>
                        <button onClick={nextSlide} className={styles.navButton} aria-label="Next">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div className={styles.dots}>
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PromoCarousel;
