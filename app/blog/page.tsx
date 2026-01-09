import React from 'react';
import type { Metadata } from 'next';
import styles from './page.module.css';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Travel Insights | Sketch Cabs',
    description: 'Read our latest blog posts about travel tips, destination guides, and cab services.',
};

const posts = [
    {
        id: 1,
        title: '5 Benefits of Choosing One Way Taxi for Your Next Trip',
        excerpt: 'Save money and travel with flexibility. Discover why one-way cabs are the smartest choice for intercity travel.',
        category: 'Travel Tips',
        slug: 'benefits-of-one-way-taxi',
    },
    {
        id: 2,
        title: 'Top Temple Tour Destinations in Tamil Nadu',
        excerpt: 'Plan your spiritual journey with our guide to the most divine and accessible temples in the region.',
        category: 'Destinations',
        slug: 'top-temple-tour-destinations',
    },
    {
        id: 3,
        title: 'Safe Travel Guidelines for Outstation Cabs',
        excerpt: 'How we ensure your safety and what you can do to have a secure and comfortable ride.',
        category: 'Safety',
        slug: 'safe-travel-guidelines',
    },
];

export default function BlogPage() {
    return (
        <main className={styles.section} style={{ paddingTop: '100px' }}>
            <div className={styles.container}>
                <h1 className={styles.title}>Travel Insights</h1>

                <div className={styles.grid}>
                    {posts.map((post) => (
                        <article key={post.id} className={styles.card}>
                            <div className={styles.cardImage}>
                                {/* Image placeholder */}
                                <span>Image Placeholder</span>
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>{post.category}</span>
                                <h2 className={styles.cardTitle}>{post.title}</h2>
                                <p className={styles.excerpt}>{post.excerpt}</p>
                                <Link href="#" className={styles.readMore}>
                                    Read Article <ArrowRight size={16} />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}
