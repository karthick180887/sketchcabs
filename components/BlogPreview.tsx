import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './BlogPreview.module.css';
import { ArrowRight } from 'lucide-react';

const posts = [
    {
        category: 'Travel Tips',
        title: 'Top 5 Tips for a Comfortable Long-Distance Cab Ride',
        excerpt: 'Make your intercity journey more enjoyable with these simple but effective travel tips...',
        date: 'Jan 5, 2026',
        readTime: '3 min read',
        image: '/blog-travel.png',
    },
    {
        category: 'Routes',
        title: 'Best Scenic Routes from Salem to Ooty',
        excerpt: 'Discover the most beautiful paths through the Nilgiri hills on your next trip...',
        date: 'Jan 2, 2026',
        readTime: '5 min read',
        image: '/blog-routes.png',
    },
    {
        category: 'Safety',
        title: 'How We Ensure Your Safety on Every Journey',
        excerpt: 'Learn about our driver verification process, GPS tracking, and 24/7 support system...',
        date: 'Dec 28, 2025',
        readTime: '4 min read',
        image: '/blog-safety.png',
    },
];

const BlogPreview: React.FC = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>From Our Blog</h2>
                    <Link href="/blog" className={styles.viewAll}>
                        View All Posts <ArrowRight size={16} />
                    </Link>
                </div>

                <div className={styles.grid}>
                    {posts.map((post, index) => (
                        <article key={index} className={styles.card}>
                            <div className={styles.image}>
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                            <div className={styles.content}>
                                <span className={styles.category}>{post.category}</span>
                                <h3 className={styles.cardTitle}>{post.title}</h3>
                                <p className={styles.excerpt}>{post.excerpt}</p>
                                <div className={styles.meta}>
                                    <span>{post.date}</span>
                                    <span>{post.readTime}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;
