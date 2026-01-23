import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CTA from '@/components/CTA';
import Button from '@/components/Button';
import WhatsAppButton from '@/components/WhatsAppButton';
import styles from './page.module.css';
import { keywordPageMap, keywordPages } from '@/lib/keywordPages';

type PageProps = {
  params: {
    slug: string;
  };
};

type KeywordContext = {
  keyword: string;
  serviceLabel: string;
  location: string;
  isRoute: boolean;
  from?: string;
  to?: string;
};

const servicePhrases = [
  'airport drop taxi',
  'one way taxi',
  'drop taxi',
  'outstation taxi',
  'outstation cab',
  'taxi service',
  'airport taxi',
  'cab',
  'taxi',
];

const serviceLabelMap: Record<string, string> = {
  'airport drop taxi': 'airport drop taxi',
  'one way taxi': 'one way taxi',
  'drop taxi': 'drop taxi',
  'outstation taxi': 'outstation taxi',
  'outstation cab': 'outstation cab',
  'taxi service': 'taxi service',
  'airport taxi': 'airport taxi',
  cab: 'cab service',
  taxi: 'taxi service',
};

const getServiceLabel = (serviceType?: string) => {
  if (!serviceType) {
    return 'taxi service';
  }
  return serviceLabelMap[serviceType] || serviceType;
};

const getKeywordContext = (keyword: string): KeywordContext => {
  const keywordLower = keyword.toLowerCase();
  const routeIndex = keywordLower.indexOf(' to ');

  if (routeIndex > -1) {
    const from = keyword.slice(0, routeIndex).trim();
    const rest = keyword.slice(routeIndex + 4).trim();
    const restLower = rest.toLowerCase();
    const serviceType = servicePhrases.find((phrase) =>
      restLower.endsWith(phrase)
    );
    const destination = serviceType
      ? rest.slice(0, rest.length - serviceType.length).trim()
      : rest;

    return {
      keyword,
      serviceLabel: getServiceLabel(serviceType),
      location: from || keyword,
      isRoute: true,
      from: from || keyword,
      to: destination || 'your destination',
    };
  }

  const serviceType = servicePhrases.find((phrase) =>
    keywordLower.endsWith(phrase)
  );
  const location = serviceType
    ? keyword.slice(0, keyword.length - serviceType.length).trim()
    : keyword;

  return {
    keyword,
    serviceLabel: getServiceLabel(serviceType),
    location: location || keyword,
    isRoute: false,
  };
};

export const dynamicParams = false;

export function generateStaticParams() {
  return keywordPages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const page = keywordPageMap.get(params.slug);

  if (!page) {
    return {};
  }

  const context = getKeywordContext(page.keyword);
  const description = context.isRoute
    ? `Book reliable ${context.serviceLabel} from ${context.from} to ${context.to} with Sketch Cabs. Transparent pricing, verified drivers, and 24/7 support.`
    : `Book reliable ${context.serviceLabel} in ${context.location} with Sketch Cabs. Transparent pricing, verified drivers, and 24/7 support.`;

  return {
    title: `${page.keyword} | Sketch Cabs`,
    description,
  };
}

export default function KeywordPage({ params }: PageProps) {
  const page = keywordPageMap.get(params.slug);

  if (!page) {
    notFound();
  }

  const context = getKeywordContext(page.keyword);
  const heroText = context.isRoute
    ? `Plan your ${context.serviceLabel} from ${context.from} to ${context.to} with transparent pricing and experienced drivers.`
    : `Plan your ${context.serviceLabel} in ${context.location} with transparent pricing and experienced drivers.`;
  const coverageText = context.isRoute
    ? `Pickups across ${context.from} with direct drops to ${context.to} and nearby stops.`
    : `Coverage across ${context.location} and nearby towns with direct point-to-point drops.`;

  return (
    <main className={styles.section}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>
            {context.isRoute
              ? `${context.from} to ${context.to}`
              : context.location}
          </p>
          <h1 className={styles.title}>{page.keyword}</h1>
          <p className={styles.subtitle}>{heroText}</p>
          <div className={styles.ctaRow}>
            <Button href="/contact" size="lg">
              Book Now
            </Button>
            <Button href="/offerings" variant="outline" size="lg">
              View Tariff
            </Button>
          </div>
          <div className={styles.badges}>
            <span>Verified drivers</span>
            <span>One-way savings</span>
            <span>24/7 support</span>
          </div>
        </section>

        <section className={styles.sectionBlock}>
          <h2 className={styles.sectionTitle}>Why choose Sketch Cabs</h2>
          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <h3>Transparent pricing</h3>
              <p>
                Pay for one-way travel with clear toll and parking details
                shared upfront.
              </p>
            </div>
            <div className={styles.card}>
              <h3>On-time pickups</h3>
              <p>
                Professional drivers arrive on schedule so your plans stay on
                track.
              </p>
            </div>
            <div className={styles.card}>
              <h3>Comfortable fleet</h3>
              <p>
                Choose from well-maintained sedans and SUVs for every travel
                group.
              </p>
            </div>
            <div className={styles.card}>
              <h3>Live trip support</h3>
              <p>
                Our team stays available during the ride for updates and
                assistance.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.sectionBlock}>
          <h2 className={styles.sectionTitle}>
            Service coverage for{' '}
            {context.isRoute
              ? `${context.from} to ${context.to}`
              : context.location}
          </h2>
          <p className={styles.sectionText}>{coverageText}</p>
          <div className={styles.detailGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Fleet options</span>
              <p>
                Mini, sedan, and SUV choices for solo rides, families, and
                business travel.
              </p>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Flexible trips</span>
              <p>
                One-way, outstation, and airport transfers with easy scheduling
                support.
              </p>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Safe journeys</span>
              <p>
                Verified drivers and well-serviced vehicles for dependable long
                distance travel.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.sectionBlock}>
          <h2 className={styles.sectionTitle}>How booking works</h2>
          <ol className={styles.steps}>
            <li>Share pickup, drop, and travel date.</li>
            <li>Confirm fare details and driver assignment.</li>
            <li>Track your ride with support throughout the trip.</li>
          </ol>
        </section>
      </div>
      <CTA />
      <WhatsAppButton />
    </main>
  );
}
