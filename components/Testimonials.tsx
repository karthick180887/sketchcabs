import React from 'react';
import styles from './Testimonials.module.css';
import { Star } from 'lucide-react';

const reviews = [
    {
        initial: 'R',
        name: 'Rajesh Kumar',
        location: 'Bangalore to Salem',
        quote: 'Excellent service! The driver was very professional and the car (Innova Crysta) was neat and clean. We reached on time and the pricing was exactly as discussed with no hidden charges.',
    },
    {
        initial: 'S',
        name: 'Sarah Thomas',
        location: 'Chennai Airport Drop',
        quote: 'Booking was super easy. I needed a last-minute drop to the airport at 3 AM. The cab arrived 15 mins early. Safe driving and very polite driver. Highly recommended for solo female travelers.',
    },
    {
        initial: 'A',
        name: 'Anand V',
        location: 'Coimbatore to Ooty (Round Trip)',
        quote: 'Booked a round trip for my family vacation. The driver knew all the good spots in Ooty and acted like a guide. Very happy with the transparent billing system.',
    },
];

const Testimonials: React.FC = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.googleBadge}>
                        <span className={styles.googleLogo}>
                            <span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span>
                        </span>
                        <div className={styles.stars}>
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={18} fill="#FBBC05" stroke="none" />
                            ))}
                        </div>
                        <span className={styles.ratingText}>4.9/5</span>
                    </div>
                    <h2 className={styles.title}>What Our Customers Say</h2>
                    <p className={styles.subtitle}>Real stories from real journeys across South India.</p>
                </div>

                <div className={styles.grid}>
                    {reviews.map((review, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.cardStars}>
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} fill="#FBBC05" stroke="none" />
                                ))}
                            </div>
                            <p className={styles.quote}>{review.quote}</p>
                            <div className={styles.footer}>
                                <div className={styles.avatar}>{review.initial}</div>
                                <div className={styles.info}>
                                    <span className={styles.name}>{review.name}</span>
                                    <span className={styles.location}>{review.location}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
