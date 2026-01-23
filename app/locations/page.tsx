import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';
import { keywordGroups } from '@/lib/keywordPages';

export const metadata: Metadata = {
  title: 'Locations | Sketch Cabs',
  description:
    'Browse all service locations and routes for Sketch Cabs one-way, outstation, and airport transfers.',
};

export default function LocationsPage() {
  return (
    <main className={styles.section} style={{ paddingTop: '100px' }}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Service Areas</p>
          <h1 className={styles.title}>Browse Locations and Taxi Services</h1>
          <p className={styles.subtitle}>
            Select your district or route to see dedicated service pages for
            one-way, outstation, and airport travel.
          </p>
        </header>

        <nav className={styles.jumpList} aria-label="Location quick links">
          {keywordGroups.map((group, index) => (
            <a key={group.title} href={`#group-${index}`}>
              {group.title}
            </a>
          ))}
        </nav>

        <div className={styles.groups}>
          {keywordGroups.map((group, index) => (
            <section
              key={group.title}
              id={`group-${index}`}
              className={styles.group}
            >
              <div className={styles.groupHeader}>
                <h2>{group.title}</h2>
                <span className={styles.groupCount}>
                  {group.keywords.length} pages
                </span>
              </div>
              <div className={styles.keywordGrid}>
                {group.keywords.map((page) => (
                  <Link
                    key={page.slug}
                    href={`/locations/${page.slug}`}
                    className={styles.keywordLink}
                  >
                    {page.keyword}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
