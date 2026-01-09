import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import Stats from '@/components/Stats';
import TariffSection from '@/components/TariffSection';
import Features from '@/components/Features';
import PromoCarousel from '@/components/PromoCarousel';
import CTA from '@/components/CTA';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import WhatsAppButton from '@/components/WhatsAppButton';
import PopularRoutes from '@/components/PopularRoutes';
import PartnerLogos from '@/components/PartnerLogos';
import StickyCTA from '@/components/StickyCTA';
import BlogPreview from '@/components/BlogPreview';
import Gallery from '@/components/Gallery';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sketch Cabs - Premium One Way Drop Taxi',
  description: 'Book the best one way drop taxi in Salem, Chennai, Bangalore, and across South India. Affordable rates, safe journey.',
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <PartnerLogos />
      <PopularRoutes />
      <Features />
      <TariffSection />
      <Stats />
      <PromoCarousel />
      <Gallery />
      <Testimonials />
      <BlogPreview />
      <FAQ />
      <CTA />
      <WhatsAppButton />
      <StickyCTA />
    </>
  );
}
